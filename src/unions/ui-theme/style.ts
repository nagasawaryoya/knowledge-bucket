import { COLOR } from './color';

export const BORDER = {
  D_BASE: `solid 2px ${COLOR.GREY.border}`,
  L_BASE: `solid 2px ${COLOR.GREY.light}`,
  DARK: `solid 2px ${COLOR.NAVY.main}`,
  LIGHT: `solid 2px ${COLOR.BLUE.main}`,
  RADIUS: {
    S: 4,
    C: 100,
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

export const INPUT = {
  M: {
    HEIGHT: 28,
    WIDTH: 92,
  },
} as const;

export const ICON = {
  M: 28,
} as const;
