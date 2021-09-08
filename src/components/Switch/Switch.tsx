import React, { useState } from 'react';
import styles from './Switch.scss';

export interface SwitchProps {
    className?: string,
    onClick?: Function,
    leftChild?: string,
    rightChild?: string,
    textIsSwitch?: boolean,
    isOnDefault?: boolean,
    backgroundColourActive?: string,
    backgroundColourInactive?: string,
    switchColourActive?: string,
    switchColourInactive?: string,
    textColourInactive?: string,
    textColourActive?: string,
    width?: string,
    height?: string
}

export const Switch = (props: SwitchProps) => {
    const [on, setOn] = useState(props.isOnDefault ? props.isOnDefault : false);
    const [onClass, setOnClass] = useState(on ? styles.active : '');

    const onSwitchClick = () => {
        setOn(!on);
        setOnClass(!on ? styles.active : '');
    
        if (props.onClick) {
            props.onClick(on);
        }
    }

    const getInlineStyles = () => {
        // Defaults
        const ACTIVE = '#333';
        const INACTIVE = '#BFBFBF';

        let style: any = {};
        style['background'] = props.backgroundColourInactive || INACTIVE;

        if (on) {
            if (props.backgroundColourActive) {
                style['background'] = props.backgroundColourActive;
            } else {
                style['background'] = ACTIVE;
            }            
        }

        style['width'] = props.width || '100%';
        style['height'] = props.height || '100%';

        return style;
    }

    const getSwitchInlineStyles = () => {
        let style: any = {};
        style['background'] = props.switchColourInactive || '#FFF';

        if (props.switchColourActive && on) {
            style['background'] = props.switchColourActive;
        }

        if (props.textIsSwitch) {
            style['zIndex'] = 1;
        }

        return style;
    }

    const getSwitchTextStyles = () => {
        let style: any = {};

        if (props.textIsSwitch) {
            style['zIndex'] = 3;
        }

        if (props.textColourActive && on) {
            style['color'] = props.textColourActive;
        }

        if (props.textColourInactive && !on) {
            style['color'] = props.textColourInactive;
        }

        return style;
    }

    const getChildStyle = (isLeft: boolean) => {
        if (on) {
            if (props.textColourInactive && isLeft) {
                return { color: props.textColourInactive };
            }

            if (props.textColourActive && !isLeft) {
                return { color: props.textColourActive };
            }
        }

        if (props.textColourInactive && !isLeft) {
            return { color: props.textColourInactive };
        }

        if (props.textColourActive && isLeft) {
            return { color: props.textColourActive };
        }

        return {};
    }

    return (
        <div style={getInlineStyles()} className={`${styles.container} ${props.className} ${onClass}`} onClick={() => onSwitchClick()}>
            <div style={getSwitchInlineStyles()} className={`${styles.switchPoint} ${onClass}`}></div>
            {props.leftChild && props.rightChild && <div className={styles.children} style={getSwitchTextStyles()}>
                <p className={styles.leftChild} style={getChildStyle(true)}>{props.leftChild}</p>
                <p className={styles.rightChild} style={getChildStyle(false)}>{props.rightChild}</p>
            </div>}
        </div>
    );
}