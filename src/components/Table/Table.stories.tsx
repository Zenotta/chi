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

export const Data = Template.bind({});
Data.args = {
    header: [
        { value: "Block Hash", isNumeric: false },
        { value: "Previous Hash", isNumeric: false },
        { value: "Block Number", isNumeric: true },
        { value: "Transactions", isNumeric: true },
    ],
    body: [
        [
            { value: "bfdaf277514b7cfba12e9a95b5f21f7112536dad0f2fcdaf5347a118d2d5ed5aa", isNumeric: false },
            { value: "8a6f09364f86156cac3a9f20707b09537ffc4d6276157a282c582d1ad2501493", isNumeric: false },
            { value: 120, isNumeric: true },
            { value: 1209, isNumeric: true }
        ],
        [
            { value: "5b91cca7821d9187d9885e777691db42a592da5273eacc4273e20c0b5b5332f5", isNumeric: false },
            { value: "bfdaf277514b7cfba12e9a95b5f21f7112536dad0f2fcdaf5347a118d2d5ed5aa", isNumeric: false },
            { value: 121, isNumeric: true },
            { value: 5348, isNumeric: true }
        ],
        [
            { value: "b878acd443ca886fae5a6407cd93486ef06ebd20c30751bd3949b6ee604aa2f33", isNumeric: false },
            { value: "5b91cca7821d9187d9885e777691db42a592da5273eacc4273e20c0b5b5332f5", isNumeric: false },
            { value: 122, isNumeric: true },
            { value: 2394, isNumeric: true }
        ],
    ]
};