import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/",

  lang: "zh-CN",
  title: "PWA Plugin",
  description: "PWA Plugin for VuePress2",

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/pwa2/",
  },

  plugins: ["pwa2"],
});
