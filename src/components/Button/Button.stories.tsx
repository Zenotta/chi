import { Story, Meta } from '@storybook/react';
import { STORYBOOK_VALS } from '../../utils';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
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
  }
} as Meta;

const Template: Story<ButtonProps & { children: any }> = (args) => {
  return (
    <div style={{ width: 150 }}>
      <div style={{ marginBottom: 15 }}>
        <Button {...args} />
      </div>
      <div style={{ marginBottom: 15 }}>
        <Button variant='outlined'>Click Me</Button>
      </div>
      <Button variant='contained'>Click Me</Button>
    </div>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  mainColour: STORYBOOK_VALS.primary,
  children: "Click Me",
};