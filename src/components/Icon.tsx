import React from 'react';
import MuiIcon from '@material-ui/core/Icon';
import { IconProps as MuiIconProps } from '@material-ui/core';
import { IconName } from 'unions/icon-name';

export type IconProps = MuiIconProps & {
  name: IconName;
};

/**
 * アイコンコンポーネント。
 */
export const Icon: React.FC<IconProps> = ({ name, ...props }) => <MuiIcon {...props}>{name}</MuiIcon>;
