import React, { FC, ChangeEventHandler, KeyboardEventHandler } from 'react';
import MuiTextarea, { TextareaAutosizeProps as MuiTextareaProps } from '@material-ui/core/TextareaAutosize';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { BORDER, CommonStyles } from 'unions/ui-theme/style';
import { PERCENT } from 'unions/ui-theme/unit';
import { COLOR } from 'unions/ui-theme/color';
import { ARIA_LABEL } from 'unions/test/aria-label';

type InputTextareaStyles = Pick<React.CSSProperties, 'width' | 'height'> & {
  borderWidth?: CommonStyles.BorderWidth;
  borderRadius?: CommonStyles.BorderRadius;
};

type InputTextareaProps = {
  input?: MuiTextareaProps;
  style?: InputTextareaStyles;
  onChange?: ChangeEventHandler;
  onKeyDown?: KeyboardEventHandler;
};

export const InputTextarea: FC<InputTextareaProps> = ({ input, style, onChange, onKeyDown }) => {
  const classes = useStyles(style);
  return (
    <MuiTextarea
      aria-label={ARIA_LABEL.INPUT_TEXTAREA}
      className={classes.root}
      {...input}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

/**
 * スタイルを適用する。
 *
 * @param style スタイル値
 * @returns cssプロパティ
 */
const useStyles = (style?: InputTextareaStyles): ClassNameMap<'root'> => {
  const currentTheme = useTheme();

  return makeStyles({
    root: {
      padding: 20,
      fontSize: 14,
      lineHeight: 1.7,
      borderColor: COLOR.GREY.MAIN,
      width: style?.width ?? PERCENT(100),
      height: style?.height ?? PERCENT(100),
      borderWidth: style?.borderWidth ?? BORDER.WIDTH.S,
      borderRadius: style?.borderRadius ?? BORDER.RADIUS.S,
      ...styling(currentTheme),
    },
  })();
};

/**
 * テーマに応じたスタイルを返却する。
 *
 * @param theme 現在のテーマ
 * @returns css プロパティ
 */
const styling = (theme: Theme) =>
  theme.palette.type === THEME_TYPE.DARK
    ? {
        color: COLOR.GREY.LIGHT,
        backgroundColor: COLOR.BLACK.MAIN,
        '&:focus': {
          outline: 'none',
          borderColor: COLOR.NAVY.MAIN,
        },
      }
    : {
        color: COLOR.BLACK.DARK,
        backgroundColor: COLOR.WHITE.MAIN,
        '&:focus': {
          outline: 'none',
          borderColor: COLOR.BLUE.MAIN,
        },
      };
