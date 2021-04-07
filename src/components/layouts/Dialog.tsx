import React, { FC } from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogProps as MuiDialogProps } from '@material-ui/core';
import { ContainedButton } from 'components/buttons/ContainedButton';
import { OutlinedButton } from 'components/buttons/OutlinedButton';

type DialogProps = MuiDialogProps & {
  title: string;
  text?: string;
  footer?: boolean;
};

/**
 * ダイアログコンポーネント。
 */
export const Dialog: FC<DialogProps> = ({ title, text, footer = true, ...dialog }) => (
  <MuiDialog {...dialog}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{dialog.children ?? <DialogContentText>{text ?? ''}</DialogContentText>}</DialogContent>
    {footer && (
      <DialogActions>
        <OutlinedButton label="キャンセル" />
        <ContainedButton label="決定" />
      </DialogActions>
    )}
  </MuiDialog>
);
