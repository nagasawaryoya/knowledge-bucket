import React, { FC, MouseEventHandler } from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Icon, IconProps } from 'components/atoms/Icon';
import { COLOR, Color } from 'unions/ui-theme/color';
import { BORDER, ICON, CommonStyles } from 'unions/ui-theme/style';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';

type IconButtonStyles = React.CSSProperties & {
  color?: Color;
  backgroundColor?: Color;
  size?: CommonStyles.IconSize;
  borderColor?: Color;
  borderRadius?: CommonStyles.BorderRadius;
  borderWidth?: CommonStyles.BorderWidth;
  hoverColor?: Color | '';
};

type IconButtonProps = {
  icon: IconProps;
  style?: IconButtonStyles;
  onClick?: MouseEventHandler;
} & Omit<MuiIconButtonProps, 'children' | 'size'>;

/**
 * アイコンボタンコンポーネント。
 */
export const IconButton: FC<IconButtonProps> = ({ icon, style, onClick, ...props }) => {
  const classes = useStyles(style);
  return (
    <MuiIconButton
      {...props}
      aria-label="icon-button"
      className={classes.root}
      children={<Icon {...icon} className={classes.icon} />}
      onClick={onClick}
    />
  );
};

/**
 * スタイルを適用する。
 *
 * @param style スタイル値
 * @returns cssプロパティ
 */
const useStyles = (style?: IconButtonStyles): ClassNameMap<'root' | 'icon'> => {
  const { button, icon } = styling(useTheme(), style);

  return makeStyles({
    root: {
      width: style?.size ?? ICON.M,
      height: style?.size ?? ICON.M,
      backgroundColor: style?.backgroundColor,
      borderColor: style?.borderColor ?? COLOR.GREY.MAIN,
      borderWidth: style?.borderWidth ?? BORDER.WIDTH.M,
      borderRadius: style?.borderRadius ?? BORDER.RADIUS.C,
      borderStyle: style?.borderStyle ?? 'solid',
      ...button,
    },
    icon: {
      color: style?.color ?? COLOR.GREY.MAIN,
      ...icon,
    },
  })();
};

/**
 * テーマに応じたスタイルを返却する。
 *
 * @param theme 現在のテーマ
 * @param style cssプロパティ
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
