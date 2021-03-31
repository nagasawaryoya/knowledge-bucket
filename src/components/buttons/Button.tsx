import React, { FC } from 'react';
import MuiButton from '@material-ui/core/Button';
import { ButtonProps as MuiButtonProps } from '@material-ui/core';

export type ButtonProps = MuiButtonProps & {
  label: string;
  button?: MuiButtonProps;
};

/**
 * ボタンコンポーネント。
 */
export const Button: FC<ButtonProps> = ({ label, button }) => <MuiButton {...button}>{label}</MuiButton>;
