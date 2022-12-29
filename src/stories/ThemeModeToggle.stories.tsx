import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ThemeModeToggle from '@/components/ThemeModeToggle';

export default {
  title: `ThemeModeToggle`,
  component: ThemeModeToggle,
} as ComponentMeta<typeof ThemeModeToggle>;

const Template: ComponentStory<typeof ThemeModeToggle> = (args) => (
  <ThemeModeToggle {...args} />
);

export const Default = Template.bind({});

Default.args = {};
