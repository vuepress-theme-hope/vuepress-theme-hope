import { HopeLangI18nConfig } from "../../types";

export type Langs = "zh-CN" | "en-US";

export type LangPaths = "/zh/" | "/en/";

/** 支持语言 */
export const langs: Langs[] = ["zh-CN", "en-US"];

/** 语言对应路径 */
export const lang2PathConfig: Record<string, LangPaths> = {
  "zh-CN": "/zh/",
  "en-US": "/en/",
};

/** 路径对应语言 */
export const path2langConfig: Record<string, Langs> = {
  "/zh/": "zh-CN",
  "/en/": "en-US",
};

/** 语言设置 */
export const localesConfig: Record<string, HopeLangI18nConfig> = {
  "zh-CN": {
    lang: "zh-CN",
    selectText: "选择语言",
    lastUpdated: "上次编辑于",
    label: "简体中文",
    editLinkText: "在 GitHub 上编辑此页",
    valineHolder: "请留言",
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
    pagination: {
      prev: "上一页",
      next: "下一页",
      navigate: "跳转到",
      button: "前往",
      errorText: "请输入 1 到 $page 之前的页码！",
    },
    blog: {
      article: "文章",
      articleList: "文章列表",
      category: "分类",
      tag: "标签",
      timeline: "时间轴",
      timelineText: "昨日不在",
      allText: "全部",
    },
  },

  /** 英文设置 */
  "en-US": {
    lang: "en-US",
    selectText: "Language",
    /** 辅助标签 */
    ariaLabel: "Select language",
    lastUpdated: "Last update",
    label: "English",
    editLinkText: "Edit on Github",
    valineHolder: "Write a comment here",
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
    pagination: {
      prev: "Prev",
      next: "Next",
      navigate: "Jump to",
      button: "Go",
      errorText: "Please enter a number between 1 and $page !",
    },
    blog: {
      article: "Articles",
      articleList: "Article List",
      category: "Category",
      tag: "Tags",
      timeline: "Timeline",
      timelineText: "Yesterday Once More!",
      allText: "All",
    },
  },
};

/** 页面信息 */
const pageInfoConfig: Record<string, Record<string, string>> = {
  author: {
    "/zh/": "作者🖊",
    "/en/": "Author🖊",
  },
  time: {
    "/zh/": "写作日期📅",
    "/en/": "Writing Date📅",
  },
  origin: {
    "/zh/": "原创💡",
    "/en/": "Original💡",
  },
  tag: {
    "/zh/": "标签🏷",
    "/en/": "Tags🏷",
  },
  views: {
    "/zh/": "访问量🔢",
    "/en/": "Page views🔢",
  },
  category: {
    "/zh/": "分类🌈",
    "/en/": "Category🌈",
  },
  readingTime: {
    "/zh/": "阅读时间⌛",
    "/en/": "Reading Time⌛",
  },
  words: {
    "/zh/": "字数🔠",
    "/en/": "Words🔠",
  },
};

/** 自定义容器插件 */
const containerConfig: Record<string, Record<string, string>> = {
  info: {
    "/zh/": "相关信息",
    "/en/": "Info",
  },
  tip: {
    "/zh/": "提示",
    "/en/": "Tips",
  },
  warning: {
    "/zh/": "注意",
    "/en/": "Note",
  },
  danger: {
    "/zh/": "警告",
    "/en/": "Warning",
  },
  detail: {
    "/zh/": "详情",
    "/en/": "Detail",
  },
};

const copyCodeConfig: Record<string, Record<string, string>> = {
  copy: {
    "/zh/": "复制成功 🎉",
    "/en/": "Copy successfully 🎉",
  },
  hint: {
    "/zh/": "复制代码",
    "/en/": "Copy the code",
  },
};

const pwaConfig: Record<string, string> = {
  "/zh/": "发现新内容可用",
  "/en/": "New content is available.",
};

const readingTimeConfig: Record<string, Record<string, string>> = {
  word: {
    "/zh/": "约 $word 字",
    "/en/": "About $word words",
  },
  minute: {
    "/zh/": "小于 1 分钟",
    "/en/": "Less than 1 minute",
  },
  time: {
    "/zh/": "大约 $time 分钟",
    "/en/": "About $time min",
  },
};

/** 插件配置 */
export const config = {
  container: containerConfig,
  copyCode: copyCodeConfig,
  pageInfo: pageInfoConfig,
  pwa: pwaConfig,
  readingTime: readingTimeConfig,
};
