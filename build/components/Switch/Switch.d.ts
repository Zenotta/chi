/// <reference types="react" />
export interface SwitchProps {
    overridingClass?: string;
    onClick?: Function;
    leftChild?: string;
    rightChild?: string;
    textIsSwitch?: boolean;
    isOnDefault?: boolean;
    backgroundColourActive?: string;
    backgroundColourInactive?: string;
    switchColourActive?: string;
    switchColourInactive?: string;
    textColourInactive?: string;
    textColourActive?: string;
    width?: string;
    height?: string;
}
export declare const Switch: (props: SwitchProps) => JSX.Element;
