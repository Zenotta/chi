import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Notification, NotificationProps } from './Notification';

export default {
  title: 'Example/Notification',
  component: Notification,
  argTypes: {
    colour: {
      control: {
        type: "color"
      }
    }
  }
} as Meta;

const Template: Story<NotificationProps & { children: React.ReactElement[] }> = (args) => {
  return <Notification {...args}>This is a very important piece of information.</Notification>;
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  variant: 'outlined'
};

export const Error = Template.bind({});
Error.args = {
  type: 'error'
};

export const Success = Template.bind({});
Success.args = {
  type: 'success'
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning'
};