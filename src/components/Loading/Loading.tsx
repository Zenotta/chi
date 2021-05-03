import styles from './Loading.scss';

export interface ChiLoadingProps {
    colour?: string
}

export const Loading = (props: ChiLoadingProps) => {
    return (
        <div className={styles.loadingContainer} role="status">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid">
                <circle
                cx="50"
                cy="50"
                fill="none"
                stroke={props.colour ? props.colour : "#fff"}
                strokeWidth="10"
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