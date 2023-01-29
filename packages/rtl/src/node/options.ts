export interface RTLOptions {
  /**
   * RTL locales
   *
   * @default ['/']
   */
  locales?: string[];

  /**
   * RTL selector
   *
   * @default { 'html': { dir: 'rtl' } }
   */
  selector?: {
    [element: string]: {
      [attr: string]: string;
    };
  };
}
