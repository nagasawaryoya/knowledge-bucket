import React, { FC } from 'react';
import MuiInputBase from '@material-ui/core/InputBase';
import { InputBaseProps as MuiInputBaseProps } from '@material-ui/core';

export type InputTextProps = {
  props?: Omit<MuiInputBaseProps, 'type'>;
};

/**
 * 入力テキストコンポーネント。
 */
export const InputText: FC<InputTextProps> = ({ props }) => <MuiInputBase type="text" {...props}></MuiInputBase>;
