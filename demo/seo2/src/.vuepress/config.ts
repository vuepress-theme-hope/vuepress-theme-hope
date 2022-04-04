import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Seo",

  description: "VuePress Seo",

  themeConfig: {
    navbar: ["/", "/demo"],
    logo: "/logo.svg",
  },

  plugins: [["seo2", { hostname: "https://example.com" }]],
});
