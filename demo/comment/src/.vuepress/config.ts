import { defineUserConfig } from "@vuepress/cli";
import { path } from "@vuepress/utils";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const VuePress_BASE = process.env.VuePress_BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: VuePress_BASE || "/",

  title: "Comment Plugin",
  description: "Comment Plugin for VuePress2",

  // we are using a custom theme adding this plugin
  theme: path.resolve(__dirname, "./theme"),

  themeConfig: {
    logo: "/logo.svg",

    navbar: ["README.md", "test.md"],
  },
});
