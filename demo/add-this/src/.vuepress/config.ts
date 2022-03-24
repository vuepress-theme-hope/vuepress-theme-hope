import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const VuePress_BASE = process.env.VuePress_BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: VuePress_BASE || "/",
  title: "Add this",
  description: "Add this plugin for VuePress2",

  themeConfig: {
    logo: "/logo.svg",
  },

  plugins: [["add-this", { pubid: "ra-601bf7e7c332daca" }]],
});
