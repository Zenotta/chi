import { Story, Meta } from '@storybook/react';
import { Search, SearchProps } from './Search';

export default {
    title: 'Example/Search',
    component: Search,
    argTypes: {
        colour: {
            control: {
                type: 'color'
            }
        },
        loadingColour: {
            control: {
                type: 'color'
            }
        }
    }
} as Meta;

const Template: Story<SearchProps> = (args) => {
    return <Search {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {
    colour: "#000"
};