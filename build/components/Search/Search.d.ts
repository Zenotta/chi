/// <reference types="react" />
import { DropdownItem } from '../Dropdown/Dropdown';
export interface SearchProps {
    onSubmit: Function;
    id?: string;
    label?: string;
    onChange?: Function;
    loading?: boolean;
    loadingColour?: string;
    colour?: string;
    shouldSubmitOnEnter?: boolean;
    variant?: 'outlined' | 'filled' | 'standard';
    autocompleteValues?: DropdownItem[];
    overridingClass?: string;
}
export declare const Search: (props: SearchProps) => JSX.Element;
