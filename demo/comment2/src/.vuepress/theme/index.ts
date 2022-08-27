import { defaultTheme } from "@vuepress/theme-default";
import { getDirname, path } from "@vuepress/utils";

import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const __dirname = getDirname(import.meta.url);

export const commentTheme = (options: DefaultThemeOptions): Theme => ({
  name: "comment-theme",

  // we are extending @vuepress/theme-default
  extends: defaultTheme(options),

  layouts: {
    // we override the default layout to provide comment service
    Layout: path.resolve(__dirname, "layouts", "Layout.vue"),
  },
});
