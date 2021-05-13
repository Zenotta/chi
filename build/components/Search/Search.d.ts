/// <reference types="react" />
export interface SearchProps {
    onSubmit: Function;
    id?: string;
    label?: string;
    onChange?: Function;
    loading?: boolean;
    loadingColour?: string;
    colour?: string;
    variant?: 'outlined' | 'filled' | 'standard';
    autocompleteValues?: string[];
}
export declare const Search: (props: SearchProps) => JSX.Element;
