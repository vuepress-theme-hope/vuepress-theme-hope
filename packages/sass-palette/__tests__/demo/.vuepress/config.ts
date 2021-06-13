import type { UserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const config: UserConfig<DefaultThemeOptions> = {
  base: process.env.VuePress_BASE || "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Palatte",
      description: "VuePress Palatte",
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    locales: {
      "/": {
        navbar: [{ text: "主页", link: "/" }],
        lang: "zh-CN",
        selectText: "选择语言",
        lastUpdatedText: "上次编辑于",
        label: "简体中文",
      },
    },
  },

  plugins: [["sass-palette"]],
};

export default config;
