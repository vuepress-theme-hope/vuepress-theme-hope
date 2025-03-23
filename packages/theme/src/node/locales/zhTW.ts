import type { ThemeLocaleData } from "../../shared/index.js";

export const zhTWLocale: ThemeLocaleData = {
  lang: "zh-TW",

  navbarLocales: {
    langName: "繁體中文",
    selectLangAriaLabel: "選擇語言",
  },

  metaLocales: {
    author: "作者",
    date: "寫作日期",
    origin: "原創",
    views: "訪問量",
    category: "分類",
    tag: "標籤",
    readingTime: "閱讀時間",
    words: "字數",
    toc: "此頁內容",
    prev: "上一頁",
    next: "下一頁",
    contributors: "貢獻者",
    editLink: "編輯此頁",
    print: "打印",
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
    star: "星標",
    empty: "$text 為空",
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
    iconLabel: "頁面已加密",
    placeholder: "輸入密碼",
    remember: "記憶密碼",
    errorHint: "請輸入正確密碼",
  },

  routeLocales: {
    skipToContent: "跳至主要內容",
    notFoundTitle: "頁面不存在",
    notFoundMsg: [
      "這裡什麼也沒有",
      "我們是怎麼來到這兒的？",
      "這 是 四 零 四 !",
      "看起来你訪問了一個失效的鏈結",
    ],
    back: "返回上一頁",
    home: "帶我回家",
  },
};
