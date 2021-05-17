import {
    select as d3Select,
    scaleLinear as d3ScaleLinear,
    scaleTime as d3ScaleTime,
    axisBottom as d3AxisBottom,
    axisLeft as d3AxisLeft,
    pointer as d3Pointer,
    bisector as d3Bisector,
    extent as d3Extent,
    transition as d3Transition,
    easeLinear
 } from 'd3';

interface BarChartData {
    bin: any,
    value: number
}

interface BarChartRenderOptions {
    animate: boolean
}

export interface BarChartBuildConfig {
    // target element or selector to contain the svg
    target?: any,

    // width of chart
    width?: number,

    // height of chart
    height?: number,

    // enable axis
    axis?: boolean,

    // margin
    margin?: {
        top: number,
        right: number,
        bottom: number,
        left: number
    },

    // axis padding
    axisPadding?: number,

    // axis tick size
    tickSize?: number,

    // padding between bars
    barPadding?: number,

    // nice round values for axis
    nice?: boolean,

    // Bar colour
    barColour?: string,

    // mouseover callback for tooltips or value display
    mouseover?: Function,

    // mouseout callback for tooltips or value display
    mouseout?: Function,

    // custom x domain
    xDomain?: any,

    // custom y domain
    yDomain?: any,

    // show background columns
    showBackgroundColumns?: boolean,

    // bar type
    barType?: 'round' | 'square'
}

const DEFAULT_CONFIG = {
    target: '#chart',
    width: 570,
    height: 270,
    axis: true,
    margin: { top: 15, right: 30, bottom: 35, left: 30 },
    axisPadding: 5,
    tickSize: 10,
    nice: false,
    barColour: '#000',
    xDomain: null,
    yDomain: null,
    barPadding: 25,
    barType: 'round',
    mouseover: (_: any) => { },
    mouseout: () => { },
    showBackgroundColumns: true
}

/**
 * Bar Chart building class
 */
export class BarChartBuild {
    props = DEFAULT_CONFIG;
    data: any;
    xBisect: any;
    ease: any;
    transition: any;

    // Chart props
    chart: any;
    xAxis: any;
    yAxis: any;
    xScale: any;
    yScale: any;
    tooltip: any;
    focus: any;

    // Styling
    classes: { [k: string]: any };

    constructor(config: BarChartBuildConfig, classes: { [k: string]: any }) {
        this.classes = classes;
        this.setProps(config);

        if (!this.props.axis) {
            this.props.margin = { top: 0, right: 0, bottom: 0, left: 0 };
        }

        this.init();
    }

    /** 
     * Sets the props for this config 
     */
    setProps(config: BarChartBuildConfig) {
        Object.assign(this.props, DEFAULT_CONFIG, config);
    }

    /**
     * Gets dimensions without margins
     */
    dimensions(): [number, number] {
        const { width, height, margin } = this.props;
        const w = width - margin.left - margin.right;
        const h = height - margin.top - margin.bottom;

        return [w, h];
    }

    /**
     * Handle mouseover.
     */
    onMouseOver() {
        const m = d3Pointer(this.chart.node());
        const x = this.xScale.invert(m[0]);
        const i = this.xBisect(this.data, x, 1);
        const data = this.data[i - 1];
        this.props.mouseover(data);
    }

    /**
     * Handle mouseleave.
     */
    onMouseLeave() {
        this.props.mouseout();
    }

    /**
     * Initialize the chart.
     */
    init() {
        const { classes } = this;
        const { target, width, height, margin, axisPadding, tickSize, axis } = this.props;
        const [w, h] = this.dimensions();

        this.chart = d3Select(target)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .on('mouseover', _ => this.onMouseOver())
            .on('mouseleave', _ => this.onMouseLeave())

        this.xScale = d3ScaleTime()
            .range([0, w]);

        this.yScale = d3ScaleLinear()
            .range([h, 0]);

        this.xAxis = d3AxisBottom(this.xScale)
            .ticks(5)
            .tickPadding(8)
            .tickSize(tickSize);

        this.yAxis = d3AxisLeft(this.yScale)
            .ticks(3)
            .tickPadding(8)
            .tickSize(tickSize);

        if (axis) {
            this.chart.append('g')
                .attr('class', classes.xAxis)
                .attr('transform', `translate(0, ${h + axisPadding})`)
                .call(this.xAxis);

            this.chart.append('g')
                .attr('class', classes.yAxis)
                .attr('transform', `translate(${-axisPadding}, 0)`)
                .call(this.yAxis);
        }

        this.xBisect = d3Bisector((d: any) => d.bin).left;
        this.ease = easeLinear;
    }

