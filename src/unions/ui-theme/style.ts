import { ValueOf } from 'utils/type-util/ValueOf';

type MathNotation = '+' | '-';

type Pixel = ReturnType<typeof PX>;
type Percent = ReturnType<typeof PERCENT>;
type Calc = ReturnType<typeof CALC>;

type WidthString<T> = T | Percent | Calc;

/**
 * アプリケーション内で統一されているスタイルの型。
 */
export namespace CommonStyles {
  export type BorderRadius = ValueOf<typeof BORDER.RADIUS>;
  export type BorderWidth = ValueOf<typeof BORDER.WIDTH>;
  export type FontSize = ValueOf<typeof FONT.SIZE>;
  export type IconSize = ValueOf<typeof ICON>;
  export type ButtonWidth = WidthString<ValueOf<typeof BUTTON.WIDTH>>;
  export type ButtonHeight = WidthString<ValueOf<typeof BUTTON.HEIGHT>>;
  export type InputWidth = WidthString<ValueOf<typeof INPUT.WIDTH>>;
  export type InputHeight = WidthString<ValueOf<typeof INPUT.HEIGHT>>;
}

/**
 * アプリケーション内で「%」指定する。
 */
export const PERCENT = (number: number) => `${number}%` as const;
/**
 * アプリケーション内で「px」指定する。
 */
export const PX = (number: number) => `${number}px` as const;
/**
 * アプリケーション内で「calc」指定する際。
 */
export const CALC = (left: Percent, code: MathNotation, right: Percent | Pixel) =>
  `calc(${left} ${code} ${right})` as const;

/**
 * アプリケーション内で統一されている枠線のスタイル。
 */
export const BORDER = {
  RADIUS: {
    S: 4,
    C: 100,
  },
  WIDTH: {
    S: 1,
    M: 2,
    L: 3,
  },
} as const;

/**
 * アプリケーション内で統一されている文字のスタイル。
 */
export const FONT = {
  SIZE: {
    S: 10,
    M: 14,
    L: 20,
    XL: 30,
  },
} as const;

/**
 * アプリケーション内で統一されているアイコンのスタイル。
 */
export const ICON = {
  M: 28,
  L: 38,
} as const;

/**
 * アプリケーション内で統一されているボタンのスタイル。
 */
export const BUTTON = {
  HEIGHT: {
    M: 28,
    L: 36,
  },
  WIDTH: {
    M: 110,
    L: 160,
  },
} as const;

/**
 * アプリケーション内で統一されているインプットエリアのスタイル。
 */
export const INPUT = {
  HEIGHT: {
    M: 28,
  },
  WIDTH: {
    M: 240,
  },
} as const;

/**
 * アプリケーション内で統一されているヘッダーのスタイル。
 */
export const HEADER = {
  HEIGHT: 42,
} as const;

/**
 * アプリケーション内で統一されているサイドバーのスタイル。
 */
export const SIDEBAR = {
  WIDTH: 160,
} as const;

/**
 * アプリケーション内で統一されているブレークポイント。
 */
export const BREAKPOINT = {
  BASE: 'sm',
} as const;
