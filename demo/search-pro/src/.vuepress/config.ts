import {hopeTheme} from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress/cli";

const base = (process.env["BASE"] as "/" | `/${string}/`) || "/";

export default defineUserConfig({
  base,

  title: "Search Pro",

  description: "VuePress Client Search plugin",

  theme: hopeTheme({
        plugins: {
            searchPro: true,
            // searchPro: {
            //   插件选项
            // },
        },
    }),
});
