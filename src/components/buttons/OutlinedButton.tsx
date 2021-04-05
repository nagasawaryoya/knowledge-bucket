import React, { FC, MouseEventHandler } from 'react';
import MuiButton from '@material-ui/core/Button';
import { ButtonProps as MuiButtonProps } from '@material-ui/core';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { COLOR } from 'unions/ui-theme/color';
import { BORDER, BUTTON, CommonStyles } from 'unions/ui-theme/style';

type ButtonStyles = Omit<React.CSSProperties, 'color' | 'backgroundColor' | 'borderColor'> & {
  width?: CommonStyles.ButtonWidth;
  height?: CommonStyles.ButtonHeight;
  borderRadius?: CommonStyles.BorderRadius;
  borderWidth?: CommonStyles.BorderWidth;
};

type ButtonProps = MuiButtonProps & {
  label: string;
  button?: Omit<MuiButtonProps, 'variant' | 'color'>;
  style?: ButtonStyles;
  onClick?: MouseEventHandler;
};

/**
 * 外枠ボタンコンポーネント。
 */
export const OutlinedButton: FC<ButtonProps> = ({ label, button, style, onClick }) => {
  const classes = useStyles(style);
  return (
    <MuiButton className={classes.root} variant="outlined" {...button} onClick={onClick}>
      {label}
    </MuiButton>
  );
};

/**
 * スタイルを適用する。
 */
const useStyles = (style?: ButtonStyles) => {
  const currenTheme = useTheme();

  return makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: style?.width ?? BUTTON.WIDTH.M,
        height: style?.height ?? BUTTON.HEIGHT.M,
        borderColor: COLOR.GREY.MAIN,
        borderWidth: style?.borderWidth ?? BORDER.WIDTH.M,
        borderRadius: style?.borderRadius ?? BORDER.RADIUS.S,
        borderStyle: style?.borderStyle ?? 'solid',
        ...styling(currenTheme),
      },
    }),
  )();
};

/**
 * テーマに応じたスタイルを返却する。
 */
const styling = (theme: Theme) =>
  theme.palette.type === THEME_TYPE.DARK
    ? {
        color: COLOR.GREY.LIGHT,
        '&:hover': {
          backgroundColor: COLOR.NAVY.MAIN,
        },
      }
    : {
        color: COLOR.BLACK.DARK,
        '&:hover': {
          color: COLOR.WHITE.MAIN,
          backgroundColor: COLOR.BLUE.MAIN,
        },
      };
