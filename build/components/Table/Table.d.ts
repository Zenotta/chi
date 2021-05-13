/// <reference types="react" />
export interface TableCell {
    id?: string;
    value: any;
    isNumeric: boolean;
}
export interface TableProps {
    header: TableCell[];
    body?: TableCell[][];
    sortable?: boolean;
    orderBy?: string;
    order?: 'asc' | 'desc';
    rowCount?: number;
    styles?: any;
}
export declare const Table: (props: TableProps) => JSX.Element;
