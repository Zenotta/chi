import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './Button.scss';
import { Loading } from "../Loading/Loading";
import { lightenDarkenColour, transparentizeColour, STORYBOOK_VALS } from "../../utils";

export interface ButtonProps {
  loading?: boolean,
  loadingColour?: string,
  mainColour?: string,
  textColour?: string,
  disabled?: boolean,
  endIcon?: React.ReactElement,
  startIcon?: React.ReactElement,
  overridingClass?: string,
  onClick?: Function,
  variant?: 'contained' | 'outlined'
}

const DEFAULT_TEXT_COLOUR = "#ffffff";
const DEFAULT_BG_COLOUR = "#000000";

export const Button: FunctionComponent<ButtonProps> = (props) => {
  const variant = props.variant || 'outlined';
  const [clicked, setClicked] = useState(false);
  const borderColour = props.mainColour || DEFAULT_BG_COLOUR;
  const bgColour = variant == 'contained' ? (props.mainColour || DEFAULT_BG_COLOUR) : '#ffffff';
  const textColour = props.textColour || (variant == 'contained' ? DEFAULT_TEXT_COLOUR : props.mainColour);

  /**
   * Gets the inline styling for a disabled state
   */
  const getDisabledInlineStyles = () => {
    return {
      backgroundColor: variant == 'contained' ? 'rgb(244, 245, 248)' : '#fff',
      border: `1px solid rgb(213, 216, 221)`,
      color: STORYBOOK_VALS.disabled
    }
  }

  /**
   * Gets the loading icon colour based on sensible defaults
   */
  const getLoadingColour = (): string => {
    if (props.disabled) { return STORYBOOK_VALS.disabled }
    if (props.loadingColour) { return props.loadingColour }

    if (props.textColour && variant == 'contained') { return props.textColour }
    if (props.mainColour && variant == 'outlined') { return props.mainColour }

    return variant == 'contained' ? DEFAULT_TEXT_COLOUR : DEFAULT_BG_COLOUR;
  }

  /**
   * Handles a click event
   */
  const handleClick = () => {
    const newBg = variant == 'contained' ? lightenDarkenColour(bgColour, -25) : transparentizeColour(borderColour, .3);

    setInlineStyles(props.disabled ? getDisabledInlineStyles : {
      backgroundColor: newBg,
      border: inlineStyles.border,
      color: inlineStyles.color
    });

    if (props.onClick) {
      props.onClick();
    }

    setClicked(true);
  }

  /**
   * Handles mouse enter event on button
   * 
   * @param e {any}
   */
  const handleMouseEnter = (e: any) => {
    const newBg = variant == 'contained' ? lightenDarkenColour(bgColour, -15) : transparentizeColour(borderColour, .1);

    setInlineStyles(props.disabled ? getDisabledInlineStyles : {
      backgroundColor: newBg,
      border: inlineStyles.border,
      color: inlineStyles.color
    });
  }

  /**
   * Handles mouse leave event on button
   * 
   * @param e {any}
   */
  const handleMouseLeave = (e: any) => {
    setInlineStyles(props.disabled ? getDisabledInlineStyles : {
      backgroundColor: bgColour,
      border: inlineStyles.border,
      color: inlineStyles.color
    });
  }

  /** State watch */
  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        handleMouseEnter(null);
        setClicked(false);
      }, 100);
    }
    
  }, [clicked]);

  // Set colouring variablts
  const loadingColour = getLoadingColour();
  const [inlineStyles, setInlineStyles] = useState<any>(props.disabled ? getDisabledInlineStyles() : {
    backgroundColor: bgColour,
    border: `1px solid ${borderColour}`,
    color: textColour
  });

  return (
    <button
      disabled={props.disabled}
      style={inlineStyles}
      className={`${styles.container} ${styles[variant]} ${props.overridingClass}`}
      onMouseEnter={e => handleMouseEnter(e)}
      onMouseLeave={e => handleMouseLeave(e)}
      onClick={() => handleClick()}>
      {props.loading &&
        <span className={styles.loadingContainer}>
          <Loading type="round" colour={loadingColour} />
        </span>
      }
      {!props.loading && props.startIcon}
      {props.children}
      {props.endIcon}
    </button>
  );
};
