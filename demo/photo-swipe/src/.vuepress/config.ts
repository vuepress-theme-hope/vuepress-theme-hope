import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "PhotoSwipe",
  description: "Image preview plugin for VuePress2",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/photo-swipe/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Test", link: "/test" },
    ],

    themePlugins: {
      mediumZoom: false,
    },
  }),

  plugins: [photoSwipePlugin()],
});
