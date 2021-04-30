import { Button as MUIButton } from '@material-ui/core';
import styles from './Button.scss';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = (props: ButtonProps) => {
  return (
    <MUIButton classes={{
      root: props.primary ? styles[`storybook-button-primary`] : styles[`storybook-button`]
    }}>
      {props.label}
    </MUIButton>
  );
};
