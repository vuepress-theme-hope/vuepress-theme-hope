import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "PWA Plugin",
  description: "PWA Plugin for VuePress2",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/pwa2/",
  }),

  plugins: [pwaPlugin()],
});
