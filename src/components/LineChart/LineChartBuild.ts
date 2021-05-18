import {
    select as d3Select,
    scaleLinear as d3ScaleLinear,
    scaleTime as d3ScaleTime,
    axisBottom as d3AxisBottom,
    axisLeft as d3AxisLeft,
    extent as d3Extent,
    line as d3Line,
    curveBasis
} from 'd3';

interface LineChartData {
    time: any,
    value: number
}

interface LineChartRenderOptions {
    animate: boolean
}

export interface LineChartBuildConfig {
    // target element or selector to contain the svg
    target?: any,

    // width of chart
    width?: number,

    // height of chart
    height?: number,

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

    // number of x-axis ticks
    xTicks?: number,

    // number of y-axis ticks
    yTicks?: number,

    // nice round values for axis
    nice?: boolean,

    // line colour
    lineColour?: string,

    // whether the grid should be horizontal or vertical
    gridOrientation?: 'vertical' | 'horizontal'
}

const DEFAULT_CONFIG = {
    target: '#chart',
    width: 570,
    height: 270,
    margin: { top: 15, right: 20, bottom: 35, left: 30 },
    axisPadding: 5,
    tickSize: 0,
    xTicks: 5,
    yTicks: 3,
    nice: false,
    lineColour: '#000',
    gridOrientation: 'vertical'
}

/**
 * Line Chart building class
 */
export class LineChartBuild {
    props = DEFAULT_CONFIG;

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

    constructor(config: LineChartBuildConfig, classes: { [k: string]: any }) {
        this.classes = classes;
        this.setProps(config);
        this.init();
    }

    /** 
     * Sets the props for this config 
     */
    setProps(config: LineChartBuildConfig) {
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
     * Initialises the chart
     */
    init() {
        const { classes } = this;
        const { target, width, height, margin, axisPadding } = this.props;
        const { tickSize, xTicks, yTicks } = this.props;
        const [w, h] = this.dimensions();

        this.chart = d3Select(target)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        this.xScale = d3ScaleTime()
            .range([0, w]);

        this.yScale = d3ScaleLinear()
            .range([h, 0]);

        this.xAxis = d3AxisBottom(this.xScale)
            .ticks(xTicks)
            .tickPadding(8)
            .tickSize(tickSize);

        this.yAxis = d3AxisLeft(this.yScale)
            .ticks(yTicks)
            .tickPadding(8)
            .tickSize(tickSize);

        this.chart.append('g')
            .attr('class', classes.xAxis)
            .attr('transform', `translate(0, ${h + axisPadding})`)
            .call(this.xAxis);

        this.chart.append('g')
            .attr('class', classes.yAxis)
            .attr('transform', `translate(${-axisPadding}, 0)`)
            .call(this.yAxis);
    }

    /**
     * Renders the axes
     * 
     * @param data {LineChartData[]} - Data to render with
     * @param options {LineChartRenderOptions} - Options to render with
     */
    renderAxes(data: LineChartData[], options: LineChartRenderOptions) {
        const { nice } = this.props;
        const { classes } = this;

        const xd = this.xScale.domain(d3Extent(data, d => d.time));
        const yd = this.yScale.domain(d3Extent(data, d => d.value));

        if (nice) {
            xd.nice();
            yd.nice();
        }

        const c = options.animate
            ? this.chart.transition()
            : this.chart

        c.select(classes.xAxis).call(this.xAxis);
        c.select(classes.yAxis).call(this.yAxis);
    }

    /**
     * Renders column lines
     * 
     * @param data {LineChartData[]} - Data to render with
     */
    renderGrid(data: LineChartData[]) {
        const { classes } = this;
        const { gridOrientation } = this.props;
        const [w, h] = this.dimensions();

        if (gridOrientation == 'vertical') {
            let column = this.chart.selectAll(classes.column)
                .data(data)
                .enter()
                .append('rect')
                .attr('class', classes.column);

            column.attr('width', 1)
                .attr('height', (_: any) => h)
                .attr('x', (d: LineChartData) => this.xScale(d.time))
                .attr('y', 0);


            // exit
            column.exit()
                .remove();

        } else {
            this.chart.append('g')
                .attr('class', classes.column)
                .call(d3AxisLeft(this.yScale)
                    .tickSize(-w)
                    .tickFormat(null)
                );
        }

    }

    /**
     * Renders the chart line
     * 
     * @param data {LineChartData[]} - Data to render with
     */
    renderLine(data: LineChartData[]) {
        const { classes } = this;
        const { lineColour, width, height } = this.props;

        if (data.length) {
            let line = this.chart
                .append("path")
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', lineColour)
                .attr("class", classes.line)
                .attr("d", d3Line()
                    .x((d: any) => this.xScale(d.time))
                    .y((d: any) => this.yScale(d.value))
                    .curve(curveBasis)
                );
    
            line.exit()
                .remove();
        } else {
            this.chart.append('text')
                .attr('class', classes.notification)
                .attr('x', (_: any) => width / 2)
                .attr('y', (_: any) => height / 2)
                .attr("font-size", ".75em")
                .text('No data...');
        }
    }

    /**
     * Render the chart against the given data.
     * 
     * @param data {LineChartData[]} - Data to render with
     * @param options {LineChartRenderOptions} - Options to render with
     */
    render(data: LineChartData[], options?: LineChartRenderOptions) {
        let finalOpts = options || { animate: true };

        this.renderAxes(data, finalOpts);
        this.renderGrid(data);
        this.renderLine(data);
    }

    /**
     * Update the chart against the given data.
     * 
     * @param data {LineChartData[]} - Data to render with
     */
    update(data: LineChartData[]) {
        this.render(data, {
            animate: true
        });
    }
}