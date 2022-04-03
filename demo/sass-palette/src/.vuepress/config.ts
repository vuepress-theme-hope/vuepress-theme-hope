import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Palatte",
  description: "VuePress Palatte",

  themeConfig: {
    logo: "/logo.svg",
  },

  plugins: [["sass-palette", { id: "test" }]],
});
