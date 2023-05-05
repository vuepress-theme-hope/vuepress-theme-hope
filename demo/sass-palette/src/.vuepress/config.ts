import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { sassPalettePlugin } from "vuepress-plugin-sass-palette";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Palatte",
  description: "VuePress Palatte",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/sass-palette/",
  }),

  plugins: [sassPalettePlugin({ id: "test" })],
});
