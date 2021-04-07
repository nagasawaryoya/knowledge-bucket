import ValueOf from 'utils/type-util/ValueOf';

/**
 * アプリケーションで使用する色の型。
 */
// TODO もっといい型定義があるはず
export type Color =
  | ValueOf<typeof COLOR.NAVY>
  | ValueOf<typeof COLOR.BLUE>
  | ValueOf<typeof COLOR.RED>
  | ValueOf<typeof COLOR.GREEN>
  | ValueOf<typeof COLOR.YELLOW>
  | ValueOf<typeof COLOR.GREY>
  | ValueOf<typeof COLOR.ORANGE>
  | ValueOf<typeof COLOR.WATER>
  | ValueOf<typeof COLOR.BLACK>
  | ValueOf<typeof COLOR.WHITE>
  | ValueOf<typeof COLOR.BLACK>;

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
