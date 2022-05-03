import { defineUserConfig } from "@vuepress/cli";
import { commentPlugin } from "vuepress-plugin-comment2";
import { commentTheme } from "./theme";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Comment Plugin",
  description: "Comment Plugin for VuePress2",

  // we are using a custom theme adding this plugin
  theme: commentTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/comment2/",

    navbar: ["README.md", "test.md"],
  }),

  plugins: [
    commentPlugin({
      /**
       * Using giscus
       */
      type: "giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",

      /**
       * Using twikoo
       */
      // type: "twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // type: "waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    }),
  ],
});
