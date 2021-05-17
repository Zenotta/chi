import { Story, Meta } from '@storybook/react';
import { TextInput, TextInputProps } from './TextInput';

export default {
    title: 'Components/Atoms/TextInput',
    component: TextInput,
    argTypes: {
        type: {
            description: 'Type of input field. Will provide sensible functionality. Defaults to simple `text` type'
        },
        iconType: {
            description: 'The type of icon to use. Defaults to `none`, for no icon'
        },
        primaryColour: {
            description: 'The theme colour for the component',
            control: {
                type: 'color'
            }
        },
        actionColour: {
            description: 'Colour to use on focus. Defaults to the primary colour',
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
        onSubmit: {
            description: 'Function to call on submission of field'
        },
        onChange: {
            description: 'Function to call on change of field text'
        },        
        shouldSubmitOnEnter: {
            description: 'Whether to trigger the `onSubmit` function when the user presses the Enter key'
        },
        overridingClass: {
            description: 'A CSS class that can be passed in to override the component\'s native styling, from root'
        },
    }
} as Meta;

const Template: Story<TextInputProps> = (args) => {
    return <div style={{ width: 400 }}><TextInput {...args} /></div>;
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
    primaryColour: "#000000",
    shouldSubmitOnEnter: true,
    onSubmit: (val: string) => { console.log("Input was submitted! Input:", val) },
    autocompleteValues: [ { value: 'First Item' }, { value: 'Second Item' } ]
};