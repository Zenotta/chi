import * as React from 'react';
import styles from './Loading.scss';

export interface LoadingProps {
    type: 'round' | 'square',
    colour?: string,
    className?: string
}

export const Loading = (props: LoadingProps) => {
    let lineCap: 'butt' | 'round' = props.type == 'square' ? 'butt' : props.type;
    return (
        <div className={`${styles.loadingContainer} ${props.className}`} role="status">
            <svg
                className={styles.loadingSvg}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid">
                <circle
                cx="50"
                cy="50"
                fill="none"
                stroke={props.colour ? props.colour : "#fff"}
                strokeWidth="10"
                strokeLinecap={lineCap}
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
                transform="rotate(102.756 50 50)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1" />
                </circle>
            </svg>
            <span className={styles.loadingScreenreader}>Loading...</span>
        </div>
    );
}