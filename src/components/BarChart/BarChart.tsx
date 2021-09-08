import React from 'react';
import { BarChartBuild, BarChartBuildConfig } from './BarChartBuild';
import styles from './BarChart.scss';

export interface BarChartProps {
    data: BarChartDatum[],
    barType?: 'round' | 'square',
    barPadding?: number,
    barColour?: string,
    className?: string,
    showBackgroundColumns?: boolean
}

interface BarChartDatum {
    bin: any,
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

        if (this.props.barPadding) {
            config.barPadding = this.props.barPadding;
        }

        if (this.props.barColour) {
            config.barColour = this.props.barColour;
        }

        if (this.props.barType) {
            config.barType = this.props.barType;
        }

        if (this.props.showBackgroundColumns !== undefined) {
            config.showBackgroundColumns = this.props.showBackgroundColumns;
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
            <div ref={el => (this.containerRef = el)} className={`${styles.container} ${props.className}`}>
                <svg ref={this.chartGenRef} className={styles.chart}></svg>
            </div>
        );
    }
}