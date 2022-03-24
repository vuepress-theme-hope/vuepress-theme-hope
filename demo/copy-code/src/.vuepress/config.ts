import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/",

  title: "Copy Code",
  description: "Copy code button for VuePress2",

  themeConfig: {
    logo: "/logo.svg",
  },

  plugins: ["copy-code2"],
});
