import { Story, Meta } from '@storybook/react';
import { Search, SearchProps } from './Search';

export default {
    title: 'Example/Search',
    component: Search,
    argTypes: {
        colour: {
            description: 'The theme colour for the component. Can be in any format that CSS accepts.',
            control: {
                type: 'color'
            }
        },
        loadingColour: {
            description: 'The colour of the loading icon if set to a loading state. Can be in any format that CSS accepts.',
            control: {
                type: 'color'
            }
        },
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