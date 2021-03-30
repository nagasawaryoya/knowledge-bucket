import ValueOf from "utils/type-util/ValueOf";

/**
 * アプリケーションのテーマカラーの型。
 */
// TODO もっといい型定義があるはず
export type Color = ValueOf<typeof COLOR.NAVY>
  | ValueOf<typeof COLOR.BLUE>
  | ValueOf<typeof COLOR.RED>
  | ValueOf<typeof COLOR.GREEN>
  | ValueOf<typeof COLOR.YELLOW>
  | ValueOf<typeof COLOR.GREY>
  | ValueOf<typeof COLOR.ORANGE>
  | ValueOf<typeof COLOR.WATER>
  | ValueOf<typeof COLOR.BLACK>
  | ValueOf<typeof COLOR.WHITE>
  | ValueOf<typeof COLOR.BLACK>
;

/**
 * アプリケーションで使用するカラー。
 */
export const COLOR = {
  NAVY: {
    light: '#a0bdff',
    main: '#5877ac',
    dark: '#3c3f50',
  },
  BLUE: {
    light: '#76a7db',
    main: '#5487c0',
    dark: '#43658a',
  },
  RED: {
    main: '#df6b6e',
    dark: '#d85f62',
  },
  GREEN: {
    main: '#61b6a3',
    dark: '#4b8477',
  },
  YELLOW: {
    main: '#d4d49b',
    dark: '#8a8b69',
  },
  ORANGE: {
    main: '#bc8d77',
    dark: '#9b7664',
  },
  WATER: {
    main: '#67c3e5',
    dark: '#5697b1',
  },
  GREY: {
    light: '#dadada',
    main: '#a8a8a8',
    dark: '#4d5156',
    border: '#737373',
  },
  BLACK: {
    main: '#333333',
    dark: '#2f2f2f',
  },
  WHITE: {
    main: '#ffffff',
  },
} as const;
