import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Copy Code",
  description: "Copy code button for VuePress2",

  themeConfig: {
    logo: "/logo.svg",
  },

  plugins: ["copy-code2"],
});
