import { Story, Meta } from '@storybook/react';
import React from 'react';
import { LineChart, LineChartProps } from './LineChart';

export default {
    title: 'Components/Charts/LineChart',
    component: LineChart,
    argTypes: {
        data: {
            description: 'Data to populate chart. Each data entry must have the structure `{ value: number, time: Date }`'
        },
        lineColour: {
            description: 'The colour of the chart\'s line',
            control: {
                type: "color"
            }
        },
        grid: {
            description: 'The orientation of the background grid'
        },
        className: {
            description: 'A CSS class that can be passed in to override the component\'s native styling, from root'
        }
    }
} as Meta;

// Generate some sample data
const gen = (n: number) => {
    const data = []

    for (var i = 0; i < n; i++) {
        data.push({
            time: new Date(Date.now() - (i * 3600000)),
            value: Math.max(250, Math.random() * 3000 | 0)
        })
    }

    return data
}

const Template: Story<LineChartProps & { children: React.ReactElement[] }> = (args) => {
    return (
        <div style={{ width: '50%', height: '200px' }}>
            <LineChart {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    data: gen(12),
    lineColour: '#248fff',
    grid: 'vertical'
};

export const Empty = Template.bind({});
Empty.args = {
    data: [],
};