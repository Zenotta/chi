import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import styles from './Table.scss';

export interface TableCell {
    id?: string,
    value: any,
    isNumeric: boolean
}

export interface TableProps {
    header: TableCell[],
    body?: TableCell[][],
    sortable?: boolean,
    orderBy?: string,
    order?: 'asc' | 'desc',
    rowCount?: number,
    overridingClass?: string
}

interface HeaderId {
    id: string,
    label: string
}

export const Table = (props: TableProps) => {
    const [order, setOrder] = useState(props.order || 'asc');
    const headerIds: HeaderId[] = [];


    const getArrowIcon = () => {
        return (
            <svg className={`${styles.arrow} ${styles[`direc-${order ? order : 'desc'}`]}`} x="0px" y="0px" viewBox="0 0 492.004 492.004">
                <path d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136
			c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002
			v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864
			c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872
			l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"/>
            </svg>
        );
    }

    /** 
     * Maps an input value to a generated ID
     * 
     * @param value {string} - Value to map
     */
    const mapValueToId = (value: string): string => {
        let headerId = headerIds.filter(e => e.label == value);
        return headerId.length ? headerId[0].id : "";
    }

    /** 
     * Injects the unique ID for header inputs
     * 
     * @param cells {TableCell[]} - Header cells to inject an ID into
     */
    const injectHeaderId = (cells: TableCell[]): TableCell[] => {
        return cells.map((cell) => {
            if (!cell.id) {
                cell.id = uuidv4();
            }

            // Push to header ID holding
            headerIds.push({
                id: cell.id,
                label: cell.value
            });

            return cell;
        });
    }

    /** 
     * Injects the corresponding header ID for each row
     * 
     * @param rows {TableCell[][]} - Rows to inject corresponding header IDs into
     */
    const injectBodyRowId = (rows: TableCell[][]): any[] => {
        return rows.map((row) => {
            let newRow: any = {};

            for (let i = 0; i < headerIds.length; i++) {
                newRow[headerIds[i].id] = row[i];
            }

            return newRow;
        });
    }

    /** 
     * Handles a sort change
     * 
     * @param id {string} - ID to sort by
     */
    const handleRequestSort = (id: any) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
    };

    /** 
     * Performs a descending comparison
     * 
     * @param a {any} - First cell to compare
     * @param b {any} - Second cell to compare
     * @param orderBy {string} - ID to sort by
     */
    const descendingComparator = (a: any, b: any, orderBy: string): number => {
        if (b[orderBy].value < a[orderBy].value) {
            return -1;
        }
        if (b[orderBy].value > a[orderBy].value) {
            return 1;
        }
        return 0;
    }

    /** 
     * Gets the comparator based on ID (orderBy)
     * 
     * @param a {any} - First cell to compare
     * @param b {any} - Second cell to compare
     */
    const getComparator = (): (a: any, b: any) => number => {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    /** 
     * Performs a sort on body data by comparator
     * 
     * @param body {TableCell[][]} - Table body cells to sort
     * @param comparator {Function} - Function to compare through for sort
     */
    const stableSort = (body: TableCell[][], comparator: (a: any, b: any) => number): TableCell[][] => {
        const stabilizedThis: any[] = body.map((el, index) => [el, index]);
        stabilizedThis.sort((a: any, b: any): any => {
            const order = comparator(a[0], b[0]);

            if (order !== 0) return order;
            return a[1] - b[1];
        });

        let stabilisedVal = stabilizedThis.map((el: [TableCell[], number]) => el[0]);
        return stabilisedVal;
    }

    // Reconstruct inputs by ID
    const header = injectHeaderId(props.header);
    const body = props.body ? injectBodyRowId(props.body) : null;

    // Set orderBy
    const [orderBy, setOrderBy] = useState(props.orderBy ? mapValueToId(props.orderBy) : mapValueToId(props.header[0].value));

    return (
        <section className={styles.superContainer}>
            <div className={`${styles.container} ${props.overridingClass}`}>
                <table className={styles.table} role="table" aria-label="data table">
                    <thead>
                        <tr>
                            {header.map((heading: TableCell) => {
                                let alignment: 'right' | undefined = heading.isNumeric ? "right" : undefined;

                                return (
                                    <th
                                        key={heading.id}
                                        align={alignment}>
                                        {props.sortable &&
                                            <div
                                                className={`${styles.sorter} ${orderBy == heading.id ? styles.active : ''}`}
                                                onClick={() => handleRequestSort(heading.id)}>
                                                {heading.value}
                                                {orderBy == heading.id ? (
                                                    <span className={styles.screenreaderVisible}>
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </span>
                                                ) : null}
                                                {getArrowIcon()}
                                            </div>}
                                        {!props.sortable && heading.value}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {body && stableSort(body, getComparator())
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any, i) => {
                                return (
                                    <tr key={i}>
                                        {Object.keys(row).map((headerId) => {
                                            let alignment: 'right' | undefined = row[headerId].isNumeric ? "right" : undefined;
                                            return <td key={row[headerId].id} align={alignment}>{row[headerId].value}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}