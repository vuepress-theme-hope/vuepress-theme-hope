import { addViteOptimizeDepsInclude } from "@mr-hope/vuepress-shared";
import { defineUserConfig } from "@vuepress/cli";
import { blog } from "vuepress-plugin-blog2";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/",
  dest: "./dist",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Blog2",
      description: "VuePress 的博客插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    locales: {
      "/": {
        navbar: [{ text: "主页", link: "/" }],
        lang: "zh-CN",
        selectText: "选择语言",
        lastUpdatedText: "上次编辑于",
        label: "简体中文",
      },
    },
  },

  plugins: [
    blog({
      category: [
        {
          key: "category",
          getter: (page) => {
            return (page.frontmatter.category as string[]) || [];
          },
          layout: "Layout",
        },
        {
          key: "tag",
          getter: (page) => {
            return (page.frontmatter.tag as string[]) || [];
          },
          itemPath: "/tags/:name/",
          itemLayout: "Layout",
        },
      ],
      type: [
        {
          key: "Slide",
          filter: (page) => page.frontmatter.layout === "Slide",
          path: "/slides/",
          layout: "Layout",
        },
      ],
    }),
    {
      name: "enhance",
      onInitialized: (app) => {
        if (app.env.isDev)
          addViteOptimizeDepsInclude(app, [
            "@mr-hope/vuepress-shared/lib/client",
            "dayjs",
            "dayjs/plugin/localizedFormat",
            "dayjs/plugin/objectSupport",
            "dayjs/plugin/timezone",
            "dayjs/plugin/utc",
          ]);
      },
    },
  ],
});
