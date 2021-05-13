/// <reference types="react" />
import { ButtonProps } from '@material-ui/core';
export interface ChiButtonProps {
    loading?: boolean;
    loadingColour?: string;
    backgroundColour?: string;
    textColour?: string;
}
export declare const Button: (props: ButtonProps & ChiButtonProps) => JSX.Element;
