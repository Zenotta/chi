import React from 'react';
import { BarChartBuild, BarChartBuildConfig } from './BarChartBuild.ts';
import styles from './BarChart.scss';

export interface BarChartProps {
    data: BarChartDatum[],
    grid?: 'vertical' | 'horizontal',
    overridingClass?: string,
    BarColour?: string
}

interface BarChartState {
    grid: 'vertical' | 'horizontal',
}

interface BarChartDatum {
    time: any,
    value: number
}

export class BarChart extends React.Component<BarChartProps, BarChartState> {
    chartGen: any;
    chartGenRef: any;
    containerRef: any;

    constructor(props: BarChartProps) {
        super(props);

        this.chartGenRef = React.createRef();
        this.state = {
            grid: props.grid ? props.grid : 'vertical'
        };
    }

    componentDidMount() {
        console.log('width', this.containerRef.offsetWidth);

        let config: BarChartBuildConfig = {
            width: this.containerRef.offsetWidth,
            height: this.containerRef.offsetHeight,
            target: this.chartGenRef.current,
            gridOrientation: this.state.grid
        };

        if (this.props.BarColour) {
            config.BarColour = this.props.BarColour;
        }

        // Construct and render chart
        this.chartGen = new BarChartBuild(config, styles);
        this.chartGen.render(this.props.data);
    }

    componentDidUpdate() {
        this.chartGen.update(this.props.data);
    }

    render() {
        let { props } = this;

        return (
            <div ref={el => (this.containerRef = el)} className={`${styles.container} ${props.overridingClass}`}>
                <svg ref={this.chartGenRef} className={styles.chart}></svg>
            </div>
        );
    }
}