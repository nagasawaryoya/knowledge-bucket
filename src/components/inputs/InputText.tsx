import React, { FC, ChangeEventHandler } from 'react';
import MuiInputBase from '@material-ui/core/InputBase';
import { InputBaseProps as MuiInputBaseProps } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { INPUT, BORDER, CommonStyles } from 'unions/ui-theme/style';
import { COLOR } from 'unions/ui-theme/color';
import { INPUT_TYPE, InputType } from 'unions/input-type';

type InputStyles = Omit<React.CSSProperties, 'color' | 'backgroundColor' | 'borderColor'> & {
  width?: CommonStyles.ButtonWidth;
  height?: CommonStyles.ButtonHeight;
  borderRadius?: CommonStyles.BorderRadius;
  borderWidth?: CommonStyles.BorderWidth;
};

export type InputTextProps = {
  input?: Omit<MuiInputBaseProps, 'type'>;
  style?: InputStyles;
  type?: InputType;
  onChange?: ChangeEventHandler;
};

/**
 * 入力テキストコンポーネント。
 */
export const InputText: FC<InputTextProps> = ({ input, style, type = INPUT_TYPE.TEXT, onChange }) => {
  const classes = useStyles(style);
  return <MuiInputBase className={classes.root} type={type} {...input} onChange={onChange}></MuiInputBase>;
};

/**
 * スタイルを適用する。
 */
const useStyles = (style?: InputStyles) =>
  makeStyles(() =>
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
