import React, { FC } from 'react';
import MuiInputBase from '@material-ui/core/InputBase';
import { InputBaseProps as MuiInputBaseProps } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { INPUT, BORDER, CommonStyles } from 'unions/ui-theme/style';
import { COLOR } from 'unions/ui-theme/color';

type InputStyles = Omit<React.CSSProperties, 'color' | 'backgroundColor' | 'borderColor'> & {
  width?: CommonStyles.ButtonWidth;
  height?: CommonStyles.ButtonHeight;
  borderRadius?: CommonStyles.BorderRadius;
  borderWidth?: CommonStyles.BorderWidth;
};

export type InputTextProps = {
  input?: Omit<MuiInputBaseProps, 'type'>;
  style?: InputStyles;
};

/**
 * 入力テキストコンポーネント。
 */
export const InputText: FC<InputTextProps> = ({ input, style }) => {
  const classes = useStyles(style);
  return <MuiInputBase className={classes.root} type="text" {...input}></MuiInputBase>;
};

/**
 * スタイルを適用する。
 */
const useStyles = (style?: InputStyles) =>
  makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: style?.width ?? INPUT.WIDTH.M,
        height: style?.height ?? INPUT.HEIGHT.M,
        borderColor: COLOR.GREY.MAIN,
        borderWidth: style?.borderWidth ?? BORDER.WIDTH.S,
        borderRadius: style?.borderRadius ?? BORDER.RADIUS.S,
        borderStyle: 'solid',
      },
    }),
  )();
