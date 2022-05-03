import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { addThisPlugin } from "vuepress-plugin-add-this";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",
  title: "Add this",
  description: "Add this plugin for VuePress2",

  theme: defaultTheme({
    logo: "/logo.svg",
    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/add-this/",
  }),

  plugins: [addThisPlugin({ pubid: "ra-601bf7e7c332daca" })],
});
