import { Story, Meta } from '@storybook/react';
import React from 'react';
import { BarChart, BarChartProps } from './BarChart';

export default {
    title: 'Components/Charts/BarChart',
    component: BarChart,
    argTypes: {
        data: {
            description: 'Data to populate chart. Each data entry must have the structure `{ value: number, bin: Date }`'
        },
        barType: {
            defaultValue: 'round',
            description: 'Whether the chart\'s bars should be rounded or squared'
        },
        barPadding: {
            description: 'Padding between bars'
        },
        showBackgroundColumns: {
            defaultValue: true,
            description: 'Whether to show the chart\'s background columns'
        },
        overridingClass: {
            description: 'A CSS class that can be passed in to override the component\'s native styling, from root'
        },
    }
} as Meta;

const gen = (n: number) => {
    const series = [];
    for (var i = 0, variance = 0, value; i < n; i++) {
        variance += (Math.random() - 0.5) / 10;
        const value = Math.abs(Math.cos(i / 100) + variance)
        series.push({
            bin: new Date(Date.now() - (i * 3600000)),
            value
        });
    }
    return series
}

const Template: Story<BarChartProps & { children: React.ReactElement[] }> = (args) => {
    return (
        <div style={{ width: '50%', height: '200px' }}>
            <BarChart {...args} />
        </div>
    );
};

export const Standard = Template.bind({});
Standard.args = {
    data: gen(12)
};