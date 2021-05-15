import { Story, Meta } from '@storybook/react';
import React from 'react';
import { LineChart, LineChartProps } from './LineChart';

export default {
    title: 'Example/LineChart',
    component: LineChart,
    argTypes: {
        lineColour: {
            control: {
                type: "color"
            }
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
        <LineChart {...args} />
    );
};

export const Standard = Template.bind({});
Standard.args = {
    data: gen(12),
    lineColour: '#ff2424',
    grid: 'vertical'
};