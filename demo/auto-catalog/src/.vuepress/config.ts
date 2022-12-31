import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default defineUserConfig({
  base,

  title: "Comment Plugin",
  description: "Comment Plugin for VuePress2",

  // we are using a custom theme adding this plugin
  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/auto-catalog/",

    navbar: ["/", "/feature/", "/post/"],
  }),

  plugins: [autoCatalogPlugin()],
});
