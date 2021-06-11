import {Meta, Story} from '@storybook/react';
import {Pagination, PaginationProps} from './Pagination';

export default {
    title: 'Components/Navigation/Pagination',
    component: Pagination,
    argTypes: {
        itemsPerPage: {
            description:
                'The maximum number of items that are displayed per page'
        },
        totalItems: {
            description:
                'The total number of items'
        },
        maxPageNumbersDisplayed: {
            description: 'Controls the maximum number of pages the component is allowed to display at any given time. Value must be larger than three and an uneven number to allow for a symmetric display'
        },
        onPaginate: {
            description: 'Callback function on page change. Will pass `currentPage` as an argument to the function passed down in properties'
        },
        vSize: {
            description: 'Vertical component size. Decimal numbers are accepted'
        },
        variant: {
            description: 'Either undefined or bordered'
        },
        disableArrows: {
            description: 'Enables/Disables arrows',
            control: {
                type: "boolean"
            }
        },
        enableStrokeAnimation: {
            description: 'Enables/Disables stroke animation on arrow hover',
            control: {
                type: "boolean"
            }
        },
        enableArrowBackground: {
            description: 'Enables/Disables background color on arrows',
            control: {
                type: "boolean"
            }
        },
        enableArrowBorder: {
            description: 'Enables/Disables borders on arrows. Cannot be used with enableStrokeAnimation',
        },
        mainColor: {
            description: 'Primary color for handling the styling',
            control: {
                type: "color"
            }
        },
        textColor: {
            description: 'Text color',
            control: {
                type: "color"
            }
        },
        backgroundColor: {
            description: 'Background color for handling the styling',
            control: {
                type: "color"
            }
        },
        hoverColor: {
            description: 'Hover color for handling the styling',
            control: {
                type: "color"
            },
        },
        borderColor: {
            description: 'Border color for handling the styling',
            control: {
                type: "color"
            },
        },
    }
} as Meta;

const Template: Story<PaginationProps> = (args) => {
    return (
        <Pagination {...args} />
    );
};

export const Default = Template.bind({});
Default.args = {
    itemsPerPage: 1,
    totalItems: 50,
    maxPageNumbersDisplayed: 9,
    onPaginate: (currentPage: number) => {
    },
    vSize: 2,
};
