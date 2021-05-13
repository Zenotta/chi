import { TextField } from '@material-ui/core';
import { Loading } from '../Loading/Loading';
import styles from './Search.scss';

export interface SearchProps {
    onSubmit: Function,
    id?: string,
    label?: string,
    onChange?: Function,
    loading?: boolean,
    loadingColour?: string,
    colour?: string,
    variant?: 'outlined' | 'filled' | 'standard'
    autocompleteValues?: string[]
}

export const Search = (props: SearchProps) => {
    const id = props.id || "search";
    const label = props.label || "Search...";
    const variant = props.variant || 'outlined';
    const loadingColour = props.loadingColour ? props.loadingColour : props.colour ? props.colour : "#000";

    const onSearchChange = (e: any) => {


        if (props.onChange) {
            props.onChange(e);
        }
    }

    return (
        <div className={styles.container} role="search">
            <TextField 
                variant={variant}
                fullWidth={true} 
                id={id} 
                onChange={e => onSearchChange(e)}
                label={label} />
            
            {props.loading && <div className={styles.loadingContainer}><Loading colour={loadingColour} /></div>}
        </div>
    )
}