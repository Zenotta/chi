import 'rc-dropdown/assets/index.css';
import { FunctionComponent } from 'react';
declare type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'topCenter' | 'bottomCenter';
export interface DropdownItem {
    value: any;
    isDisabled?: boolean;
    hasDividerBefore?: boolean;
}
export interface DropdownProps {
    listItems: DropdownItem[];
    dropdownMethod?: 'hover' | 'click';
    placement?: Placement;
    overridingClass?: string;
    visible?: boolean;
    onItemClick?: Function;
}
export interface ItemSelection {
    key: any;
}
export declare const Dropdown: FunctionComponent<DropdownProps>;
export {};
