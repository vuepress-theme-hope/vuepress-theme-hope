import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { copyrightPlugin } from "vuepress-plugin-copyright2";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default defineUserConfig({
  base,

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
