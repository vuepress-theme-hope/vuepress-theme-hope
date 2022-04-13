import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Redirect",

  description: "VuePress2 Redirect Plugin",

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/redirect2/",
  },

  plugins: [
    [
      "redirect2",
      {
        config: {
          "/homepage.html": "/",
        },
      },
    ],
  ],
});
