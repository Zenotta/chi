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
  borderRadius?: string,
  textTransform?: string,
  type?: 'contained' | 'outlined'
}

const DEFAULT_TEXT_COLOUR = "#ffffff";
const DEFAULT_BG_COLOUR = "#000000";

export const Button: FunctionComponent<ButtonProps> = (props) => {
  const type = props.type || 'outlined';
  const [clicked, setClicked] = useState(false);
  const borderColour = props.mainColour || DEFAULT_BG_COLOUR;
  const bgColour = type == 'contained' ? (props.mainColour || DEFAULT_BG_COLOUR) : '#ffffff';
  const textColour = props.textColour || (type == 'contained' ? DEFAULT_TEXT_COLOUR : props.mainColour);

  /**
   * Gets the inline styling for a disabled state
   */
  const getDisabledInlineStyles = () => {
    let style: any = {
      backgroundColor: type == 'contained' ? 'rgb(244, 245, 248)' : '#fff',
      border: `1px solid rgb(213, 216, 221)`,
      color: STORYBOOK_VALS.disabled
    };

    if (props.borderRadius) {
      style['borderRadius'] = props.borderRadius;
    }

    if (props.textTransform) {
      style['textTransform'] = props.textTransform;
    }

    return style;
  }

  /**
   * Gets the loading icon colour based on sensible defaults
   */
  const getLoadingColour = (): string => {
    if (props.disabled) { return STORYBOOK_VALS.disabled }
    if (props.loadingColour) { return props.loadingColour }

    if (props.textColour && type == 'contained') { return props.textColour }
    if (props.mainColour && type == 'outlined') { return props.mainColour }

    return type == 'contained' ? DEFAULT_TEXT_COLOUR : DEFAULT_BG_COLOUR;
  }

  /**
   * Handles a click event
   */
  const handleClick = () => {
    const newBg = type == 'contained' ? lightenDarkenColour(bgColour, -25) : transparentizeColour(borderColour, .3);

    let style: any = {
      backgroundColor: newBg,
      border: inlineStyles.border,
      color: inlineStyles.color
    };

    if (props.borderRadius) {
      style['borderRadius'] = props.borderRadius;
    }

    if (props.textTransform) {
      style['textTransform'] = props.textTransform;
    }

    setInlineStyles(props.disabled ? getDisabledInlineStyles : style);

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
    const newBg = type == 'contained' ? lightenDarkenColour(bgColour, -15) : transparentizeColour(borderColour, .1);
    let style: any = {
      backgroundColor: newBg,
      border: inlineStyles.border,
      color: inlineStyles.color
    };

    if (props.borderRadius) {
      style['borderRadius'] = props.borderRadius;
    }

    if (props.textTransform) {
      style['textTransform'] = props.textTransform;
    }

    setInlineStyles(props.disabled ? getDisabledInlineStyles : style);
  }

  /**
   * Handles mouse leave event on button
   * 
   * @param e {any}
   */
  const handleMouseLeave = (e: any) => {
    let style: any = {
      backgroundColor: bgColour,
      border: inlineStyles.border,
      color: inlineStyles.color
    };

    if (props.borderRadius) {
      style['borderRadius'] = props.borderRadius;
    }

    if (props.textTransform) {
      style['textTransform'] = props.textTransform;
    }

    setInlineStyles(props.disabled ? getDisabledInlineStyles : style);
  }

  const getRegularInlineStyles = () => {
    let style: any = {
      backgroundColor: bgColour,
      border: `1px solid ${borderColour}`,
      color: textColour
    };

    if (props.borderRadius) {
      style['borderRadius'] = props.borderRadius;
    }

    if (props.textTransform) {
      style['textTransform'] = props.textTransform;
    }

    return style;
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
  const [inlineStyles, setInlineStyles] = useState<any>(props.disabled ? getDisabledInlineStyles() : getRegularInlineStyles());

  return (
    <button
      disabled={props.disabled}
      style={inlineStyles}
      className={`${styles.container} ${styles[type]} ${props.overridingClass}`}
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
