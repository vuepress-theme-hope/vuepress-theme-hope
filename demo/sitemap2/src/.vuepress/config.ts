import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Sitemap",

  description: "VuePress2 Sitemap Plugin",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/sitemap2/",
  }),

  plugins: [
    sitemapPlugin({
      hostname: "https://vuepress-theme-hope.github.io",
    }),
  ],
});
