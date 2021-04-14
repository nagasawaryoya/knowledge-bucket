import ValueOf from 'utils/type-util/ValueOf';

/**
 * ルーティングのパスの型。
 */
export type RouterPath = ValueOf<typeof ROUTER_PATH>;

/**
 * ルーティングのパス。
 */
export const ROUTER_PATH = {
  BASE: '/',
  ANALYTICS: '/analytics',
} as const;
