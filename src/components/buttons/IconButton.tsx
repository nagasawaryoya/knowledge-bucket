import React, { FC } from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core';
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

export type IconButtonProps = {
  icon: IconProps;
  button?: Omit<MuiIconButtonProps, 'children'>;
  style?: IconButtonStyles;
};

/**
 * アイコンボタンコンポーネント。
 */
export const IconButton: FC<IconButtonProps> = ({ icon, button, style }) => {
  const classes = useStyles(style);
  return <MuiIconButton {...button} className={classes.root} children={<Icon {...icon} className={classes.icon} />} />;
};

/**
 * スタイルを適用する。
 */
const useStyles = (style?: IconButtonStyles) => {
  const currenTheme = useTheme();

  return makeStyles((theme: Theme) =>
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
