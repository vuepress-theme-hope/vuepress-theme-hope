import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Reading-time",

  description: "VuePress2 reading time plugin demo",

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/reading-time/",
  }),

  plugins: [readingTimePlugin()],
});
