import { Story, Meta } from '@storybook/react';
import { STORYBOOK_VALS } from '../../utils';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  argTypes: {
    type: {
      description: 'Either an outlined or a contained style'
    },
    mainColour: {
      description: 'Primary colour for handling the styling',
      control: {
        type: "color"
      }
    },
    textColour: {
      description: 'Text colour',
      control: {
        type: "color"
      }
    },
    disabled: {
      description: 'Whether the button is disabled or not'
    },
    onClick: {
      description: 'Function to trigger on button click'
    },
    loading: {
      description: 'Whether the button is loading or not'
    },
    loadingColour: {
      description: 'Colour of the loading icon',
      control: {
        type: "color"
      }
    },
    overridingClass: {
      description: 'A CSS class that can be passed in to override the component\'s native styling, from root'
  },
  }
} as Meta;

const Template: Story<ButtonProps & { children: any }> = (args) => {
  return (
    <div style={{ width: 150 }}>
      <Button {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  mainColour: STORYBOOK_VALS.primary,
  children: "Click Me",
};

export const Outlined = Template.bind({});
Outlined.args = {
  mainColour: STORYBOOK_VALS.primary,
  children: "Click Me",
  type: 'outlined'
};

export const Contained = Template.bind({});
Contained.args = {
  mainColour: STORYBOOK_VALS.primary,
  children: "Click Me",
  type: 'contained'
};

export const Loading = Template.bind({});
Loading.args = {
  mainColour: STORYBOOK_VALS.primary,
  children: "Click Me",
  type: 'contained',
  loading: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  mainColour: STORYBOOK_VALS.primary,
  children: "Click Me",
  disabled: true
};