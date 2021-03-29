import React, { FC } from 'react';
import MuiButton from '@material-ui/core/Button';
import { ButtonProps as MuiButtonProps} from '@material-ui/core';

/**
 * ボタンコンポーネント。
 */
export type ButtonProps = MuiButtonProps & {
  label: string
};
export const Button: FC<ButtonProps> = ({ label, ...props }) => (
  <MuiButton {...props}>{label}</MuiButton>
);
