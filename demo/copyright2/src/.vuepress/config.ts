import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { copyrightPlugin } from "vuepress-plugin-copyright2";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Copyright",
  description: "Append copyright information when copying",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/copyright2/",

    navbar: ["/", "/demo", "/disable-copy", "/disable-select"],
  }),

  plugins: [
    copyrightPlugin({
      author: "Mr.Hope",
      license: "MIT",
      hostname: "https://vuepress-theme-hope.github.io",
      global: true,
    }),
  ],
});
