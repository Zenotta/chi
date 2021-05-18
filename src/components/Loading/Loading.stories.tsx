import { Story, Meta } from '@storybook/react';

import { Loading, LoadingProps } from './Loading';

export default {
    title: 'Components/Atoms/Loading',
    component: Loading,
    argTypes: {
        type: {
            description: 'Type of loading icon. Either rounded or square'
        },
        colour: {
            description: 'Icon colour',
            control: {
                type: 'color'
            }
        },
        overridingClass: {
            description: 'A CSS class that can be passed in to override the component\'s native styling, from root'
        }
    }
} as Meta;

const Template: Story<LoadingProps> = (args) => {
    return (
        <div style={{ width: "70px" }}><Loading {...args} /></div>
    );
};

export const Default = Template.bind({});
Default.args = {
    colour: "#000",
    type: 'round'
};