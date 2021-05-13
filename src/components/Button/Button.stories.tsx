import { ButtonProps } from "@material-ui/core";
import { Story, Meta } from '@storybook/react';
import { STORYBOOK_VALS } from '../../utils';

import { Button, ChiButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColour: {
      control: {
        type: "color"
      }
    },
    textColour: {
      control: {
        type: "color"
      }
    },
    loadingColour: {
      control: {
        type: "color"
      }
    },
    color: {
      control: {
        type: "text"
      }
    }
  }
} as Meta;

const Template: Story<ButtonProps & ChiButtonProps> = (args) => {
  return (
    <Button {...args} />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
  backgroundColour: STORYBOOK_VALS.primary,
  textColour: "#fff",
  children: "Click Me"
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Click Me",
  backgroundColour: STORYBOOK_VALS.primary,
  textColour: "#fff",
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: "Click Me",
  backgroundColour: STORYBOOK_VALS.primary,
  textColour: "#fff",
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: "Click Me",
  backgroundColour: STORYBOOK_VALS.primary,
  textColour: "#fff",
};
