interface BarChartData {
    bin: any;
    value: number;
}
interface BarChartRenderOptions {
    animate: boolean;
}
export interface BarChartBuildConfig {
    target?: any;
    width?: number;
    height?: number;
    axis?: boolean;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    axisPadding?: number;
    tickSize?: number;
    barPadding?: number;
    nice?: boolean;
    barColour?: string;
    mouseover?: Function;
    mouseout?: Function;
    xDomain?: any;
    yDomain?: any;
    showBackgroundColumns?: boolean;
    barType?: 'round' | 'square';
}
/**
 * Bar Chart building class
 */
export declare class BarChartBuild {
    props: {
        target: string;
        width: number;
        height: number;
        axis: boolean;
        margin: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        axisPadding: number;
        tickSize: number;
        nice: boolean;
        barColour: string;
        xDomain: null;
        yDomain: null;
        barPadding: number;
        barType: string;
        mouseover: (_: any) => void;
        mouseout: () => void;
        showBackgroundColumns: boolean;
    };
    data: any;
    xBisect: any;
    ease: any;
    transition: any;
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
     * Handle mouseover.
     */
    onMouseOver(): void;
    /**
     * Handle mouseleave.
     */
    onMouseLeave(): void;
    /**
     * Initialize the chart.
     */
    init(): void;
    /**
     * Render axes
     *
     * @param data {BarChartData[]} - Data for the bar chart
     */
    renderAxes(data: BarChartData[]): void;
    /**
     * Render bars.
     *
     * @param data {BarChartData[]} - Data for the bar chart
     */
    renderBars(data: BarChartData[]): void;
    /**
     * Render the chart against the given `data` which should be
     * an array of objects with `bin` and `value` properties.
     *
     * @param data {BarChartData[]} - Data for the bar chart
     * @param options {BarChartRenderOptions} - Options to render the chart
     */
    render(data: BarChartData[], options: BarChartRenderOptions): void;
    /**
     * Update the chart against the given `data`.
     *
     * @param data {BarChartData[]} - Data for the bar chart
     * @param options {BarChartRenderOptions} - Options to render the chart
     */
    update(data: BarChartData[], options: BarChartRenderOptions): void;
}
export {};
