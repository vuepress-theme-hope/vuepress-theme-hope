import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Sitemap",

  description: "VuePress2 Sitemap Plugin",

  themeConfig: {
    logo: "/logo.svg",
  },

  plugins: [["sitemap2", { hostname: "https://exapmle.com" }]],
});
