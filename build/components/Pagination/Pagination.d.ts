import React from 'react';
export interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    maxPageNumbersDisplayed: number;
    onPaginate: Function;
    vSize?: number;
    variant?: 'bordered';
    mainColor?: string;
    textColor?: string;
    backgroundColor?: string;
    hoverColor?: string;
    borderColor?: string;
    overridingClass?: string;
    disableArrows?: boolean;
    enableStrokeAnimation?: boolean;
    enableArrowBorder?: boolean;
    enableArrowBackground?: boolean;
}
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<unknown>>;
