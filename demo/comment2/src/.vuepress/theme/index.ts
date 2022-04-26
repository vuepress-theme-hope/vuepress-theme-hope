import { defaultTheme } from "@vuepress/theme-default";
import { path } from "@vuepress/utils";
import { commentPlugin } from "vuepress-plugin-comment2";

import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export const commentTheme = (options: DefaultThemeOptions): Theme => ({
  name: "comment-theme",

  // we are extending @vuepress/theme-default
  extends: defaultTheme(options),

  layouts: {
    // we overide the default layout to provide comment service
    Layout: path.resolve(__dirname, "layouts", "Layout.vue"),
  },

  plugins: [
    commentPlugin({
      /**
       * Using giscus
       */
      // type: "giscus",
      // repo: "vuepress-theme-hope/giscus-discussions",
      // repoId: "R_kgDOG_Pt2A",
      // category: "Announcements",
      // categoryId: "DIC_kwDOG_Pt2M4COD69",

      /**
       * Using twikoo
       */
      // type: "twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    }),
  ],
});
