import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Copy Code",
  description: "Copy code button for VuePress2",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/copy-code2/",
  }),

  plugins: [copyCodePlugin()],
});
