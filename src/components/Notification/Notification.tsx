import React, { FunctionComponent, useState } from 'react';
import styles from './Notification.scss';

type NotificationType =
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

export interface NotificationProps {
    type: NotificationType,
    closable?: boolean,
    heading?: boolean,
    closeItem?: any,
    colour?: string,
    overridingClass?: string,
    variant?: 'text' | 'outlined' | 'contained'
}

const DEFAULT_INFO_COLOUR = '#1890ff';
const DEFAULT_SUCCESS_COLOUR = '#52c41a';
const DEFAULT_WARNING_COLOUR = '#faad14';
const DEFAULT_ERROR_COLOUR = '#ff4d4f';

export const Notification: FunctionComponent<NotificationProps> = (props) => {
    const variantClass = props.variant ? styles[`${props.variant}-${props.type}`] : '';
    const [openClass, setOpenClass] = useState('');

    const closeSelf = () => {
        setOpenClass(styles.closed)
    }

    const getInfoIcon = () => {
        let colour = props.colour || props.variant == 'contained' ? "#fff" : DEFAULT_INFO_COLOUR;
        return (
            <svg x="0px" y="0px" viewBox="0 0 512 512">
                <path fill={colour} d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257s255-116.39,255-257S397.61,0,257,0z M287,392c0,16.54-13.47,30-30,30
			    c-16.54,0-30-13.46-30-30V240c0-16.54,13.46-30,30-30c16.53,0,30,13.46,30,30V392z M257,150c-16.54,0-30-13.46-30-30
			    s13.46-30,30-30c16.53,0,30,13.46,30,30S273.53,150,257,150z"/>
            </svg>
        );
    }

    const getErrorIcon = () => {
        let colour = props.colour || props.variant == 'contained' ? "#fff" : DEFAULT_ERROR_COLOUR;
        return (
            <svg x="0px" y="0px" viewBox="0 0 51.976 51.976">
                <path fill={colour} d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0
		        C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778
		        c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828
		        c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828
		        l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"/>
            </svg>
        );
    }

    const getSuccessIcon = () => {
        let colour = props.colour || props.variant == 'contained' ? "#fff" : DEFAULT_SUCCESS_COLOUR;
        return (
            <svg x="0px" y="0px" viewBox="0 0 408.576 408.576">
                <path fill={colour} d="M204.288,0C91.648,0,0,91.648,0,204.288s91.648,204.288,204.288,204.288s204.288-91.648,204.288-204.288
			    S316.928,0,204.288,0z M318.464,150.528l-130.56,129.536c-7.68,7.68-19.968,8.192-28.16,0.512L90.624,217.6
			    c-8.192-7.68-8.704-20.48-1.536-28.672c7.68-8.192,20.48-8.704,28.672-1.024l54.784,50.176L289.28,121.344
			    c8.192-8.192,20.992-8.192,29.184,0C326.656,129.536,326.656,142.336,318.464,150.528z"/>
            </svg>
        );
    }

    const getWarningIcon = () => {
        let colour = props.colour || props.variant == 'contained' ? "#fff" : DEFAULT_WARNING_COLOUR;
        return (
            <svg x="0px" y="0px" viewBox="0 0 512 512">
                <path fill={colour} d="M501.609,384.603L320.543,51.265c-13.666-23.006-37.802-36.746-64.562-36.746c-26.76,0-50.896,13.74-64.562,36.746
                c-0.103,0.176-0.19,0.352-0.293,0.528L10.662,384.076c-13.959,23.491-14.223,51.702-0.719,75.457
                c13.535,23.769,37.919,37.948,65.266,37.948h360.544c27.347,0,52.733-14.179,66.267-37.948
                C515.524,435.779,515.261,407.566,501.609,384.603z M225.951,167.148c0-16.586,13.445-30.03,30.03-30.03
                c16.586,0,30.03,13.445,30.03,30.03v120.121c0,16.584-13.445,30.03-30.03,30.03s-30.03-13.447-30.03-30.03V167.148z
                M255.981,437.421c-24.839,0-45.046-20.206-45.046-45.046c0-24.839,20.206-45.045,45.046-45.045
                c24.839,0,45.045,20.206,45.045,45.045C301.027,417.214,280.821,437.421,255.981,437.421z"/>
            </svg>
        );
    }

    return (
        <div className={`${styles.container} ${props.overridingClass} ${variantClass} ${openClass}`} data-testid="notification">
            {props.type == "info" && <span className={styles.icon}>{getInfoIcon()}</span>}
            {props.type == "error" && <span className={styles.icon}>{getErrorIcon()}</span>}
            {props.type == "success" && <span className={styles.icon}>{getSuccessIcon()}</span>}
            {props.type == "warning" && <span className={styles.icon}>{getWarningIcon()}</span>}
            {props.children}

            {
                props.closable &&
                <span className={styles.close} onClick={() => closeSelf()}>
                    <svg viewBox="0 0 329.26933 329">
                        <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219
                         0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 
                         8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 
                         15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                    </svg>
                </span>
            }
        </div>
    );
}