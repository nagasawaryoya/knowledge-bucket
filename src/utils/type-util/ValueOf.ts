export type ValueOf<T> = T[keyof T];

export type DeepValueOf<T extends Readonly<T>> = T extends { [k: string | number]: T[keyof T] }
  ? DeepValueOf<ValueOf<T>>
  : T;
