import { defineUserConfig } from "@vuepress/cli";
import { path } from "@vuepress/utils";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Comment Plugin",
  description: "Comment Plugin for VuePress2",

  // we are using a custom theme adding this plugin
  theme: path.resolve(__dirname, "./theme"),

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/comment2/",

    navbar: ["README.md", "test.md"],
  },
});
