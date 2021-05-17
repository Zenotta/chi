/// <reference types="react" />
export interface LoadingProps {
    type: 'round' | 'square';
    colour?: string;
    overridingClass?: string;
}
export declare const Loading: (props: LoadingProps) => JSX.Element;
