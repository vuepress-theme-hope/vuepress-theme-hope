import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { lightgalleryPlugin } from "vuepress-plugin-lightgallery";

const base = (process.env.BASE as "/" | `/${string}/` | undefined) ?? "/";

export default defineUserConfig({
  base,

  title: "Lightgallery",
  description: "Image preview plugin for VuePress2",

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/lightgallery/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Test", link: "/test" },
    ],

    themePlugins: {
      mediumZoom: false,
    },
  }),

  plugins: [lightgalleryPlugin()],
});
