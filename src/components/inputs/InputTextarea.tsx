import React, { FC } from 'react';
import MuiTextarea, { TextareaAutosizeProps as MuiTextareaProps } from '@material-ui/core/TextareaAutosize';
import { ARIA_LABEL } from 'unions/test/aria-label';

type InputTextareaProps = {
  input?: MuiTextareaProps;
};

export const InputTextarea: FC<InputTextareaProps> = ({ input }) => {
  return <MuiTextarea aria-label={ARIA_LABEL.INPUT_TEXTAREA} {...input} />;
};
