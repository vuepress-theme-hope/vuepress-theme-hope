import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "PhotoSwipe",
  description: "Image preview plugin for VuePress2",

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/photo-swipe/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Test", link: "/test" },
    ],

    themePlugins: {
      mediumZoom: false,
    },
  },

  plugins: ["photo-swipe"],
});
