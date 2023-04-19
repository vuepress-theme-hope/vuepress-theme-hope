import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { seoPlugin } from "vuepress-plugin-seo2";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Seo",

  description: "VuePress Seo",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/seo2/",

    navbar: ["/", "/demo"],
  }),

  plugins: [
    seoPlugin({
      hostname: "https://plugin-seo2-demo.vuejs.press",
    }),
  ],
});
