import React from 'react';
import { BarChartBuild, BarChartBuildConfig } from './BarChartBuild.ts';
import styles from './BarChart.scss';

export interface BarChartProps {
    data: BarChartDatum[],
    barType?: 'round' | 'square',
    barPadding?: number,
    overridingClass?: string,
    showBackgroundColumns?: boolean
}

interface BarChartDatum {
    time: any,
    value: number
}

export class BarChart extends React.Component<BarChartProps, {}> {
    chartGen: any;
    chartGenRef: any;
    containerRef: any;

    constructor(props: BarChartProps) {
        super(props);

        this.chartGenRef = React.createRef();
    }

    componentDidMount() {
        let config: BarChartBuildConfig = {
            width: this.containerRef.offsetWidth,
            height: this.containerRef.offsetHeight,
            target: this.chartGenRef.current,
            tickSize: 3
        };

        console.log(this.props);

        if (this.props.barPadding) {
            config.barPadding = this.props.barPadding;
        }

        if (this.props.barType) {
            config.barType = this.props.barType;
        }

        if (this.props.showBackgroundColumns !== undefined) {
            config.showBackgroundColumns = this.props.showBackgroundColumns;
        }

        console.log('final config', config);

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