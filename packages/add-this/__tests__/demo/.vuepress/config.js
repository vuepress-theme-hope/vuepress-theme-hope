module.exports = {
  /** 部署目录 */
  base: process.env.VuePress_BASE || "/",

  /** 网站标题 */
  title: "Add this",

  /** 网站在该语言下的描述 */
  description: "VuePress 的 Add this 插件",

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
    /** 网站的logo */
    logo: "/logo.svg",

    /** 头部导航栏的配置 */
    nav: [{ text: "主页", link: "/" }],

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
  },

  plugins: [
    /** Markdown 增强 */
    ["add-this", { pubid: "ra-5f829c59e6c6bc9a" }],
  ],
};
