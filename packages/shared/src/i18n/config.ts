import type { HopeThemeLocaleConfigItem, LangPaths, Langs } from "./types";

export const langs: Langs[] = ["zh-CN", "en-US", "vi-VN"];

export const lang2PathConfig: Record<Langs, LangPaths> = {
  "zh-CN": "/zh/",
  "en-US": "/en/",
  "vi-VN": "/vi/",
};

export const path2langConfig: Record<LangPaths, Langs> = {
  "/zh/": "zh-CN",
  "/en/": "en-US",
  "/vi/": "vi-VN",
};

export const localesConfig: Record<Langs, HopeThemeLocaleConfigItem> = {
  "zh-CN": {
    lang: "zh-CN",
    selectText: "选择语言",
    lastUpdated: "上次编辑于",
    label: "简体中文",
    editLinkText: "在 GitHub 上编辑此页",
    themeColor: {
      themeColor: "主题色",
      themeMode: "主题模式",
    },
    error404: {
      hint: [
        "这里什么也没有",
        "我们是怎么来到这儿的？",
        "这 是 四 零 四 !",
        "看起来你访问了一个失效的链接",
      ],
      back: "返回上一页",
      home: "带我回家",
    },
    blog: {
      article: "文章",
      articleList: "文章列表",
      category: "分类",
      tag: "标签",
      timeline: "时间轴",
      timelineText: "昨日不在",
      allText: "全部",
      intro: "个人介绍",
      slides: "幻灯片",
      encrypt: "加密",
    },
  },

  "en-US": {
    lang: "en-US",
    selectText: "Language",
    ariaLabel: "Select language",
    lastUpdated: "Last update",
    label: "English",
    editLinkText: "Edit on Github",
    themeColor: {
      themeColor: "Theme Color",
      themeMode: "Theme Mode",
    },
    error404: {
      hint: [
        "There's nothing here.",
        "How did we get here?",
        "That's a Four-Oh-Four.",
        "Looks like we've got some broken links.",
      ],
      back: "Go back",
      home: "Take me home",
    },
    blog: {
      article: "Articles",
      articleList: "Article List",
      category: "Category",
      tag: "Tags",
      timeline: "Timeline",
      timelineText: "Yesterday Once More!",
      allText: "All",
      intro: "Personal Intro",
      slides: "Slides",
      encrypt: "Encrypted",
    },
  },
  "vi-VN": {
    lang: "vi-VN",
    selectText: "Ngôn ngữ",
    ariaLabel: "Chọn ngôn ngữ",
    lastUpdated: "Cập nhật gần nhất lúc",
    label: "Tiếng Việt",
    editLinkText: "Chỉnh sửa trên GitHub",
    themeColor: {
      themeColor: "Màu nền",
      themeMode: "Theme Mode",
    },
    error404: {
      hint: [
        "Ở đây chẳng có gì cả.",
        "Sao chúng ta lại đến đây?",
        "Đây là lỗi bốn-không-bốn",
        "Có vẻ chúng ta có vài liên kết gãy.",
      ],
      back: "Quay lại",
      home: "Trang chủ",
    },
    blog: {
      article: "Bài viết",
      articleList: "Danh sách Bài viết",
      category: "Category",
      tag: "Tags",
      timeline: "Timeline",
      timelineText: "Yesterday Once More!",
      allText: "Tất cả",
      intro: "Giới thiệu cá nhân",
      slides: "bài thuyết trình",
      encrypt: "mã hóa",
    },
  },
};
