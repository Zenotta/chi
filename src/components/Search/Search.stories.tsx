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

export const Autocomplete = Template.bind({});
Autocomplete.args = {
    colour: "#000",
    autocompleteValues: [ { value: 'First Item' }, { value: 'Second Item' } ]
};