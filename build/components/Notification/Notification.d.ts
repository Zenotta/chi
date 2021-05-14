import { FunctionComponent } from 'react';
declare type NotificationType = 'info' | 'success' | 'warning' | 'error';
export interface NotificationProps {
    type: NotificationType;
    closable?: boolean;
    heading?: boolean;
    closeItem?: any;
    colour?: string;
    overridingClass?: string;
    variant?: 'text' | 'outlined' | 'contained';
}
export declare const Notification: FunctionComponent<NotificationProps>;
export {};
