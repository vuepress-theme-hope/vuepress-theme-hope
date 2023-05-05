import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Copy Code",
  description: "Copy code button for VuePress2",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/copy-code2/",
  }),

  plugins: [copyCodePlugin()],
});
