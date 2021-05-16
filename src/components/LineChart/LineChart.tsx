import React from 'react';
import { LineChartBuild, LineChartBuildConfig } from './LineChartBuild';
import styles from './LineChart.scss';

export interface LineChartProps {
    data: LineChartDatum[],
    grid?: 'vertical' | 'horizontal',
    overridingClass?: string,
    lineColour?: string
}

interface LineChartState {
    grid: 'vertical' | 'horizontal',
}

interface LineChartDatum {
    time: any,
    value: number
}

export class LineChart extends React.Component<LineChartProps, LineChartState> {
    chartGen: any;
    chartGenRef: any;
    containerRef: any;

    constructor(props: LineChartProps) {
        super(props);

        this.chartGenRef = React.createRef();
        this.state = {
            grid: props.grid ? props.grid : 'vertical'
        };
    }

    componentDidMount() {
        let config: LineChartBuildConfig = {
            width: this.containerRef.offsetWidth,
            height: this.containerRef.offsetHeight,
            target: this.chartGenRef.current,
            gridOrientation: this.state.grid
        };

        if (this.props.lineColour) {
            config.lineColour = this.props.lineColour;
        }

        // Construct and render chart
        this.chartGen = new LineChartBuild(config, styles);
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