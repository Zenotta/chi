import { Story, Meta } from '@storybook/react';
import { Table, TableProps } from './Table';

export default {
    title: 'Example/Table',
    component: Table,
} as Meta;

const Template: Story<TableProps> = (args) => {
    return (
        <Table {...args} />
    );
};

export const Sortable = Template.bind({});
Sortable.args = {
    sortable: true,
    header: [
        { value: "Block Hash", isNumeric: false },
        { value: "Previous Hash", isNumeric: false },
        { value: "Block Number", isNumeric: true },
        { value: "Transactions", isNumeric: true },
    ],
    body: [
        [
            { value: <a href="#">bfdaf277514b7cfba12e9a95b5f21f7112536dad0f2fcdaf5347a118d2d5ed5aa</a>, isNumeric: false },
            { value: "N/A", isNumeric: false },
            { value: 120, isNumeric: true },
            { value: 1209, isNumeric: true }
        ],
        [
            { value: <a href="#">5b91cca7821d9187d9885e777691db42a592da5273eacc4273e20c0b5b5332f5</a>, isNumeric: false },
            { value: "bfdaf277514b7cfba12e9a95b5f21f7112536dad0f2fcdaf5347a118d2d5ed5aa", isNumeric: false },
            { value: 121, isNumeric: true },
            { value: 5348, isNumeric: true }
        ],
        [
            { value: <a href="#">b878acd443ca886fae5a6407cd93486ef06ebd20c30751bd3949b6ee604aa2f33</a>, isNumeric: false },
            { value: "5b91cca7821d9187d9885e777691db42a592da5273eacc4273e20c0b5b5332f5", isNumeric: false },
            { value: 122, isNumeric: true },
            { value: 2394, isNumeric: true }
        ],
    ]
};