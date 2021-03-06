import RcDropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import React, { FunctionComponent, useState } from 'react';
import styles from './Dropdown.scss';

type Placement = 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topRight'
    | 'topCenter'
    | 'bottomCenter';

export interface DropdownItem {
    value: any,
    isDisabled?: boolean,
    hasDividerBefore?: boolean
}

export interface DropdownProps {
    listItems: DropdownItem[],
    dropdownMethod?: 'hover' | 'click',
    placement?: Placement,
    className?: string,
    visible?: boolean,
    onItemClick?: Function,
}

export interface ItemSelection {
    key: any
}

export const Dropdown: FunctionComponent<DropdownProps> = (props) => {
    const placement = props.placement || 'bottomCenter';
    const dropdownMethod = props.dropdownMethod || 'click';
    const [selected, setSelected] = useState(0);

    const onSelect = (select: ItemSelection) => {
        if (props.onItemClick) {
            props.onItemClick(select);
        }
    }

    const getListItemMenu = () => {
        return (
            <Menu onSelect={onSelect}>
                {props.listItems.map((item, i) => {
                    return (
                        <MenuItem key={i} disabled={item.isDisabled}>
                            {item.value}
                        </MenuItem>
                    );
                })}
            </Menu>
        );
    }

    return (
        <div className={`${styles.container} ${props.className}`} data-testid="dropdown">
            <RcDropdown
                placement={placement}
                trigger={[dropdownMethod]}
                overlay={getListItemMenu()}
                overlayClassName={`${styles.dropdownList} ${props.className}`}
                animation="slide-up"
                {...(props.visible !== undefined && { visible: props.visible })}>
                <div className={styles.hoverContainer}>
                    {props.children}
                </div>
            </RcDropdown>
        </div>
    );
}

