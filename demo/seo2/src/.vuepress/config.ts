import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { seoPlugin } from "vuepress-plugin-seo2";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Seo",

  description: "VuePress Seo",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/seo2/",

    navbar: ["/", "/demo"],
  }),

  plugins: [
    seoPlugin({
      hostname: "https://vuepress-theme-hope.github.io",
    }),
  ],
});
