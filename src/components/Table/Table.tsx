import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
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
    rowCount?: number
}

interface HeaderId {
    id: string,
    label: string
}

export const Table = (props: TableProps) => {
    const [order, setOrder] = useState(props.order || 'asc');
    const headerIds: HeaderId[] = [];

    // Maps an input value to a generated ID
    const mapValueToId = (value: string): string => {
        let headerId = headerIds.filter(e => e.label == value);
        return headerId.length ? headerId[0].id : "";
    }

    // Injects the unique ID for header inputs
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

    // Injects the corresponding header ID for each row
    const injectBodyRowId = (rows: TableCell[][]): any[] => {
        return rows.map((row) => {
            let newRow: any = {};

            for (let i = 0; i < headerIds.length; i++) {
                newRow[headerIds[i].id] = row[i];
            }

            return newRow;
        });
    }

    // Handles a sort change
    const handleRequestSort = (property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Performs a descending comparison
    const descendingComparator = (a: any, b: any, orderBy: string): number => {
        if (b[orderBy].value < a[orderBy].value) {
            return -1;
        }
        if (b[orderBy].value > a[orderBy].value) {
            return 1;
        }
        return 0;
    }

    // Gets the comparator based on ID (orderBy)
    const getComparator = (): (a: any, b: any) => number => {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    // Performs a sort on body data by comparator
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
        <Paper>
            <TableContainer>
                <MUITable className={styles.table} aria-label="data table">
                    <TableHead>
                        <TableRow>
                            {header.map((heading: TableCell) => {
                                let alignment: 'right' | undefined = heading.isNumeric ? "right" : undefined;

                                console.log("HEADING", heading);
                                console.log("ORDER BY", orderBy);

                                return (
                                    <TableCell
                                        key={heading.id}
                                        sortDirection={orderBy == heading.id ? order : false}
                                        align={alignment}>
                                        {props.sortable &&
                                            <TableSortLabel
                                                active={orderBy == heading.id}
                                                direction={orderBy === heading.id ? order : 'desc'}
                                                onClick={() => handleRequestSort(heading.id)}>
                                                {heading.value}
                                                {orderBy == heading.id ? (
                                                    <span className={styles.screenreaderVisible}>
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </span>
                                                ) : null}
                                            </TableSortLabel>}
                                        {!props.sortable && heading.value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {body && stableSort(body, getComparator())
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any, i) => {
                                return (
                                    <TableRow key={i}>
                                        {Object.keys(row).map((headerId) => {
                                            let alignment: 'right' | undefined = row[headerId].isNumeric ? "right" : undefined;
                                            return <TableCell key={row[headerId].id} align={alignment}>{row[headerId].value}</TableCell>;
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </MUITable>
            </TableContainer>
        </Paper>
    );
}