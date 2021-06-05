import { path } from "@vuepress/utils";
import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const commentTheme: Theme<DefaultThemeOptions> = {
  name: "comment-theme",

  layouts: path.resolve(__dirname, "./layouts"),

  extends: "@vuepress/theme-default",

  plugins: [
    [
      "@mr-hope/comment",
      {
        type: "waline",
        author: "Mr.Hope",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },
    ],
  ],
};

export default commentTheme;
