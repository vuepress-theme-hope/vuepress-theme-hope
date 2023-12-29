import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Auto Catalog Plugin",
  description: "Auto generating catalog pages for VuePress2",

  // we are using a custom theme adding this plugin
  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/auto-catalog/",

    navbar: ["/", "/demo", "/feature/", "/post/"],
  }),

  plugins: [autoCatalogPlugin()],
});
