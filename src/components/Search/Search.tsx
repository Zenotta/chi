import { TextField } from '@material-ui/core';
import styles from './Search.scss';

export interface SearchProps {
    onSubmit: Function,
    id?: string,
    label?: string,
    onChange?: Function,
    loading?: boolean,
    loadingColour?: string,
    colour?: string,
    autocompleteValues?: string[]
}

export const Search = (props: SearchProps) => {
    const id = props.id || "search";
    const label = props.label || "Search...";

    return (
        <div className={styles.container}>
            <TextField id={id} label={label} />
        </div>
    )
}