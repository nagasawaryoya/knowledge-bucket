import ValueOf from "utils/type-util/ValueOf";

/**
 * react material ui での色指定時のコードの型。
 */
export type ColorCode = ValueOf<typeof COLOR_CODE>;

/**
 * react material ui での色指定時のコード。
 */
export const COLOR_CODE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
} as const;