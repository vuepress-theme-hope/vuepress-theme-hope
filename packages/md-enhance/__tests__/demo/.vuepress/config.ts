import type { UserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const config: UserConfig<DefaultThemeOptions> = {
  /** 部署目录 */
  base: process.env.VuePress_BASE || "/",

  /** 生成网站头部的标签 */
  head: [
    // 设置网站图标
    ["link", { rel: "icon", href: "/favicon.ico" }],

    // 设置网站作者
    ["meta", { name: "author", content: "Mr.Hope" }],

    // 移动端App体验
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      },
    ],
  ],

  /** 构建文件输出目录 */
  dest: "./dist",

  temp: "./node_modules/.temp",

  cache: "./node_modules/.cache",

  /** 多语言配置选项
   *
   * 键名是该语言所属的子路径
   * 作为特例，默认语言可以使用 '/' 作为其路径。
   */
  locales: {
    /** 英文设置 */
    "/": {
      /** 设置为英文 */
      lang: "en-US", // 将会被设置为 <html> 的 lang 属性

      /** 网站在该语言下的标题 */
      title: "Markdown Enhance Plugin",

      /** 网站在该语言下的描述 */
      description: "Markdown Enhancement for VuePress",
    } /** 默认语言 */,
    "/zh/": {
      /** 设置为中文 */
      lang: "zh-CN",

      /** 网站标题 */
      title: "Markdown 增强",

      /** 网站在该语言下的描述 */
      description: "VuePress 的 Markdown 增强插件",
    },
  },

  /** 主题配置 */
  themeConfig: {
    /** 网站的logo */
    logo: "/logo.svg",

    /** 侧边栏标题显示深度，0-2 */
    sidebarDepth: 2,

    /** 语言设置 */
    locales: {
      /** 英文设置 */
      "/": {
        /** 设置该语言的代码 */
        lang: "en-US", // 将会被设置为 <html> 的 lang 属性

        /** 多语言下拉菜单的标题 */
        selectText: "Language",

        /** 辅助标签 */
        ariaLabel: "Select language",

        /** 该语言在下拉菜单中的标签 */
        label: "English",

        /** 编辑链接文字 */
        editLinkText: "Edit on Github",

        /** 该语言下头部导航栏的配置 */
        navbar: [
          { text: "Home", link: "/" },
          { text: "Guide", link: "/guide/" },
          { text: "Config", link: "/api/" },
        ],

        /** 侧边栏配置 */
        sidebar: {
          "/guide/": [
            "/guide/readme.md",
            "/guide/sup-sub.md",
            "/guide/align.md",
            "/guide/footnote.md",
            "/guide/mermaid.md",
            "/guide/tex.md",
            "/guide/presentation/readme.md",
            "/guide/presentation/demo.md",
            "/guide/presentation/theme.md",
          ],

          "/": ["/readme.md", "/guide/readme.md"],
        },
      },
      /** 默认语言 */
      "/zh/": {
        lang: "zh-CN",
        selectLanguageText: "选择语言",
        selectLanguageAriaLabel: "选择语言",
        lastUpdatedText: "上次编辑于",
        selectLanguageName: "简体中文",
      },
    },

    /** repo地址 */
    repo: "https://github.com/mister-hope/vuepress-plugin-md-enhance",

    /** 文档目录 */
    docsDir: "docs",

    /** 自定义仓库链接文字 */
    repoLabel: "Github",

    /** 开启编辑此页链接 */
    editLinks: true, // 默认是 false, 设置为 true 来启用

    /** 编辑此页链接提示文字 */
    editLinkText: "在 GitHub 上编辑此页", // 默认为 "Edit this page"
  },

  plugins: [
    /** Markdown 增强 */
    [
      "md-enhance",
      {
        enableAll: true,
        presentation: {
          plugins: [
            "highlight",
            "math",
            "search",
            "notes",
            "zoom",
            "anything",
            "audio",
            "chalkboard",
          ],
        },
      },
    ],
  ],
};

export default config;
