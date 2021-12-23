import hope from "vuepress-theme-hope";

export default {
  en: hope.navbarConfig([
    { text: "Guide", link: "/guide/", icon: "creative" },
    { text: "Config", link: "/config/", icon: "config" },
    { text: "FAQ", link: "/FAQ/", icon: "question" },
    {
      text: "Basic",
      icon: "info",
      prefix: "/basic/",
      items: [
        { text: "Tutorial", link: "tutorial", icon: "creative" },
        { text: "Markdown", link: "markdown/", icon: "markdown" },
        { text: "VuePress", link: "vuepress/", icon: "vue" },
      ],
    },
    {
      text: "Project",
      icon: "info",
      items: [
        {
          text: "Changelog",
          link: "/changelog/",
        },
        {
          text: "Repo",
          link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
        },
        {
          text: "Theme Demo",
          link: "/demo/",
        },
        {
          text: "Contribution Guide",
          link: "/contribution/",
        },
        {
          text: "Plugins",
          icon: "plugin",
          items: [
            {
              text: "Active Hash Plugin",
              link: "https://vuepress-theme-hope.github.io/active-hash/",
            },
            {
              text: "AddThis Plugin",
              link: "https://vuepress-theme-hope.github.io/add-this/",
            },
            {
              text: "Comment Plugin",
              link: "https://vuepress-theme-hope.github.io/comment/",
            },
            {
              text: "Copy Code Plugin",
              link: "https://vuepress-theme-hope.github.io/copy-code/",
            },
            {
              text: "Feed Plugin",
              link: "https://vuepress-theme-hope.github.io/feed/",
            },
            {
              text: "Git Info Plugin",
              link: "https://vuepress-theme-hope.github.io/git/",
            },
            {
              text: "Markdown Enhance Plugin",
              link: "https://vuepress-theme-hope.github.io/md-enhance/",
            },
            {
              text: "Photo Swipe Plugin",
              link: "https://vuepress-theme-hope.github.io/photo-swipe/",
            },
            {
              text: "PWA Plugin",
              link: "https://vuepress-theme-hope.github.io/pwa/",
            },
            {
              text: "Reading Time Plugin",
              link: "https://vuepress-theme-hope.github.io/reading-time/",
            },
            {
              text: "Seo Plugin",
              link: "https://vuepress-theme-hope.github.io/seo/",
            },
            {
              text: "Sitemap Plugin",
              link: "https://vuepress-theme-hope.github.io/sitemap/",
            },
          ],
        },
      ],
    },
  ]),

  zh: hope.navbarConfig([
    { text: "指南", link: "/zh/guide/", icon: "creative" },
    { text: "配置", link: "/zh/config/", icon: "config" },
    { text: "常见问题", link: "/zh/FAQ/", icon: "question" },
    {
      text: "基础",
      icon: "info",
      prefix: "/zh/basic/",
      items: [
        { text: "小白指南", link: "tutorial", icon: "creative" },
        { text: "Markdown", link: "markdown/", icon: "markdown" },
        { text: "VuePress", link: "vuepress/", icon: "vue" },
      ],
    },
    {
      text: "项目",
      icon: "info",
      items: [
        {
          text: "变更日志",
          link: "/zh/changelog/",
        },
        {
          text: "项目地址",
          link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
        },
        {
          text: "项目案例",
          link: "/zh/demo/",
        },
        {
          text: "贡献指南",
          link: "/zh/contribution/",
        },
        {
          text: "插件",
          icon: "plugin",
          items: [
            {
              text: "自动激活锚点插件",
              link: "https://vuepress-theme-hope.github.io/active-hash/zh/",
            },
            {
              text: "AddThis 插件",
              link: "https://vuepress-theme-hope.github.io/add-this/zh/",
            },
            {
              text: "评论插件",
              link: "https://vuepress-theme-hope.github.io/comment/zh/",
            },
            {
              text: "代码复制插件",
              link: "https://vuepress-theme-hope.github.io/copy-code/zh/",
            },
            {
              text: "Feed 插件",
              link: "https://vuepress-theme-hope.github.io/feed/zh/",
            },
            {
              text: "Git 信息插件",
              link: "https://vuepress-theme-hope.github.io/git/zh/",
            },
            {
              text: "Markdown 增强插件",
              link: "https://vuepress-theme-hope.github.io/md-enhance/zh/",
            },
            {
              text: "图片预览插件",
              link: "https://vuepress-theme-hope.github.io/photo-swipe/zh/",
            },
            {
              text: "PWA 插件",
              link: "https://vuepress-theme-hope.github.io/pwa/zh/",
            },
            {
              text: "阅读时间插件",
              link: "https://vuepress-theme-hope.github.io/reading-time/zh/",
            },
            {
              text: "Seo 插件",
              link: "https://vuepress-theme-hope.github.io/seo/zh/",
            },
            {
              text: "Sitemap 插件",
              link: "https://vuepress-theme-hope.github.io/sitemap/zh/",
            },
          ],
        },
      ],
    },
  ]),
};
