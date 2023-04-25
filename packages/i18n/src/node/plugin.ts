import { type Plugin } from "@vuepress/core";

import { type I18nOptions } from "./options.js";

export const i18nPlugin =
  (_options: I18nOptions = {}): Plugin =>
  (_app: App) => {
    // TODO:

    return {
      name: "vuepress-plugin-i18n",
    };
  };
