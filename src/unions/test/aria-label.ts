import ValueOf from 'utils/type-util/ValueOf';

/**
 * 要素のラベル名の型。
 */
export type AriaLabel = ValueOf<typeof ARIA_LABEL>;

/**
 * 要素のラベル名。
 */
export const ARIA_LABEL = {
  HOME: 'home-page',
  ANALYTICS: 'analytics-page',
  WORD_CLOUD: 'word-cloud-page',
  GARBAGE: 'garbage',
  HEADER: 'header',
  SIDEBAR: 'sidebar',
  SIDEBAR_ITEM: 'sidebar-item',
  ICON: 'icon',
  CONTAIN_BUTTON: 'contained-button',
  OUTLINED_BUTTON: 'outlined-button',
  ICON_BUTTON: 'icon-button',
  INPUT_TEXT: 'input-text',
  INPUT_TEXTAREA: 'input-textarea',
  LIST_ITEM_LINK: 'list-item-link',
} as const;
