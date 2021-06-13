import { path } from "@vuepress/utils";
import type { UserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const config: UserConfig<DefaultThemeOptions> = {
  base: process.env.VuePress_BASE || "/",

  title: "Comment Plugin",

  description: "Comment Plugin for VuePress",

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
};

export default config;
