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
    text: "追加时间插件",
    icon: "clock",
    link: getLink("append-date"),
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
    text: "VuePress 工具函数",
    icon: "toolbox",
    link: getLink("shared"),
  },
];
</script>
