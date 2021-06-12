import type { HopeThemeI18nConfigItem } from "../shared";

export const localesConfig: Record<string, HopeThemeI18nConfigItem> = {
  "zh-CN": {
    lang: "zh-CN",
    selectText: "选择语言",
    label: "简体中文",
    meta: {
      contributor: "贡献者",
      editLink: "编辑此页",
      updateTime: "上次编辑于",
    },
    themeColor: {
      themeColor: "主题色",
      themeMode: "主题模式",
    },
    encrypt: {
      title: "请输入密码",
      errorHint: "请输入正确密码",
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
      star: "收藏",
      slides: "幻灯片",
      encrypt: "加密",
    },
  },

  "en-US": {
    lang: "en-US",
    selectText: "Language",
    label: "English",
    ariaLabel: "Select language",
    meta: {
      contributor: "Contributors",
      editLink: "Edit this page",
      updateTime: "Last update",
    },
    themeColor: {
      themeColor: "Theme Color",
      themeMode: "Theme Mode",
    },
    encrypt: {
      title: "Please enter password",
      errorHint: "Please enter the corrent password!",
    },
    error404: {
      hint: [
        "There’s nothing here.",
        "How did we get here?",
        "That’s a Four-Oh-Four.",
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
      star: "Star",
      slides: "Slides",
      encrypt: "Encrypted",
    },
  },

  "de-AT": {
    lang: "de-AT",
    selectText: "Sprache",
    label: "Deutsch",
    ariaLabel: "Sprache wählen",
    meta: {
      contributor: "Mitwirkende",
      editLink: "Diese Seite barbeiten",
      updateTime: "Zuletzt geändert",
    },
    themeColor: {
      themeColor: "Design-Farbe",
      themeMode: "Design-Modus",
    },
    encrypt: {
      title: "Passwort eingeben",
      errorHint: "Bitte das korrekte Passwort eingeben!",
    },
    error404: {
      hint: [
        "Hier gibt es nichts.",
        "Wie sind wir hier hergekommen?",
        "Das ist wohl eine Vier-Null-Vier.",
        "Sieht aus als hättest du einen kaputten Link gefunden.",
      ],
      back: "Zurück",
      home: "Zur Startseite",
    },
    blog: {
      article: "Artikel",
      articleList: "Artikel Liste",
      category: "Kategorie",
      tag: "Tags",
      timeline: "Timeline",
      timelineText: "Yesterday Once More!",
      allText: "Alle",
      intro: "Persönliche Einleitung",
      star: "Star",
      slides: "Slides",
      encrypt: "Verschlüsselt",
    },
  },

  "vi-VN": {
    lang: "vi-VN",
    selectText: "Ngôn ngữ",
    label: "Tiếng Việt",
    ariaLabel: "Chọn ngôn ngữ",
    meta: {
      contributor: "Người đóng góp",
      editLink: "chỉnh sửa trang này",
      updateTime: "Cập nhật gần nhất lúc",
    },
    themeColor: {
      themeColor: "Màu nền",
      themeMode: "Theme Mode",
    },
    encrypt: {
      title: "Xin vui lòng nhập mật khẩu",
      errorHint: "Vui lòng nhập đúng mật khẩu",
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
      star: "Ngôi sao",
      slides: "bài thuyết trình",
      encrypt: "mã hóa",
    },
  },
};
