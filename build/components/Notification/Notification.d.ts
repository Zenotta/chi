import { FunctionComponent } from 'react';
declare type NotificationType = 'info' | 'success' | 'warning' | 'error';
export interface NotificationProps {
    type: NotificationType;
    closable?: boolean;
    colour?: string;
    className?: string;
    variant?: 'text' | 'outlined' | 'contained';
}
export declare const Notification: FunctionComponent<NotificationProps>;
export {};
