const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
    {
      name: 'storybook-addon-turbo-build',
      options: {
        optimizationLevel: 2,
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-i18next': 'react-i18next',
      '@': path.resolve(__dirname, '../src'),
    };

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ['@babel/preset-env', { shippedProposals: true }],
      '@babel/preset-typescript',
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: ['@babel/plugin-transform-typescript', ...options.plugins],
  }),
  typescript: {
    check: false,
    reactDocgen: false,
  },
};
