import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Notification, NotificationProps } from './Notification';

export default {
  title: 'Components/Display/Notification',
  component: Notification,
  argTypes: {
    colour: {
      description: 'A manual colour to override the default',
      control: {
        type: "color"
      }
    },
    type: {
      description: 'Notification type'
    },
    variant: {
      description: 'Visual variant type. Defaults to text'
    },
    closable: {
      description: 'Whether the notification should be closable'
    },
    // closeItem: {
    //   description: 'The default close icon can be replaced by a custom React element here'
    // },
    // heading: {
    //   description: 'Whether to set a heading for the notification type'
    // },
    className: {
      description: 'A CSS class that can be passed in to override the component\'s native styling, from root'
    }
  }
} as Meta;

const Template: Story<NotificationProps & { children: React.ReactElement[] }> = (args) => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Notification variant='text' {...args}>This is a very important piece of information.</Notification>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Notification variant='outlined' {...args}>This is a very important piece of information.</Notification>
      </div>
      <Notification variant='contained' {...args}>This is a very important piece of information.</Notification>
    </div>
  );
};

export const Info = Template.bind({});
Info.args = {
  type: 'info'
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