import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const VuePress_BASE = process.env.VuePress_BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: VuePress_BASE || "/",

  title: "PhotoSwipe",
  description: "Image preview plugin for VuePress2",

  themeConfig: {
    logo: "/logo.svg",

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