    /**
     * Render axes
     * 
     * @param data {BarChartData[]} - Data for the bar chart
     */
    renderAxes(data: BarChartData[]) {
        const { chart, xScale, yScale, xAxis, yAxis, transition, classes } = this;
        const { nice, xDomain, yDomain } = this.props;

        const yExtent = yDomain || d3Extent(data, (d: BarChartData) => d.value);
        const xd = xScale.domain(xDomain || d3Extent(data, (d: BarChartData) => d.bin));
        const yd = yScale.domain(yExtent);

        if (nice) {
            xd.nice()
            yd.nice()
        }

        const c = chart.transition(transition);
        c.select(classes.xAxis).call(xAxis);
        c.select(classes.yAxis).call(yAxis);
    }

    /**
     * Render bars.
     * 
     * @param data {BarChartData[]} - Data for the bar chart
     * @param options {BarChartRenderOptions} - Options to render the chart
     */
    renderBars(data: BarChartData[], options: BarChartRenderOptions) {
        const { chart, xScale, yScale, transition, classes } = this;
        const { barPadding, barType, showBackgroundColumns } = this.props;
        const [w, h] = this.dimensions();

        const width = w / data.length;
        const barWidth = width - barPadding;

        if (barWidth < 1) { throw new Error('BarChart is too small for the amount of data provided') }

        if (showBackgroundColumns) {
            const column = chart.selectAll(classes.column)
                .data(data);

            column.enter() // enter
                .append('rect')
                .attr('class', classes.column)
                .merge(column) // update
                .transition(transition)
                .attr('x', (d: BarChartData) => xScale(d.bin))
                .attr('rx', barType == 'round' ? barWidth / 1.5 : 0)
                .attr('ry', barType == 'round' ? barWidth / 2 : 0)
                .attr('width', barWidth)
                .attr('height', h);

            // exit
            column.exit().remove();
        }

        const bar = chart.selectAll(classes.bar)
            .data(data);

        bar.enter() // enter
            .append('rect')
            .attr('class', classes.bar)
            .merge(bar) // update
            .transition(transition)
            .attr('x', (d: BarChartData) => xScale(d.bin))
            .attr('y', (d: BarChartData) => yScale(d.value))
            .attr('rx', barType == 'round' ? barWidth / 1.5 : 0)
            .attr('ry', barType == 'round' ? barWidth / 2 : 0)
            .attr('width', barWidth)
            .attr('height', (d: BarChartData) => h - yScale(d.value));

        // exit
        bar.exit().remove();

        const overlay = chart.selectAll(classes.overlay)
            .data(data);

        // enter
        overlay.enter().append('rect')
            .attr('class', classes.overlay);

        // update
        overlay.attr('x', (d: BarChartData) => xScale(d.bin))
            .attr('width', width)
            .attr('height', h)
            .style('fill', 'transparent');

        // exit
        overlay.exit().remove();
    }

    /**
     * Render the chart against the given `data` which should be
     * an array of objects with `bin` and `value` properties.
     * 
     * @param data {BarChartData[]} - Data for the bar chart
     * @param options {BarChartRenderOptions} - Options to render the chart
     */
    render(data: BarChartData[], options: BarChartRenderOptions) {
        this.data = data;

        let finalOptions = options || {};

        this.transition = d3Transition()
            .duration(finalOptions.animate ? 300 : 0)
            .ease(this.ease);

        this.renderAxes(data);
        this.renderBars(data, finalOptions);
    }

    /**
     * Update the chart against the given `data`.
     * 
     * @param data {BarChartData[]} - Data for the bar chart
     * @param options {BarChartRenderOptions} - Options to render the chart
     */
    update(data: BarChartData[], options: BarChartRenderOptions) {
        this.render(data, options)
    }
}