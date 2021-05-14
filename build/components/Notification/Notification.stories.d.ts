import { Story, Meta } from '@storybook/react';
import React from 'react';
import { NotificationProps } from './Notification';
declare const _default: Meta<import("@storybook/react").Args>;
export default _default;
export declare const Info: Story<NotificationProps & {
    children: React.ReactElement[];
}>;
export declare const Error: Story<NotificationProps & {
    children: React.ReactElement[];
}>;
export declare const Success: Story<NotificationProps & {
    children: React.ReactElement[];
}>;
export declare const Warning: Story<NotificationProps & {
    children: React.ReactElement[];
}>;
