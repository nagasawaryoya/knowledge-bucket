import React, { FC } from 'react';
import { TextField, TextFieldProps, makeStyles, Box } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Controller } from 'react-hook-form';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { CommonStyles } from 'unions/ui-theme/style';
import { PERCENT } from 'unions/ui-theme/unit';
import { COLOR } from 'unions/ui-theme/color';
import AsController from 'utils/type-util/as-controller';

type BaseTextBoxProps = {
  style?: TextBoxStyles;
} & Omit<TextFieldProps, 'required' | 'style'>;

type TextBoxStyles = Omit<React.CSSProperties, 'color' | 'width' | 'height'> & {
  width?: CommonStyles.InputWidth;
  height?: CommonStyles.InputWidth;
};
export type TextBoxProps = AsController<BaseTextBoxProps>;

const TextBox: FC<TextBoxProps> = ({ name, control, rules, style, ...props }) => {
  const classes = useStyles(style);

  return (
    <Controller
      defaultValue={props.defaultValue ?? ''}
      name={name}
      control={control}
      rules={rules}
      render={(arg) => (
        <Box className={classes.root}>
          <TextField
            {...props}
            {...arg.field}
            aria-label={ARIA_LABEL.TEXT_BOX}
            className={classes.field}
            required={Boolean(rules?.required)}
            variant={props.variant ?? 'outlined'}
            autoComplete={props.autoComplete ?? 'off'}
            inputProps={{ className: classes.input }}
          />
          {!props.error && <Box width={PERCENT(100)} height={22}></Box>}
        </Box>
      )}
    />
  );
};

/**
 * スタイルを適用する。
 *
 * @param style スタイル値
 * @returns cssプロパティ
 */
const useStyles = (style?: TextBoxStyles): ClassNameMap<'root' | 'field' | 'input'> =>
  makeStyles({
    root: {
      width: style?.width ?? PERCENT(100),
      height: style?.height ?? PERCENT(100),
      border: 'none',
      padding: 0,
    },
    field: {
      width: PERCENT(100),
      height: PERCENT(100),
    },
    input: {
      width: PERCENT(100),
      height: PERCENT(100),
      borderColor: COLOR.GREY.MAIN,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      padding: 6,
    },
  })();

export default TextBox;
