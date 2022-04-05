import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Lightgallery",
  description: "Image preview plugin for VuePress2",

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/lightgallery/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Test", link: "/test" },
    ],

    themePlugins: {
      mediumZoom: false,
    },
  },

  plugins: ["lightgallery"],
});
