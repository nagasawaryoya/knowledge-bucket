import { createMuiTheme, Theme, ThemeOptions } from "@material-ui/core/styles";
import { COLOR } from "unions/ui-theme/color";
import { COLOR_CODE } from "unions/ui-theme/color-code";
import { THEME_TYPE, ThemeType } from "unions/ui-theme/theme-type";

/**
 * テーマを作成する。
 */
export const createTheme = (theme: ThemeType): Theme => {
  let palette: ThemeOptions = {};
  switch (theme) {
    case THEME_TYPE.LIGHT:
      palette = LIGHT_PALETTE;
      break;
    case THEME_TYPE.DARK:
      palette = DARK_PALETTE;
      break;
    default:
      palette = DARK_PALETTE;
      break;
  }
  return createMuiTheme({
    ...COMMON_THEME,
    ...COMMON_PALETTE,
    ...palette
  });
}

/**
 * 共通テーマ。
 */
const COMMON_THEME: ThemeOptions = {
  typography: {
    fontSize: 14,
    button: {
      textTransform: "none"
    },
  },
  mixins: {
    toolbar: {
      minHeight: 50
    }
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiCheckbox: {
      color: COLOR_CODE.PRIMARY
    },
    MuiRadio: {
      color: COLOR_CODE.PRIMARY
    },
    MuiSwitch: {
      color: COLOR_CODE.PRIMARY
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      size: 'medium',
      variant: 'contained',
      disableElevation: true,
    },
  }
} as const;

/**
 * 共通テーマカラー。
 */
const COMMON_PALETTE: ThemeOptions = {
  palette: {
    error: {
      main: COLOR.RED.main,
      dark: COLOR.RED.dark,
    },
    warning: {
      main: COLOR.YELLOW.main,
      dark: COLOR.YELLOW.dark,
      contrastText: COLOR.WHITE.main,
    },
    info: {
      main: COLOR.WATER.main,
      dark: COLOR.WATER.dark,
      contrastText: COLOR.WHITE.main,
    },
    success: {
      main: COLOR.GREEN.main,
      dark: COLOR.GREEN.dark,
      contrastText: COLOR.WHITE.main,
    },
    grey: {
      50: COLOR.GREY.border,
    },
  },
} as const;

/**
 * ライトテーマカラー。
 */
const LIGHT_PALETTE: ThemeOptions = {
  palette: {
    primary: {
      light: COLOR.BLUE.light,
      main: COLOR.BLUE.main,
      dark: COLOR.BLUE.dark,
      contrastText: COLOR.WHITE.main,
    },
    background: {
      default: COLOR.WHITE.main,
      paper: COLOR.WHITE.main,
    },
    text: {
      primary: COLOR.BLACK.dark,
    },
  }
} as const;

/**
 * ダークテーマカラー。
 */
const DARK_PALETTE: ThemeOptions = {
  palette: {
    primary: {
      light: COLOR.NAVY.light,
      main: COLOR.NAVY.main,
      dark: COLOR.NAVY.dark,
      contrastText: COLOR.GREY.light
    },
    background: {
      default: COLOR.BLACK.main,
      paper: COLOR.BLACK.main,
    },
    text: {
      primary: COLOR.GREY.light,
    },
  }
} as const;

