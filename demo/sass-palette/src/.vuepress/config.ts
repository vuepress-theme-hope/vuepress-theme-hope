import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { sassPalettePlugin } from "vuepress-plugin-sass-palette";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Palatte",
  description: "VuePress Palatte",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/sass-palette/",
  }),

  plugins: [sassPalettePlugin({ id: "test" })],
});
