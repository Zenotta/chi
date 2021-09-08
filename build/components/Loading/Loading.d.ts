/// <reference types="react" />
export interface LoadingProps {
    type: 'round' | 'square';
    colour?: string;
    className?: string;
}
export declare const Loading: (props: LoadingProps) => JSX.Element;
