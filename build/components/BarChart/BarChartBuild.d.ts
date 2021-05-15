interface BarChartData {
    time: any;
    value: number;
}
interface BarChartRenderOptions {
    animate: boolean;
}
export interface BarChartBuildConfig {
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
    BarColour?: string;
    gridOrientation?: 'vertical' | 'horizontal';
}
/**
 * Bar Chart building class
 */
export declare class BarChartBuild {
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
        BarColour: string;
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
    constructor(config: BarChartBuildConfig, classes: {
        [k: string]: any;
    });
    /**
     * Sets the props for this config
     */
    setProps(config: BarChartBuildConfig): void;
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
     * @param data {BarChartData[]} - Data to render with
     * @param options {BarChartRenderOptions} - Options to render with
     */
    renderAxes(data: BarChartData[], options: BarChartRenderOptions): void;
    /**
     * Renders column Bars
     *
     * @param data {BarChartData[]} - Data to render with
     */
    renderGrid(data: BarChartData[]): void;
    /**
     * Renders the chart Bar
     *
     * @param data {BarChartData[]} - Data to render with
     */
    renderBar(data: BarChartData[]): void;
    /**
     * Renders the tooltip
     */
    renderTooltip(data: BarChartData[]): void;
    /**
     * Render the chart against the given data.
     *
     * @param data {BarChartData[]} - Data to render with
     * @param options {BarChartRenderOptions} - Options to render with
     */
    render(data: BarChartData[], options?: BarChartRenderOptions): void;
    /**
     * Update the chart against the given data.
     *
     * @param data {BarChartData[]} - Data to render with
     */
    update(data: BarChartData[]): void;
}
export {};
