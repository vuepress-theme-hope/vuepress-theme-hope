import { type Page } from "@vuepress/core";

export interface I18nOptions {
  // TODO:

  /**
   * Filter pages which needs to be handled
   *
   * @param page VuePress page object
   * @returns Whether the page should be included
   */
  filter?: (page: Page) => boolean;

  /**
   * Location to inject tip component
   *
   * @default 'manual'
   */
  tipLocation?: "top" | "bottom" | "after-h1" | "manual";

  /**
   * I18n tip component
   *
   * @default "I18nTip"
   */
  tipComponent?: string;
}
