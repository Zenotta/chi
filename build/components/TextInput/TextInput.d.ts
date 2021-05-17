/// <reference types="react" />
import { DropdownItem } from '../Dropdown/Dropdown';
declare type TextType = 'text' | 'number' | 'email' | 'password' | 'search';
export interface TextInputProps {
    onSubmit?: Function;
    type?: TextType;
    id?: string;
    label?: string;
    onChange?: Function;
    loading?: boolean;
    loadingColour?: string;
    primaryColour?: string;
    actionColour?: string;
    shouldSubmitOnEnter?: boolean;
    autocompleteValues?: DropdownItem[];
    overridingClass?: string;
    iconType?: 'none' | 'text' | 'outlined' | 'contained';
}
export declare const TextInput: (props: TextInputProps) => JSX.Element;
export {};
