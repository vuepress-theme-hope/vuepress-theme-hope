import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { copyrightPlugin } from "vuepress-plugin-copyright2";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Copyright",
  description: "Append copyright information when copying",

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/copyright2/",

    navbar: ["/", "/demo", "/disable-copy", "/disable-select"],

    sidebar: false,
  }),

  plugins: [
    copyrightPlugin({
      author: "Mr.Hope",
      license: "MIT",
      canonical: "https://plugin-copyright2-demo.vuejs.press",
      global: true,
    }),
  ],
});
