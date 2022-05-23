export type SupOptions = Record<
  string,
  {
    /**
     * [attr, value]数组，如['class':'badge tip']
     */
    attr: [string, string][];
    /**
     * truthy时，替换原sup内text
     */
    text?: string;
  }
>;
