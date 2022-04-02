import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",
  title: "Add this",
  description: "Add this plugin for VuePress2",

  themeConfig: {
    logo: "/logo.svg",
  },

  plugins: [["add-this", { pubid: "ra-601bf7e7c332daca" }]],
});
