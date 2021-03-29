import React, { FC } from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core';
import { Icon, IconProps } from 'components/Icon';

/**
 * アイコンボタンコンポーネント。
 */
export type IconButtonProps = {
  icon: IconProps;
  button?: Omit<MuiIconButtonProps, 'children'>;
};
export const IconButton: FC<IconButtonProps> = ({ icon, button }) => (
  <MuiIconButton {...button} children={<Icon {...icon} />} />
);
