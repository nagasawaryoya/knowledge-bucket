export type ValueOf<T> = T[keyof T];

export type DeepValueOf<T> = T extends object ? DeepValueOf<ValueOf<T>> : T;
