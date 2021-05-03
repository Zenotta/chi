import { Button as MUIButton, ButtonProps } from '@material-ui/core';
import styles from './Button.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Loading } from "../Loading/Loading";
import { lightenDarkenColour, transparentizeColour } from "../../utils";

export interface ChiButtonProps {
  loading?: boolean,
  loadingColour?: string,
  backgroundColour?: string,
  textColour?: string
}


const DEFAULT_COLOUR = "#fff";
const DEFAULT_SUPPORT_COLOUR = "#000";

export const Button = (props: ButtonProps & ChiButtonProps) => {
  let loadingColour = props.disabled ? "#b4b4b4" : props.loadingColour ? props.loadingColour : DEFAULT_COLOUR;

  // Constructs class variants
  const constructClassVariants = (): any => {
    let backgroundColour = props.backgroundColour || DEFAULT_COLOUR;
    let textColour = props.textColour || DEFAULT_SUPPORT_COLOUR;

    return {
      default: {
        root: {
          color: backgroundColour,
          '&:hover': {
            background: transparentizeColour(backgroundColour, 0.15)
          },
          '&:active': {
            background: transparentizeColour(backgroundColour, 0.5)
          }
        }
      },
      outlined: {
        root: {
          border: `1px solid ${backgroundColour}`,
          color: backgroundColour,
          '&:hover': {
            border: `1px solid ${backgroundColour}`,
            background: transparentizeColour(backgroundColour, 0.15)
          },
          '&:active': {
            background: transparentizeColour(backgroundColour, 0.3)
          }
        },
      },
      contained: {
        root: {
          color: textColour,
          background: backgroundColour,
          '&:hover': {
            background: lightenDarkenColour(backgroundColour, 10)
          },
          '&:active': {
            background: lightenDarkenColour(backgroundColour, 40)
          }
        }
      }
    };
  }

  let classes = constructClassVariants();
  let mainClass = makeStyles(classes.default);

  // Class names based on variant
  if (props.variant == "contained") {
    mainClass = makeStyles(classes.contained);
  } else if (props.variant == "outlined") {
    mainClass = makeStyles(classes.outlined);
  }

  return (
    <MUIButton classes={{
      root: mainClass().root
    }}
      {...props}>
      {props.loading &&
        <span className={styles.loadingContainer}>
          <Loading colour={loadingColour} />
        </span>
      }
      {props.children}
    </MUIButton>
  );
};
