import React from 'react';
export interface BarChartProps {
    data: BarChartDatum[];
    grid?: 'vertical' | 'horizontal';
    overridingClass?: string;
    BarColour?: string;
}
interface BarChartState {
    grid: 'vertical' | 'horizontal';
}
interface BarChartDatum {
    time: any;
    value: number;
}
export declare class BarChart extends React.Component<BarChartProps, BarChartState> {
    chartGen: any;
    chartGenRef: any;
    containerRef: any;
    constructor(props: BarChartProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};
