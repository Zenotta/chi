import { Story, Meta } from '@storybook/react';

import { Loading, ChiLoadingProps } from './Loading';

export default {
    title: 'Example/Loading',
    component: Loading,
    argTypes: {
        colour: {
            control: {
                type: 'color'
            }
        }
    }
} as Meta;

const Template: Story<ChiLoadingProps> = (args) => {
    return (
        <div style={{ width: "70px" }}><Loading {...args} /></div>
    );
};

export const Standard = Template.bind({});
Standard.args = {
    colour: "#000"
};