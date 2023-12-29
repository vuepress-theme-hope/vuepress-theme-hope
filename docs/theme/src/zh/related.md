---
title: 相关插件
icon: puzzle-piece
---

<!-- markdownlint-disable -->

<div class="plugins-wrapper">
  <a v-for="{ text, icon, link } in features" class="plugin-item" target="_blank" :href="link">
    <HopeIcon :icon="icon" />
    <div>{{text}}</div>
  </a>
</div>

<script setup lang="ts">
const getLink = (name: string): string =>
  `https://${
    IS_NETLIFY
      ? `${name === "shared" ? name : `plugin-${name}`}.vuejs.press/zh/`
      : `vuepress-theme-hope.${
          IS_GITEE ? "gitee" : "github"
        }.io/v2/${name.replace(/\d+$/, "")}/zh/`
  }`;

const features = [
  {
    text: "自动目录插件",
    icon: "network-wired",
    link: getLink("auto-catalog"),
  },
  {
    text: "博客插件",
    icon: "blog",
    link: getLink("blog2"),
  },
  {
    text: "评论插件",
    icon: "comment",
    link: getLink("comment2"),
  },
  {
    text: "组件库",
    icon: "puzzle-piece",
    link: getLink("components"),
  },
  {
    text: "代码复制插件",
    icon: "copy",
    link: getLink("copy-code2"),
  },
  {
    text: "版权信息插件",
    icon: "copyright",
    link: getLink("copyright2"),
  },
  {
    text: "Feed 插件",
    icon: "rss",
    link: getLink("feed2"),
  },
  {
    text: "LightGallery 插件",
    icon: "image",
    link: getLink("lightgallery"),
  },
  {
    text: "Markdown 增强插件",
    icon: "fab fa-markdown",
    link: getLink("md-enhance"),
  },
  {
    text: "图片预览插件",
    icon: "image",
    link: getLink("photo-swipe"),
  },
  {
    text: "PWA 插件",
    icon: "mobile",
    link: getLink("pwa2"),
  },
  {
    text: "阅读时间插件",
    icon: "book-open",
    link: getLink("reading-time2"),
  },
  {
    text: "移除 PWA 插件",
    icon: "trash-can",
    link: getLink("remove-pwa"),
  },
  {
    text: "重定向插件",
    icon: "fas fa-eject fa-rotate-90",
    link: getLink("redirect"),
  },
  {
    text: "Sass 调色板插件",
    icon: "palette",
    link: getLink("sass-palette"),
  },
  {
    text: "客户端搜索插件",
    icon: "search",
    link: getLink("search-pro"),
  },
  {
    text: "Seo 插件",
    icon: "wrench",
    link: getLink("seo2"),
  },
  {
    text: "VuePress 工具函数",
    icon: "toolbox",
    link: getLink("shared"),
  },
  {
    text: "Sitemap 插件",
    icon: "sitemap",
    link: getLink("sitemap2"),
  },
];
</script>
