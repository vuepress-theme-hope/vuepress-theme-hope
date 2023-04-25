import { type Plugin } from "@vuepress/core";

import { addI18nData } from "./extends.js";
import { type I18nOptions } from "./options.js";

export const i18nPlugin =
  (options: I18nOptions = {}): Plugin =>
  (app) => {
    const { filter = (): boolean => true } = options;

    return {
      name: "vuepress-plugin-i18n",

      extendsPage: (page): void => {
        if (filter(page)) addI18nData(app, page);
      },
    };
  };
