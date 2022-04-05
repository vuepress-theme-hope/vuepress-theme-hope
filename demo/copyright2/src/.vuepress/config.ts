import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Copyright",
  description: "Append copyright infomation when copying",

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/copyright2/",

    navbar: ["/", "/demo", "/disable-copy", "/disable-select"],
  },

  plugins: [
    [
      "copyright2",
      {
        author: "Mr.Hope",
        license: "MIT",
        hostname: "https://vuepress-theme-hope.github.io",
        global: true,
      },
    ],
  ],
});
