import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Sitemap",

  description: "VuePress2 Sitemap Plugin",

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/sitemap2/",
  },

  plugins: [
    [
      "sitemap2",
      {
        hostname: "https://vuepress-theme-hope.github.io",
      },
    ],
  ],
});
