import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Sitemap",

  description: "VuePress2 Sitemap Plugin",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/sitemap2/",
  }),

  plugins: [
    sitemapPlugin({
      hostname: "https://plugin-sitemap2-demo.vuejs.press",
    }),
  ],
});
