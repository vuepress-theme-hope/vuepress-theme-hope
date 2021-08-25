module.exports = {
  /** 部署目录 */
  base: process.env.VuePress_BASE || "/",

  /** 网站标题 */
  title: "Markdown 增强",

  /** 网站在该语言下的描述 */
  description: "VuePress 的 Markdown 增强插件",

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
        content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
      },
    ],
  ],

  /** 构建文件输出目录 */
  dest: "./dist",

  /** 多语言配置选项
   *
   * 键名是该语言所属的子路径
   * 作为特例，默认语言可以使用 '/' 作为其路径。
   */
  locales: {
    /** 默认语言 */
    "/": {
      /** 设置为中文 */
      lang: "zh-CN",
    },
  },

  /** 主题配置 */
  themeConfig: {
    logo: "/logo.svg",

    /** 侧边栏配置 */
    sidebar: {
      "/": [
        "",
        "sup-sub",
        "align",
        "footnote",
        "mark",
        "tasklist",
        "flowchart",
        "mermaid",
        "tex",
        "demo",
        {
          title: "Presentation",
          collapsable: false,
          children: [
            "presentation/",
            "presentation/demo",
            "presentation/themes",
          ],
        },
      ],
    },

    /** 侧边栏标题显示深度，0-2 */
    sidebarDepth: 2,

    /** 语言设置 */
    locales: {
      /** 默认语言 */
      "/": {
        lang: "zh-CN",
        selectText: "选择语言",
        lastUpdated: "上次编辑于",
        label: "简体中文",
      },
    },

    /** repo地址 */
    repo: "https://github.com/mister-hope/vuepress-plugin-md-enhance",

    /** 文档目录 */
    docsDir: "docs",

    /** 自定义仓库链接文字 */
    repoLabel: "GitHub",

    /** 开启编辑此页链接 */
    editLinks: true, // 默认是 false, 设置为 true 来启用

    /** 编辑此页链接提示文字 */
    editLinkText: "在 GitHub 上编辑此页", // 默认为 "Edit this page"
  },

  plugins: [
    /** Markdown 增强 */
    ["md-enhance", { enableAll: true }],
  ],
};
