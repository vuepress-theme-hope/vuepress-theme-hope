import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { commentPlugin } from "vuepress-plugin-comment2";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Comment Plugin",
  description: "Comment Plugin for VuePress2",

  // We are using a custom theme adding this plugin
  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/comment2/",

    navbar: ["/", "/test", "/test2"],
  }),

  plugins: [
    commentPlugin({
      provider: "Giscus",
    }),
  ],
});
