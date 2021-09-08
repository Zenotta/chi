import React from 'react';
export interface LineChartProps {
    data: LineChartDatum[];
    grid?: 'vertical' | 'horizontal';
    className?: string;
    lineColour?: string;
}
interface LineChartState {
    grid: 'vertical' | 'horizontal';
}
interface LineChartDatum {
    time: any;
    value: number;
}
export declare class LineChart extends React.Component<LineChartProps, LineChartState> {
    chartGen: any;
    chartGenRef: any;
    containerRef: any;
    constructor(props: LineChartProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};
