import ValueOf from 'utils/type-util/ValueOf';

/**
 * 検証タイプの型。
 */
export type ValidateType = ValueOf<typeof VALIDATE_TYPE>;

/**
 * 検証タイプ。
 */
export const VALIDATE_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  SEARCH: 'search',
} as const;
