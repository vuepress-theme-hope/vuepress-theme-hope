export type LocaleDataToOption<LocaleData> = {
  [Key in keyof LocaleData]?: Partial<LocaleData[Key]>;
};
