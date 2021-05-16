import React, { FunctionComponent } from 'react';
export interface ButtonProps {
    loading?: boolean;
    loadingColour?: string;
    mainColour?: string;
    textColour?: string;
    disabled?: boolean;
    endIcon?: React.ReactElement;
    startIcon?: React.ReactElement;
    overridingClass?: string;
    onClick?: Function;
    variant?: 'contained' | 'outlined';
}
export declare const Button: FunctionComponent<ButtonProps>;
