import '../src/styles/globals.css';

import React from 'react';
import AppBase from '../src/components/AppBase';
import { themes } from '@storybook/theming';
import i18n from './i18next.js';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { initializeApollo } from '../src/graphql/apollo';
import { ApolloProvider } from '@apollo/client';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone12',
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    light: { ...themes.light, appBg: 'light' },
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
  },
};

export const decorators = [
  (Story) =>
    React.createElement(
      ApolloProvider,
      {
        client: initializeApollo({ initialState: {} }),
      },
      React.createElement(AppBase, {}, React.createElement(Story)),
    ),
];
