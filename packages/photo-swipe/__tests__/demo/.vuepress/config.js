module.exports = {
  /** 部署目录 */
  base: process.env.VuePress_BASE || "/",

  /** 网站标题 */
  title: "PhotoSwipe",

  /** 网站在该语言下的描述 */
  description: "vuepress-plugin-photo-swipe",

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

  /** 主题配置 */
  themeConfig: {
    /** 网站的logo */
    logo: "/logo.svg",
  },

  plugins: [
    /** Markdown 增强 */
    ["photo-swipe"],
  ],
};
