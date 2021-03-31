import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles';
import { COLOR } from 'unions/ui-theme/color';
import { COLOR_CODE } from 'unions/ui-theme/color-code';
import { THEME_TYPE, ThemeType } from 'unions/ui-theme/theme-type';
import { BORDER, FONT, INPUT, ICON } from 'unions/ui-theme/style';

/**
 * テーマを作成する。
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
    palette: { ...COMMON_PALETTE.palette, ...specificTheme.palette },
    props: { ...COMMON_PROPS.props, ...specificTheme.props },
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
    MuiTextField: {
      variant: 'outlined',
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
    MuiButtonBase: {
      disableRipple: true,
    },
  },
};

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
 * ライトテーマ固有の設定。
 */
const LIGHT_THEME: ThemeOptions = {
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
  },
  props: {
    MuiButton: {
      variant: 'contained',
      disableElevation: true,
      color: COLOR_CODE.PRIMARY,
      style: {
        width: INPUT.M.WIDTH,
        height: INPUT.M.HEIGHT,
        borderRadius: BORDER.RADIUS.S,
        border: BORDER.LIGHT,
      },
    },
    MuiIconButton: {
      style: {
        color: COLOR.GREY.main,
        width: ICON.M,
        height: ICON.M,
        borderRadius: BORDER.RADIUS.C,
        border: BORDER.L_BASE,
      },
    },
  },
} as const;

/**
 * ダークテーマ固有の設定。
 */
const DARK_THEME: ThemeOptions = {
  palette: {
    primary: {
      light: COLOR.NAVY.light,
      main: COLOR.NAVY.main,
      dark: COLOR.NAVY.dark,
      contrastText: COLOR.GREY.light,
    },
    background: {
      default: COLOR.BLACK.main,
      paper: COLOR.BLACK.main,
    },
    text: {
      primary: COLOR.GREY.light,
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      disableElevation: true,
      color: COLOR_CODE.PRIMARY,
      style: {
        width: INPUT.M.WIDTH,
        height: INPUT.M.HEIGHT,
        borderRadius: BORDER.RADIUS.S,
        border: BORDER.DARK,
      },
    },
    MuiIconButton: {
      style: {
        color: COLOR.GREY.main,
        width: ICON.M,
        height: ICON.M,
        borderRadius: BORDER.RADIUS.C,
        border: BORDER.D_BASE,
      },
    },
  },
} as const;
