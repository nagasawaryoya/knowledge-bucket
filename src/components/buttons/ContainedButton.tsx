import React, { FC, MouseEventHandler } from 'react';
import MuiButton from '@material-ui/core/Button';
import { ButtonProps as MuiButtonProps } from '@material-ui/core';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { COLOR, Color } from 'unions/ui-theme/color';
import { BORDER, BUTTON, CommonStyles } from 'unions/ui-theme/style';

type ButtonStyles = Omit<React.CSSProperties, 'color' | 'borderColor'> & {
  backgroundColor?: Color;
  width?: CommonStyles.ButtonWidth;
  height?: CommonStyles.ButtonHeight;
  borderRadius?: CommonStyles.BorderRadius;
  borderWidth?: CommonStyles.BorderWidth;
};

type ButtonProps = MuiButtonProps & {
  label: string;
  button?: Omit<MuiButtonProps, 'variant'>;
  style?: ButtonStyles;
  onClick?: MouseEventHandler;
};

/**
 * 塗り潰しボタンコンポーネント。
 */
export const ContainedButton: FC<ButtonProps> = ({ label, button, style, onClick }) => {
  const classes = useStyles(style);
  return (
    <MuiButton className={classes.root} variant="contained" {...button} onClick={onClick}>
      {label}
    </MuiButton>
  );
};

/**
 * スタイルを適用する。
 *
 * @param {InputStyles} style スタイル値
 * @returns {ClassNameMap<"root">} cssプロパティ
 */
const useStyles = (style?: ButtonStyles) => {
  const currenTheme = useTheme();

  return makeStyles(() =>
    createStyles({
      root: {
        width: style?.width ?? BUTTON.WIDTH.M,
        height: style?.height ?? BUTTON.HEIGHT.M,
        backgroundColor: style?.backgroundColor,
        borderWidth: style?.borderWidth ?? BORDER.WIDTH.M,
        borderRadius: style?.borderRadius ?? BORDER.RADIUS.S,
        borderStyle: style?.borderStyle ?? 'solid',
        ...styling(currenTheme, style),
      },
    }),
  )();
};

/**
 * テーマに応じたスタイルを返却する。
 *
 * @param {Theme} theme 現在のテーマ
 * @param {InputStyles} style cssプロパティ
 * @returns css プロパティ
 */
const styling = (theme: Theme, style?: ButtonStyles) =>
  theme.palette.type === THEME_TYPE.DARK
    ? {
        borderColor: style?.backgroundColor ?? COLOR.NAVY.MAIN,
        '&:hover': {
          color: style?.backgroundColor ?? COLOR.NAVY.MAIN,
          backgroundColor: COLOR.BLACK.MAIN,
        },
      }
    : {
        borderColor: style?.backgroundColor ?? COLOR.BLUE.MAIN,
        '&:hover': {
          color: style?.backgroundColor ?? COLOR.BLUE.MAIN,
          backgroundColor: COLOR.WHITE.MAIN,
        },
      };
