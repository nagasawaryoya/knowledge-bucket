import { DeepValueOf } from 'utils/type-util/ValueOf';

/**
 * アプリケーションで使用する色の型。
 */
export type Color = DeepValueOf<typeof COLOR>;

/**
 * アプリケーションで使用する色。
 */
export const COLOR = {
  NAVY: {
    LIGHT: '#a0bdff',
    MAIN: '#5877ac',
    DARK: '#3c3f50',
  },
  BLUE: {
    LIGHT: '#76a7db',
    MAIN: '#5487c0',
    DARK: '#43658a',
  },
  RED: {
    MAIN: '#df6b6e',
    DARK: '#d85f62',
  },
  GREEN: {
    MAIN: '#61b6a3',
    DARK: '#4b8477',
  },
  YELLOW: {
    MAIN: '#d4d49b',
    DARK: '#8a8b69',
  },
  ORANGE: {
    MAIN: '#bc8d77',
    DARK: '#9b7664',
  },
  WATER: {
    MAIN: '#67c3e5',
    DARK: '#5697b1',
  },
  GREY: {
    LIGHT: '#dadada',
    MAIN: '#a8a8a8',
    DARK: '#737373',
  },
  BLACK: {
    MAIN: '#333333',
    DARK: '#2f2f2f',
  },
  WHITE: {
    MAIN: '#ffffff',
  },
} as const;
