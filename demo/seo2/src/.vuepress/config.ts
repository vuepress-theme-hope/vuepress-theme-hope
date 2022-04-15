import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Seo",

  description: "VuePress Seo",

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/seo2/",

    navbar: ["/", "/demo"],
  },

  plugins: [
    [
      "seo2",
      {
        hostname: "https://vuepress-theme-hope.github.io",
      },
    ],
  ],
});
