interface LineChartData {
    time: any;
    value: number;
}
interface LineChartRenderOptions {
    animate: boolean;
}
export interface LineChartBuildConfig {
    target?: any;
    width?: number;
    height?: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    axisPadding?: number;
    tickSize?: number;
    xTicks?: number;
    yTicks?: number;
    nice?: boolean;
    lineColour?: string;
    gridOrientation?: 'vertical' | 'horizontal';
}
/**
 * Line Chart building class
 */
export declare class LineChartBuild {
    props: {
        target: string;
        width: number;
        height: number;
        margin: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        axisPadding: number;
        tickSize: number;
        xTicks: number;
        yTicks: number;
        nice: boolean;
        lineColour: string;
        gridOrientation: string;
    };
    chart: any;
    xAxis: any;
    yAxis: any;
    xScale: any;
    yScale: any;
    tooltip: any;
    focus: any;
    classes: {
        [k: string]: any;
    };
    constructor(config: LineChartBuildConfig, classes: {
        [k: string]: any;
    });
    /**
     * Sets the props for this config
     */
    setProps(config: LineChartBuildConfig): void;
    /**
     * Gets dimensions without margins
     */
    dimensions(): [number, number];
    /**
     * Initialises the chart
     */
    init(): void;
    /**
     * Renders the axes
     *
     * @param data {LineChartData[]} - Data to render with
     * @param options {LineChartRenderOptions} - Options to render with
     */
    renderAxes(data: LineChartData[], options: LineChartRenderOptions): void;
    /**
     * Renders column lines
     *
     * @param data {LineChartData[]} - Data to render with
     */
    renderGrid(data: LineChartData[]): void;
    /**
     * Renders the chart line
     *
     * @param data {LineChartData[]} - Data to render with
     */
    renderLine(data: LineChartData[]): void;
    /**
     * Render the chart against the given data.
     *
     * @param data {LineChartData[]} - Data to render with
     * @param options {LineChartRenderOptions} - Options to render with
     */
    render(data: LineChartData[], options?: LineChartRenderOptions): void;
    /**
     * Update the chart against the given data.
     *
     * @param data {LineChartData[]} - Data to render with
     */
    update(data: LineChartData[]): void;
}
export {};
