import * as d3 from 'd3';

interface BarChartData {
    time: any,
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

    // Bar colour
    BarColour?: string,

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
    BarColour: '#000',
    gridOrientation: 'vertical'
}

/**
 * Bar Chart building class
 */
export class BarChartBuild {
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

    constructor(config: BarChartBuildConfig, classes: { [k: string]: any }) {
        this.classes = classes;
        this.setProps(config);
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
     * Initialises the chart
     */
    init() {
        const { classes } = this;
        const { target, width, height, margin, axisPadding } = this.props;
        const { tickSize, xTicks, yTicks } = this.props;
        const [w, h] = this.dimensions();

        this.chart = d3.select(target)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        this.xScale = d3.scaleTime()
            .range([0, w]);

        this.yScale = d3.scaleLinear()
            .range([h, 0]);

        this.xAxis = d3.axisBottom(this.xScale)
            .ticks(xTicks)
            .tickPadding(8)
            .tickSize(tickSize);

        this.yAxis = d3.axisLeft(this.yScale)
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
     * @param data {BarChartData[]} - Data to render with
     * @param options {BarChartRenderOptions} - Options to render with
     */
    renderAxes(data: BarChartData[], options: BarChartRenderOptions) {
        const { nice } = this.props;
        const { classes } = this;

        const xd = this.xScale.domain(d3.extent(data, d => d.time));
        const yd = this.yScale.domain(d3.extent(data, d => d.value));

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
     * Renders column Bars
     * 
     * @param data {BarChartData[]} - Data to render with
     */
    renderGrid(data: BarChartData[]) {
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
                .attr('x', (d: BarChartData) => this.xScale(d.time))
                .attr('y', 0);


            // exit
            column.exit()
                .remove();

        } else {
            this.chart.append('g')
                .attr('class', classes.column)
                .call(d3.axisLeft(this.yScale)
                    .tickSize(-w)
                    .tickFormat(null)
                );
        }

    }

    /**
     * Renders the chart Bar
     * 
     * @param data {BarChartData[]} - Data to render with
     */
    renderBar(data: BarChartData[]) {
        const { classes } = this;
        const { BarColour } = this.props;

        let Bar = this.chart
            .append("path")
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', BarColour)
            .attr("class", classes.Bar)
            .attr("d", d3.line()
                .x((d: any) => this.xScale(d.time))
                .y((d: any) => this.yScale(d.value))
                .curve(d3['curveBasis'])
            );

        Bar.exit()
            .remove();
    }

    /**
     * Renders the tooltip
     */
    renderTooltip(data: BarChartData[]) {
        let { classes } = this;
        let [w, h] = this.dimensions();

        this.tooltip = d3.select('body').append('div')
            .attr('class', classes.tooltip)
            .style('display', 'none');

        this.focus = this.chart.append('g')
            .attr('class', classes.focus)
            .style('display', 'none');

        this.focus.append('circle').attr('r', 5);

        this.chart.append("rect")
            .attr("class", classes.overlay)
            .attr("width", w)
            .attr("height", h)
            .on("mouseover", () => { this.focus.style("display", null); this.tooltip.style("display", null);  })
            .on("mouseout", () => { this.focus.style("display", "none"); this.tooltip.style("display", "none"); })
            .on("mousemove", () => {}); //this.onMouseMove(data));
    }

    /**
     * Render the chart against the given data.
     * 
     * @param data {BarChartData[]} - Data to render with
     * @param options {BarChartRenderOptions} - Options to render with
     */
    render(data: BarChartData[], options?: BarChartRenderOptions) {
        let finalOpts = options || { animate: true };

        this.renderAxes(data, finalOpts);
        this.renderGrid(data);
        this.renderBar(data);
        this.renderTooltip(data);
    }

    /**
     * Update the chart against the given data.
     * 
     * @param data {BarChartData[]} - Data to render with
     */
    update(data: BarChartData[]) {
        this.render(data, {
            animate: true
        });
    }
}