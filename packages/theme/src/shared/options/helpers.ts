export type LocaleDataToOption<T> = {
  [P in keyof T]?: Partial<T[P]>;
};
