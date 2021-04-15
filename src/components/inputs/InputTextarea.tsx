import React, { FC } from 'react';
import MuiTextarea, { TextareaAutosizeProps as MuiTextareaProps } from '@material-ui/core/TextareaAutosize';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { BORDER, CommonStyles } from 'unions/ui-theme/style';
import { COLOR } from 'unions/ui-theme/color';
import { ARIA_LABEL } from 'unions/test/aria-label';

type InputTextareaStyles = {
  borderWidth?: CommonStyles.BorderWidth;
  borderRadius?: CommonStyles.BorderRadius;
};

type InputTextareaProps = {
  input?: MuiTextareaProps;
  style?: InputTextareaStyles;
};

export const InputTextarea: FC<InputTextareaProps> = ({ input, style }) => {
  const classes = useStyles(style);
  return <MuiTextarea aria-label={ARIA_LABEL.INPUT_TEXTAREA} className={classes.root} {...input} />;
};

/**
 * スタイルを適用する。
 *
 * @param {InputTextareaStyles} style スタイル値
 * @returns {ClassNameMap<"root">} cssプロパティ
 */
const useStyles = (style?: InputTextareaStyles): ClassNameMap<'root'> => {
  const currenTheme = useTheme();

  return makeStyles(() =>
    createStyles({
      root: {
        padding: 10,
        borderColor: COLOR.GREY.MAIN,
        borderWidth: style?.borderWidth ?? BORDER.WIDTH.S,
        borderRadius: style?.borderRadius ?? BORDER.RADIUS.S,
        ...styling(currenTheme),
      },
    }),
  )();
};

/**
 * テーマに応じたスタイルを返却する。
 *
 * @param {Theme} theme 現在のテーマ
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
