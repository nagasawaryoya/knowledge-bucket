import React, { FC, ChangeEvent, useState } from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { INPUT, BORDER, CommonStyles } from 'unions/ui-theme/style';
import { COLOR } from 'unions/ui-theme/color';
import Validator, { ValidateProps } from 'utils/application-util/validator';
import ValidateError from 'utils/application-util/validator';
import { VALIDATE_TYPE } from 'unions/validate-type';

type InputState = {
  error: ValidateError | null;
  value: string | number;
};

type InputStyles = Omit<React.CSSProperties, 'color' | 'backgroundColor' | 'borderColor'> & {
  width?: CommonStyles.ButtonWidth;
  height?: CommonStyles.ButtonHeight;
  borderRadius?: CommonStyles.BorderRadius;
  borderWidth?: CommonStyles.BorderWidth;
};

type InputTextProps = {
  input?: Omit<MuiTextFieldProps, 'type' | 'required' | 'error' | 'helperText'>;
  style?: InputStyles;
  validate?: Omit<ValidateProps, 'value'>;
  // eslint-disable-next-line no-unused-vars
  onChangeValue?: (value: string | number) => unknown;
};

/**
 * 入力テキストコンポーネント。
 */
export const InputText: FC<InputTextProps> = ({ input, style, validate, onChangeValue }) => {
  const classes = useStyles(style);

  const [inputState, setInputState] = useState<InputState>({
    error: null,
    value: '',
  });

  // 入力値変更イベント
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const valid = Validator.validate({ value: e.target.value, ...validate });
    const value = valid === null && validate?.type === VALIDATE_TYPE.NUMBER ? Number(e.target.value) : e.target.value;
    if (onChangeValue) {
      // 親コンポーネントに入力値を返却する。
      onChangeValue(value);
    }

    setInputState({
      error: valid,
      value: value,
    });
  };

  return (
    <MuiTextField
      className={classes.root}
      type="text"
      error={Boolean(inputState.error)}
      helperText={inputState.error?.message}
      value={inputState.value}
      {...input}
      onChange={onChangeHandler}
      inputProps={{ className: classes.input }}
    ></MuiTextField>
  );
};

/**
 * スタイルを適用する。
 *
 * @param {InputStyles} style スタイル値
 * @returns {ClassNameMap<"root" | "input">} cssプロパティ
 */
const useStyles = (style?: InputStyles): ClassNameMap<'root' | 'input'> =>
  makeStyles(() =>
    createStyles({
      root: {
        width: style?.width ?? INPUT.WIDTH.M,
        height: style?.height ?? INPUT.HEIGHT.M,
        border: 'none',
        padding: 0,
      },
      input: {
        width: style?.width ?? INPUT.WIDTH.M,
        height: style?.height ?? INPUT.HEIGHT.M,
        borderColor: COLOR.GREY.MAIN,
        borderWidth: style?.borderWidth ?? BORDER.WIDTH.S,
        borderRadius: style?.borderRadius ?? BORDER.RADIUS.S,
        borderStyle: 'solid',
        boxSizing: 'border-box',
        padding: 6,
      },
    }),
  )();
