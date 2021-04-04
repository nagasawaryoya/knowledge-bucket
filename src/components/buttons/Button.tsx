import React, { FC } from 'react';
import MuiButton from '@material-ui/core/Button';
import { ButtonProps as MuiButtonProps } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Color } from 'unions/ui-theme/color';
import { BORDER, BUTTON, CommonStyles } from 'unions/ui-theme/style';

type ButtonStyles = React.CSSProperties & {
  color?: Color;
  backgroundColor?: Color;
  width?: CommonStyles.ButtonWidth;
  height?: CommonStyles.ButtonHeight;
  borderColor?: Color;
  borderRadius?: CommonStyles.BorderRadius;
  borderWidth?: CommonStyles.BorderWidth;
};

export type ButtonProps = MuiButtonProps & {
  label: string;
  button?: MuiButtonProps;
  style?: ButtonStyles;
};

/**
 * ボタンコンポーネント。
 */
export const Button: FC<ButtonProps> = ({ label, button, style }) => {
  const classes = useStyles(style);
  return (
    <MuiButton {...button} className={classes.root}>
      {label}
    </MuiButton>
  );
};

const useStyles = (style?: ButtonStyles) =>
  makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: style?.width ?? BUTTON.WIDTH.M,
        height: style?.height ?? BUTTON.HEIGHT.M,
        color: style?.color,
        backgroundColor: style?.backgroundColor,
        borderColor: style?.borderColor,
        borderStyle: style?.borderStyle,
        borderWidth: style?.borderWidth,
        borderRadius: style?.borderRadius ?? BORDER.RADIUS.S,
      },
    }),
  )();
