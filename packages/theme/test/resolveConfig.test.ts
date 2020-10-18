/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, it } from "mocha";
import { HopeVuepressConfig } from "../types";
import { expect } from "chai";
import { config } from "../";

describe("Test resolveTheme function", () => {
  const vuepressConfig: HopeVuepressConfig = {
    /** 网站标题 */
    title: "vuepress-theme-hope",

    /** 网站描述 */
    description: "一个具有强大功能的 vuepress 主题✨",

    locales: {
      "/en/": {
        /** 网站在该语言下的标题 */
        title: "vuepress-theme-hope",

        /** 网站在该语言下的描述 */
        description: "A vuepress theme with tons of features✨",
      },
    },

    /** 主题配置 */
    themeConfig: {
      /** 网站的logo */
      logo: "/logo.svg",

      /** 头部导航栏的配置 */
      nav: [
        { text: "主页", link: "/", icon: "homefill" },
        { text: "指南", link: "/guide/", icon: "creativefill" },
        { text: "配置", link: "/config/", icon: "code" },
        {
          text: "基础",
          icon: "infofill",
          items: [
            { text: "Markdown", link: "/basic/markdown/", icon: "markdown" },
            { text: "Vuepress", link: "/basic/vuepress/", icon: "vue" },
          ],
        },
        {
          text: "更新日志",
          link:
            "https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/CHANGELOG.md",
        },
      ],

      /** 侧边栏配置 */
      sidebar: {
        "/guide/": [
          {
            title: "快速上手",
            icon: "creative",
            children: ["", "install"],
          },
          {
            title: "外观",
            icon: "skinfill",
            children: ["navbar", "sidebar", "breadcrumb", "page"],
          },
          {
            title: "新增功能",
            icon: "skinfill",
            children: ["themecolor", "fullscreen", "comment", "component"],
          },
          {
            title: "Markdown 增强",
            icon: "markdown",
            prefix: "markdown/",
            children: ["", "sup-sub", "footnote", "tex", "flowchart"],
          },
        ],

        "/config/": [
          "",
          "themeConfig",
          "page",
          "stylus",
          {
            title: "插件配置",
            prefix: "plugin/",
            icon: "extension",
            children: ["", "copyright", "medium-zoom", "pwa"],
          },
        ],

        // fallback
        "/basic/": [
          {
            title: "Markdown",
            prefix: "markdown/",
            icon: "markdown",
            children: ["", "demo", "emoji"],
          },
          {
            title: "Vuepress",
            prefix: "vuepress/",
            icon: "vue",
            children: [
              "",
              "file",
              "plugin",
              "theme/",
              "theme/config",
              "command",
              "case",
            ],
          },
        ],

        "/": ["", "guide/", "config/", "basic/"],
      },

      /** 默认作者 */
      author: "Mr.Hope",

      /** 图标前缀 */
      iconPrefix: "vuepress-",

      /** Markdown设置 */
      markdown: {
        enableAll: true,
      },

      /** 评论设置 */
      comment: {
        type: "valine",
        appId: "ENQC8OAX6E76OUB07ODFfUHm-gzGzoHsz",
        appKey: "2JK4ezJDqxPTF7JLn5Wk6i8y",
      },

      /** 语言设置 */
      locales: {
        /** 英文设置 */
        "/en/": {
          /** 该语言下头部导航栏的配置 */
          nav: [
            { text: "Home", link: "/en/", icon: "homefill" },
            { text: "Guide", link: "/en/guide/", icon: "creativefill" },
            { text: "Config", link: "/en/config/", icon: "code" },
            {
              text: "Basic",
              icon: "infofill",
              items: [
                {
                  text: "Markdown",
                  link: "/en/basic/markdown/",
                  icon: "markdown",
                },
                { text: "Vuepress", link: "/en/basic/vuepress/", icon: "vue" },
              ],
            },
            {
              text: "Changelog",
              link:
                "https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/CHANGELOG.md",
            },
          ],

          /** 网站在该语言下的侧边栏 */
          sidebar: {
            "/en/guide/": [
              {
                title: "Get Started",
                icon: "creative",
                children: ["", "install"],
              },
              {
                title: "Outlook",
                icon: "skinfill",
                children: ["navbar", "sidebar", "breadcrumb", "page"],
              },
              {
                title: "New Feature",
                icon: "skinfill",
                children: ["themecolor", "fullscreen", "comment", "component"],
              },
              {
                title: "Markdown Enhance",
                icon: "markdown",
                prefix: "markdown/",
                children: ["", "sup-sub", "footnote", "tex", "flowchart"],
              },
            ],

            "/en/config/": [
              "",
              "themeConfig",
              "page",
              "stylus",
              {
                title: "Plugin Config",
                prefix: "plugin/",
                icon: "extension",
                children: ["", "copyright", "medium-zoom", "pwa"],
              },
            ],

            // fallback
            "/en/basic/": [
              {
                title: "Markdown",
                prefix: "markdown/",
                icon: "markdown",
                children: ["", "demo", "emoji"],
              },
              {
                title: "Vuepress",
                prefix: "vuepress/",
                icon: "vue",
                children: [
                  "",
                  "file",
                  "plugin",
                  "theme/",
                  "theme/config",
                  "command",
                  "case",
                ],
              },
            ],

            "/en/": ["", "guide/", "config/", "basic/"],
          },
        },
      },

      /** 搜索设置 */
      algolia: {
        apiKey: "4deb442097fb6a05638adf10ef86e222",
        indexName: "mrhope_vuepress-theme",
      },

      /** repo地址 */
      repo: "https://github.com/mister-hope/vuepress-theme-hope",

      /** 文档目录 */
      docsDir: "docs/theme",
    },

    extraWatchFiles: [
      ".vuepress/config/navBar.js",
      ".vuepress/config/sideBar.js",
      ".vuepress/config/theme.js",
    ],
  };

  const resolvedConfig = config(vuepressConfig);

  it("should resolve locates for vuepress", () => {
    expect(resolvedConfig.locales).to.have.property("/");
    expect(resolvedConfig.locales!["/"]).to.have.property("lang");
    expect(resolvedConfig.locales).to.have.property("/en/");
    expect(resolvedConfig.locales!["/en/"]).to.have.property("lang");
  });

  it("To have base option", () => {
    expect(resolvedConfig.base).to.be.equal("/");
  });

  it("Evergreen should be true since the default is changed", () => {
    expect(resolvedConfig.evergreen).to.be.equal(true);
  });

  it("Should use vuepress-theme-hope", () => {
    expect(resolvedConfig.theme).to.be.equal("hope");
  });
});
