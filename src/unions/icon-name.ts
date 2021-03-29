import { ValueOf } from "../utils/type-util/ValueOf";

/**
 * マテリアルUIアイコン名。
 */
export type IconName = ValueOf<typeof ICON_NAME>;

/**
 * マテリアルUIアイコン名のUNION。
 */
export const ICON_NAME = {
  ADD: 'add',
  DELETE: 'delete'
} as const;
