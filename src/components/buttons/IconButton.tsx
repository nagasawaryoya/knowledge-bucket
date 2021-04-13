import React, { FC, MouseEventHandler } from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Icon, IconProps } from 'components/Icon';
import { COLOR, Color } from 'unions/ui-theme/color';
import { BORDER, ICON, CommonStyles } from 'unions/ui-theme/style';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';

type IconButtonStyles = React.CSSProperties & {
  color?: Color;
  backgroundColor?: Color;
  width?: CommonStyles.IconSize;
  height?: CommonStyles.IconSize;
  borderColor?: Color;
  borderRadius?: CommonStyles.BorderRadius;
  borderWidth?: CommonStyles.BorderWidth;
  hoverColor?: Color;
};

type IconButtonProps = {
  icon: IconProps;
  button?: Omit<MuiIconButtonProps, 'children'>;
  style?: IconButtonStyles;
  onClick?: MouseEventHandler;
};

/**
 * アイコンボタンコンポーネント。
 */
export const IconButton: FC<IconButtonProps> = ({ icon, button, style, onClick }) => {
  const classes = useStyles(style);
  return (
    <MuiIconButton
      aria-label="icon-button"
      className={classes.root}
      {...button}
      children={<Icon {...icon} className={classes.icon} />}
      onClick={onClick}
    />
  );
};

/**
 * スタイルを適用する。
 *
 * @param {InputStyles} style スタイル値
 * @returns {ClassNameMap<"root" | "icon">} cssプロパティ
 */
const useStyles = (style?: IconButtonStyles): ClassNameMap<'root' | 'icon'> => {
  const currenTheme = useTheme();

  return makeStyles(() =>
    createStyles({
      root: {
        width: style?.width ?? ICON.M,
        height: style?.height ?? ICON.M,
        backgroundColor: style?.backgroundColor,
        borderColor: style?.borderColor ?? COLOR.GREY.MAIN,
        borderWidth: style?.borderWidth ?? BORDER.WIDTH.M,
        borderRadius: style?.borderRadius ?? BORDER.RADIUS.C,
        borderStyle: style?.borderStyle ?? 'solid',
        ...styling(currenTheme, style).button,
      },
      icon: {
        color: style?.color ?? COLOR.GREY.MAIN,
        ...styling(currenTheme, style).icon,
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
const styling = (theme: Theme, style?: IconButtonStyles) => {
  return theme.palette.type === THEME_TYPE.DARK
    ? {
        button: {
          '&:hover': {
            border: 'none',
            backgroundColor: style?.hoverColor ?? COLOR.NAVY.MAIN,
          },
        },
      }
    : {
        button: {
          '&:hover': {
            border: 'none',
            backgroundColor: style?.hoverColor ?? COLOR.BLUE.MAIN,
          },
        },
        icon: {
          '&:hover': {
            color: COLOR.WHITE.MAIN,
          },
        },
      };
};
