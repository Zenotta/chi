import React, { useState } from 'react';
import { Loading } from '../Loading/Loading';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import { StyleSheet, css } from 'aphrodite';
import { transparentizeColour } from '../../utils';

import * as icons from './TextIcon';
import styles from './TextInput.scss';

type TextType =
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'search';

export interface TextInputProps {
    onSubmit?: Function,
    type?: TextType,
    id?: string,
    label?: string,
    onChange?: Function,
    loading?: boolean,
    loadingColour?: string,
    primaryColour?: string,
    actionColour?: string,
    shouldSubmitOnEnter?: boolean,
    autocompleteValues?: DropdownItem[],
    overridingClass?: string,
    iconType?: 'none' | 'text' | 'outlined' | 'contained'
}

export const TextInput = (props: TextInputProps) => {
    const type = props.type || 'text';
    const primaryColour = props.primaryColour || "#000000";
    const actionColour = props.actionColour || primaryColour;
    const iconType = props.iconType || 'none';
    const loadingColour = props.loadingColour ? props.loadingColour : props.primaryColour ? props.primaryColour : "#000000";

    const [value, setValue] = useState(props.label ? props.label : '');
    const [matchesAreVisible, setMatchesAreVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [autocompleteMatches, setAutoCompleteMatches] = useState<DropdownItem[]>([]);

    /** Handles input change event */
    const onTextInputChange = (e: any) => {
        getAutocompleteMatches(e.target.value);
        setValue(e.target.value);

        if (props.onChange) {
            props.onChange(e);
        }
    }

    /** Handles input key down event */
    const onTextInputKeyDown = (e: any) => {
        // Handle submitting search via Enter key
        if (e.key === 'Enter' && props.shouldSubmitOnEnter && props.onSubmit) {
            props.onSubmit(value);
        }
    }

    const onIconClick = () => {
        if (type == 'password') {
            setPasswordVisible(!passwordVisible);
        }

        if (type != 'password' && props.onSubmit) {
            props.onSubmit(value);
        }
    }

    /** Gets required pseudoselector styles */
    const getPseudoStyles = () => {
        let shadow = transparentizeColour(actionColour, .4);

        return StyleSheet.create({
            focus: {
                ':focus': {
                    outline: 'none',
                    border: `1px solid #fff`,
                    boxShadow: `0 0 0 3px ${shadow}`,
                }
            }
        });
    }

    const pseudoStyles = getPseudoStyles();


    /**
     * Gets the autocomplete matches for the current value
     * 
     * @param value {string} - Current value in input field
     */
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

    /** Gets the text field input */
    const getTextInputInput = () => {
        let typeToSet = type == 'password' && passwordVisible ? 'text' : type; 
        
        return (
            <input 
                placeholder={props.label}
                className={`${styles.input} ${css(pseudoStyles.focus)}`}
                type={typeToSet} onChange={onTextInputChange} onKeyDown={onTextInputKeyDown} />
        );
    }

    /** Get the right icon for the input type */
    const getIcon = () => {
        if (iconType == 'none') {
            return '';
        }

        if (type == 'search') {
            return icons.getSearchIcon(loadingColour);
        }

        if (type == 'password') {
            if (passwordVisible) {
                return icons.getPasswordVisibleIcon(loadingColour);
            }

            return icons.getPasswordHiddenIcon(loadingColour);
        }

        return icons.getArrowIcon(loadingColour);
    }

    return (
        <div className={`${styles.container} ${props.overridingClass}`} data-testid="textInputContainer">
            {props.autocompleteValues &&
                <div className={styles.dropdownContainer}>
                    <Dropdown listItems={autocompleteMatches} visible={matchesAreVisible}>
                        {getTextInputInput()}
                    </Dropdown>
                </div>}

            {!props.autocompleteValues && getTextInputInput()}  

            {props.loading && <div className={styles.loadingContainer}><Loading colour={loadingColour} /></div>}
            {!props.loading && 
                <span 
                    className={styles.icon} 
                    onClick={() => onIconClick()}>
                        {getIcon()}
                </span>}
        </div>
    );
}