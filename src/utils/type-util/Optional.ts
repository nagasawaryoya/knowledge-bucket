export type UndefinedOptional<T> = {
  [P in keyof T]?: T[P];
};

export type NullOptional<T> = {
  [P in keyof T]: T[P] | null;
};
