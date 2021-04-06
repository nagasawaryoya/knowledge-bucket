import ValueOf from 'utils/type-util/ValueOf';

/**
 * フォーム部品の種類を指定するtype属性の型。
 */
export type InputType = ValueOf<typeof INPUT_TYPE>;

/**
 * フォーム部品の種類を指定するtype属性。
 */
export const INPUT_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  SEARCH: 'search',
} as const;
