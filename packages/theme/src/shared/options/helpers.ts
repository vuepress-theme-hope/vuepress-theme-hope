export type LocaleData2Option<T> = {
  [P in keyof T]?: Partial<T[P]>;
};
