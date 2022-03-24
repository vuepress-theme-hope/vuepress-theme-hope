import { path } from "@vuepress/utils";
import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const commentTheme: Theme<DefaultThemeOptions> = {
  name: "comment-theme",

  // we are extending @vuepress/theme-default
  extends: "@vuepress/theme-default",

  // we overide the default layout to provide comment service
  layouts: path.resolve(__dirname, "./layouts"),

  plugins: [
    [
      "comment2",
      {
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
        author: "Mr.Hope",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },
    ],
  ],
};

export default commentTheme;
