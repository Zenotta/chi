import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Components/Atoms/Switch',
  component: Switch,
  argTypes: {
    onClick: {
      description: 'Function to call when the switch is clicked/tapped'
    },
    backgroundColourActive: {
      description: 'Colour of the switch\'s background when active',
      control: {
        type: "color"
      }
    },
    backgroundColourInactive: {
      description: 'Colour of the switch\'s background when inactive',
      control: {
        type: "color"
      }
    },
    switchColourActive: {
      description: 'Colour of the switch when active',
      control: {
        type: "color"
      }
    },
    switchColourInactive: {
      description: 'Colour of the switch when inactive',
      control: {
        type: "color"
      }
    },
    textColourInactive: {
      description: 'Colour of the text on the switch when active. Only relevant when `textIsSwitch` is `true`',
      control: {
        type: "color"
      }
    },
    textColourActive: {
      description: 'Colour of the text on the switch when inactive. Only relevant when `textIsSwitch` is `true`',
      control: {
        type: "color"
      }
    },
    textIsSwitch: {
      description: 'Whether the text should form part of the switch itself',
      control: {
        type: 'boolean'
      }
    },
    isOnDefault: {
      description: 'Whether the switch is on by default'
    },
    leftChild: {
      description: 'The left child value of the switch'
    },
    rightChild: {
      description: 'The right child value of the switch'
    },
    width: {
      description: 'Width of the component. Defaults to 100% of its parent'
    },
    height: {
      description: 'Height of the component. Defaults to 100% of its parent'
    },
    overridingClass: {
      description: 'A CSS class that can be passed in to override the component\'s native styling, from root'
    },
  }
} as Meta;

const Template: Story<SwitchProps> = (args) => {
  let width = args.leftChild ? '140px' : '60px';
  let height = args.leftChild ? '40px' : '35px';

  return (
    <div>
      <div style={{ marginBottom: 20, width, height }}>
        <Switch {...args} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithChildren = Template.bind({});
WithChildren.args = {
  leftChild: 'Hello',
  rightChild: 'World',
};

export const WithChildrenAndTextOver = Template.bind({});
WithChildrenAndTextOver.args = {
  leftChild: 'Hello',
  rightChild: 'World',
  textIsSwitch: true,
  backgroundColourActive: '#bfbfbf',
  textColourActive: '#fff',
  textColourInactive: '#333',
  switchColourActive: '#333',
  switchColourInactive: '#333',
};