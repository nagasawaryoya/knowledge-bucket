import ValueOf from "utils/type-util/ValueOf";

/**
 * アプリケーションのテーマカラーの型。
 */
export type ThemeType = ValueOf<typeof THEME_TYPE>;

/**
 * アプリケーションのテーマカラー。
 */
export const THEME_TYPE = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;
