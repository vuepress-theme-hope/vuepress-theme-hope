import { defineUserConfig } from "@vuepress/cli";
import { path } from "@vuepress/utils";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions>({
  base: process.env.VuePress_BASE || "/",

  title: "Comment Plugin",

  description: "Comment Plugin for VuePress",

  locales: {
    "/": { lang: "en-US" },
  },

  theme: path.resolve(__dirname, "./theme"),

  themeConfig: {
    logo: "/logo.svg",

    navbar: [
      { text: "Home", link: "/" },
      {
        text: "Test",
        children: [{ text: "Test", link: "/test/" }],
      },
    ],
  },
});
