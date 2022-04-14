import type { HopeThemeLocaleData } from "../../shared";

export const zhTWLocale: HopeThemeLocaleData = {
  lang: "zh-TW",

  navbarLocales: {
    langName: "繁體中文",
    selectLangText: "選擇語言",
    selectLangAriaLabel: "選擇語言",
  },

  metaLocales: {
    prev: "上一頁",
    next: "下一頁",
    lastUpdated: "上次編輯於",
    contributors: "貢獻者",
    editLink: "編輯此頁",
  },

  blogLocales: {
    article: "文章",
    articleList: "文章列表",
    category: "分類",
    tag: "標籤",
    timeline: "時間軸",
    timelineTitle: "昨日不在",
    all: "全部",
    intro: "個人介紹",
    star: "收藏",
    slides: "幻燈片",
    encrypt: "加密",
  },

  paginationLocales: {
    prev: "上一頁",
    next: "下一頁",
    navigate: "跳轉到",
    action: "前往",
    errorText: "請輸入 1 到 $page 之前的頁碼！",
  },

  outlookLocales: {
    themeColor: "主題色",
    darkmode: "主題模式",
    fullscreen: "全屏",
  },

  encryptLocales: {
    title: "請輸入密碼",
    errorHint: "請輸入正確密碼",
  },

  routeLocales: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "404msg": [
      "這裡什麼也沒有",
      "我們是怎麼來到這兒的？",
      "這 是 四 零 四 !",
      "看起来你訪問了一個失效的鏈結",
    ],
    back: "返回上一頁",
    home: "帶我回家",
  },

  tocLocales: "此頁內容",
};
