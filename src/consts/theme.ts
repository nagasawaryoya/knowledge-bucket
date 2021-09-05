import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles';
import { COLOR } from 'unions/ui-theme/color';
import { COLOR_CODE } from 'unions/ui-theme/color-code';
import { THEME_TYPE, ThemeType } from 'unions/ui-theme/theme-type';
import { FONT } from 'unions/ui-theme/style';

/**
 * テーマを作成する。
 *
 * @param {ThemeType} theme 現在のテーマタイプ
 * @returns {ClassNameMap<"root" | "input">} 現在のテーマタイプに応じたテーマ
 */
export const createTheme = (theme: ThemeType): Theme => {
  let specificTheme: ThemeOptions = {};
  switch (theme) {
    case THEME_TYPE.LIGHT:
      specificTheme = LIGHT_THEME;
      break;
    case THEME_TYPE.DARK:
      specificTheme = DARK_THEME;
      break;
    default:
      specificTheme = DARK_THEME;
      break;
  }
  return createMuiTheme({
    ...COMMON_THEME,
    ...COMMON_PROPS,
    palette: { ...COMMON_PALETTE.palette, ...specificTheme.palette },
  });
};

/**
 * 共通テーマ。
 */
const COMMON_THEME: ThemeOptions = {
  typography: {
    fontSize: FONT.SIZE.M,
    button: {
      textTransform: 'none',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 50,
    },
  },
} as const;

/**
 * 共通コンポーネント設定。
 */
const COMMON_PROPS: ThemeOptions = {
  props: {
    MuiButtonBase: {
      disableRipple: true,
      style: {
        fontWeight: 'bold',
      },
    },
    MuiButton: {
      color: COLOR_CODE.PRIMARY,
      disableElevation: true,
    },
    MuiIconButton: {
      color: COLOR_CODE.DEFAULT,
      disableFocusRipple: true,
    },
    MuiInputBase: {
      color: COLOR_CODE.PRIMARY,
    },
    MuiCheckbox: {
      color: COLOR_CODE.PRIMARY,
    },
    MuiRadio: {
      color: COLOR_CODE.PRIMARY,
    },
    MuiSwitch: {
      color: COLOR_CODE.PRIMARY,
    },
  },
};

/**
 * 共通テーマカラー。
 */
const COMMON_PALETTE: ThemeOptions = {
  palette: {
    error: {
      main: COLOR.RED.MAIN,
      dark: COLOR.RED.DARK,
    },
    warning: {
      main: COLOR.YELLOW.MAIN,
      dark: COLOR.YELLOW.DARK,
      contrastText: COLOR.WHITE.MAIN,
    },
    info: {
      main: COLOR.WATER.MAIN,
      dark: COLOR.WATER.DARK,
      contrastText: COLOR.WHITE.MAIN,
    },
    success: {
      main: COLOR.GREEN.MAIN,
      dark: COLOR.GREEN.DARK,
      contrastText: COLOR.WHITE.MAIN,
    },
    grey: {
      50: COLOR.GREY.MAIN,
    },
  },
} as const;

/**
 * ライトテーマ固有の設定。
 */
const LIGHT_THEME: ThemeOptions = {
  palette: {
    type: THEME_TYPE.LIGHT,
    primary: {
      light: COLOR.BLUE.LIGHT,
      main: COLOR.BLUE.MAIN,
      dark: COLOR.BLUE.DARK,
      contrastText: COLOR.WHITE.MAIN,
    },
    background: {
      default: COLOR.WHITE.MAIN,
      paper: COLOR.WHITE.MAIN,
    },
    text: {
      primary: COLOR.BLACK.DARK,
    },
  },
} as const;

/**
 * ダークテーマ固有の設定。
 */
const DARK_THEME: ThemeOptions = {
  palette: {
    type: THEME_TYPE.DARK,
    primary: {
      light: COLOR.NAVY.LIGHT,
      main: COLOR.NAVY.MAIN,
      dark: COLOR.NAVY.DARK,
      contrastText: COLOR.GREY.LIGHT,
    },
    background: {
      default: COLOR.BLACK.MAIN,
      paper: COLOR.BLACK.MAIN,
    },
    text: {
      primary: COLOR.GREY.LIGHT,
    },
  },
} as const;
