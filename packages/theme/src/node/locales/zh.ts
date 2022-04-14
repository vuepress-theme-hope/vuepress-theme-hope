import type { HopeThemeLocaleData } from "../../shared";

export const zhLocale: HopeThemeLocaleData = {
  lang: "zh-CN",

  navbarLocales: {
    langName: "简体中文",
    selectLangText: "选择语言",
    selectLangAriaLabel: "选择语言",
  },

  metaLocales: {
    prev: "上一页",
    next: "下一页",
    lastUpdated: "上次编辑于",
    contributors: "贡献者",
    editLink: "编辑此页",
  },

  blogLocales: {
    article: "文章",
    articleList: "文章列表",
    category: "分类",
    tag: "标签",
    timeline: "时间轴",
    timelineTitle: "昨日不在",
    all: "全部",
    intro: "个人介绍",
    star: "收藏",
    slides: "幻灯片",
    encrypt: "加密",
  },

  paginationLocales: {
    prev: "上一页",
    next: "下一页",
    navigate: "跳转到",
    action: "前往",
    errorText: "请输入 1 到 $page 之前的页码！",
  },

  outlookLocales: {
    themeColor: "主题色",
    darkmode: "外观",
    fullscreen: "全屏",
  },

  encryptLocales: {
    title: "请输入密码",
    errorHint: "请输入正确密码",
  },

  routeLocales: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "404msg": [
      "这里什么也没有",
      "我们是怎么来到这儿的？",
      "这 是 四 零 四 !",
      "看起来你访问了一个失效的链接",
    ],
    back: "返回上一页",
    home: "带我回家",
  },

  tocLocales: "此页内容",
};
