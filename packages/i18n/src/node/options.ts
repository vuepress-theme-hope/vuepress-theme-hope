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
}
