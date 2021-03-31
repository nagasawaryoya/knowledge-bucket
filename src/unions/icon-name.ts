import ValueOf from 'utils/type-util/ValueOf';

/**
 * マテリアルUIアイコン名の型。
 */
export type IconName = ValueOf<typeof ICON_NAME>;

/**
 * マテリアルUIアイコン名。
 */
export const ICON_NAME = {
  ADD: 'add',
  DELETE: 'delete',
} as const;
