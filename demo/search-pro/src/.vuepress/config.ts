import { defaultTheme } from "@vuepress/theme-default";
import { cut } from "nodejs-jieba";
import { defineUserConfig } from "vuepress/cli";
import { searchProPlugin } from "vuepress-plugin-search-pro";

const base = (process.env["BASE"] as "/" | `/${string}/`) || "/";

export default defineUserConfig({
  base,

  title: "Search Pro",

  description: "VuePress Client Search plugin",

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/search-pro/",

    navbar: ["/", "/demo"],
  }),

  plugins: [
    searchProPlugin({
      indexContent: true,
      hotReload: true,
      customFields: [
        {
          getter: ({ frontmatter }): string[] => frontmatter["tag"] as string[],
          formatter: `Tag: $content`,
        },
      ],
      indexOptions: {
        tokenize: (text, fieldName) =>
          fieldName === "id" ? [text] : cut(text, true),
      },
    }),
  ],
});
