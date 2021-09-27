export type NullOptional<T> = {
  [P in keyof T]: T[P] | null;
};
