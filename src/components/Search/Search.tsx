import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Loading } from '../Loading/Loading';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import styles from './Search.scss';

export interface SearchProps {
    onSubmit: Function,
    id?: string,
    label?: string,
    onChange?: Function,
    loading?: boolean,
    loadingColour?: string,
    colour?: string,
    shouldSubmitOnEnter?: boolean,
    variant?: 'outlined' | 'filled' | 'standard',
    autocompleteValues?: DropdownItem[]
}

export const Search = (props: SearchProps) => {
    const id = props.id || "search";
    const label = props.label || "Search...";
    const variant = props.variant || 'outlined';
    const loadingColour = props.loadingColour ? props.loadingColour : props.colour ? props.colour : "#000";
    const [matchesAreVisible, setMatchesAreVisible] = useState(false);
    const [autocompleteMatches, setAutoCompleteMatches] = useState<DropdownItem[]>([]);

    const onSearchChange = (e: any) => {
        // Handle submitting search via Enter key
        if (e.keyCode === 13 && props.shouldSubmitOnEnter) {
            props.onSubmit();
        }

        getAutocompleteMatches(e.target.value);

        if (props.onChange) {
            props.onChange(e);
        }
    }

    const getAutocompleteMatches = (value: string) => {
        if (props.autocompleteValues) {
            if (value.length) {
                let matches = props.autocompleteValues
                    .filter(e => e.value.toLowerCase().indexOf(value.toLowerCase()) != -1);
                
                setAutoCompleteMatches(matches);
                setMatchesAreVisible(autocompleteMatches.length > 0);
                
            } else {
                setMatchesAreVisible(false);
            }
        }
    }

    const getSearchInput = () => {
        return (
            <TextField
                variant={variant}
                fullWidth={true}
                id={id}
                onChange={e => onSearchChange(e)}
                label={label} />
        );
    }

    return (
        <div className={styles.container} role="search" data-testid="search">
            {props.autocompleteValues &&
                <div className={styles.dropdownContainer}>
                    <Dropdown listItems={autocompleteMatches} visible={matchesAreVisible}>
                        {getSearchInput()}
                    </Dropdown>
                </div>}
            
            {!props.autocompleteValues && getSearchInput()}

            {props.loading && <div className={styles.loadingContainer}><Loading colour={loadingColour} /></div>}
        </div>
    )
}