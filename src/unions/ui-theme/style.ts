import ValueOf from 'utils/type-util/ValueOf';

export namespace CommonStyles {
  export type BorderRadius = ValueOf<typeof BORDER.RADIUS>;
  export type FontSize = ValueOf<typeof FONT.SIZE>;
  export type IconSize = ValueOf<typeof ICON>;
  export type ButtonWidth = ValueOf<typeof BUTTON.WIDTH>;
  export type ButtonHeight = ValueOf<typeof BUTTON.HEIGHT>;
  export type InputWidth = ValueOf<typeof INPUT.WIDTH>;
  export type InputHeight = ValueOf<typeof INPUT.HEIGHT>;
}

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

export const FONT = {
  SIZE: {
    S: 10,
    M: 14,
    L: 20,
    XL: 30,
  },
} as const;

export const ICON = {
  M: 28,
} as const;

export const BUTTON = {
  HEIGHT: {
    M: 28,
    L: 280,
  },
  WIDTH: {
    M: 110,
    L: 280,
  },
} as const;

export const INPUT = {
  HEIGHT: {
    M: 28,
  },
  WIDTH: {
    M: 214,
  },
} as const;
