import {
  ComponentI18NConfig,
  CopyCodeI18NConfig,
  HopeLangI18nConfig,
  PageInfoI18nConfig,
  PWAI18NConfig,
  ReadingTimeI18NConfig,
} from "../../types";

/** Types for supported lang codes */
export type Langs = "zh-CN" | "en-US" | "vi-VN";

/** Types for supported lang paths */
export type LangPaths = "/zh/" | "/en/" | "/vi/";

/** Supported lang codes */
export const langs: Langs[] = ["zh-CN", "en-US", "vi-VN"];

/** Lang to pat convert */
export const lang2PathConfig: Record<Langs, LangPaths> = {
  "zh-CN": "/zh/",
  "en-US": "/en/",
  "vi-VN": "/vi/",
};

/** Path to lang convert */
export const path2langConfig: Record<LangPaths, Langs> = {
  "/zh/": "zh-CN",
  "/en/": "en-US",
  "/vi/": "vi-VN",
};

/** Muti language config */
export const localesConfig: Record<Langs, HopeLangI18nConfig> = {
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
    },
  },
};

export type PluginI18nConfig<T> = Record<LangPaths, T> & { "/"?: T };

/** Muti language config for Page Info */
const pageInfoConfig: PluginI18nConfig<PageInfoI18nConfig> = {
  "/zh/": {
    author: "作者🖊",
    time: "写作日期📅",
    origin: "原创💡",
    views: "访问量🔢",
    category: "分类🌈",
    tag: "标签🏷",
    readingTime: "阅读时间⌛",
    words: "字数🔠",
  },
  "/en/": {
    author: "Author🖊",
    time: "Writing Date📅",
    origin: "Original💡",
    views: "Page views🔢",
    category: "Category🌈",
    tag: "Tags🏷",
    readingTime: "Reading Time⌛",
    words: "Words🔠",
  },
  "/vi/": {
    author: "Người viết🖊",
    time: "Ngày viết📅",
    origin: "Nguồn💡",
    views: "Views của trang🔢",
    category: "Category🌈",
    tag: "Tags🏷",
    readingTime: "Thời gian đọc⌛",
    words: "Words🔠",
  },
};

/** Muti language config for components */
const componentConfig: PluginI18nConfig<ComponentI18NConfig> = {
  "/zh/": {
    backToTop: "返回顶部",
    pagination: {
      prev: "上一页",
      next: "下一页",
      navigate: "跳转到",
      button: "前往",
      errorText: "请输入 1 到 $page 之前的页码！",
    },
  },
  "/en/": {
    backToTop: "Back to top",
    pagination: {
      prev: "Prev",
      next: "Next",
      navigate: "Jump to",
      button: "Go",
      errorText: "Please enter a number between 1 and $page !",
    },
  },
  "/vi/": {
    backToTop: "Trở lại đầu trang",
    pagination: {
      prev: "Bài kế",
      next: "Bài trước",
      navigate: "Đi đến",
      button: "Đi",
      errorText: "Xin hãy nhập 1 số từ 1 đến $page !",
    },
  },
};

/** Muti language config for markdown containers */
const containerConfig: Record<string, PluginI18nConfig<string>> = {
  info: {
    "/zh/": "相关信息",
    "/en/": "Info",
    "/vi/": "Thông tin",
  },
  tip: {
    "/zh/": "提示",
    "/en/": "Tips",
    "/vi/": "Tips",
  },
  warning: {
    "/zh/": "注意",
    "/en/": "Note",
    "/vi/": "Lưu ý",
  },
  danger: {
    "/zh/": "警告",
    "/en/": "Warning",
    "/vi/": "Cẩn thận",
  },
  detail: {
    "/zh/": "详情",
    "/en/": "Detail",
    "/vi/": "Chi tiết",
  },
};

/** Muti language config for copy code */
const copyCodeConfig: PluginI18nConfig<CopyCodeI18NConfig> = {
  "/zh/": {
    copy: "复制成功 🎉",
    hint: "复制代码",
  },
  "/en/": {
    copy: "Copy successfully 🎉",
    hint: "Copy the code",
  },
  "/vi/": {
    copy: "Sao chép thành công 🎉",
    hint: "Sao chép code",
  },
};

/** Muti language config for pwa popup */
const pwaConfig: PluginI18nConfig<PWAI18NConfig> = {
  "/zh/": {
    install: "安装",
    iOSInstall: "点击分享按钮然后点击“添加到主屏幕”",
    cancel: "取消",
    desc: "详情",
    feature: "主要特色",
    explain:
      "该应用可以安装在您的 PC 或移动设备上。这将使该 Web 应用程序外观和行为与其他应用程序相同。它将在出现在应用程序列表中，并可以固定到主屏幕，开始菜单或任务栏。此 Web 应用程序还将能够与其他应用程序和您的操作系统安全地进行交互。",
    update: "发现新内容可用",
  },
  "/en/": {
    install: "Install",
    iOSInstall: "Tap the share button and then 'Add to Homescreen'",
    cancel: "Cancel",
    desc: "Description",
    feature: "Key Features",
    explain:
      "This app can be installed on your PC or mobile device.  This will allow this web app to look and behave like any other installed app.  You will find it in your app lists and be able to pin it to your home screen, start menus or task bars.  This installed web app will also be able to safely interact with other apps and your operating system. ",
    update: "New content is available.",
  },
  "/vi/": {
    install: "Tải về",
    iOSInstall: "Nhấn vào nút chia sẻ và sau đó 'Thêm vào Màn hình chính'",
    cancel: "Huỷ bỏ",
    desc: "Sự miêu tả",
    feature: "Các tính năng chính",
    explain:
      "Ứng dụng này có thể được cài đặt trên PC hoặc thiết bị di động của bạn. Điều này sẽ cho phép ứng dụng web này trông và hoạt động giống như bất kỳ ứng dụng đã cài đặt nào khác. Bạn sẽ tìm thấy nó trong danh sách ứng dụng của mình và có thể ghim nó vào màn hình chính, menu bắt đầu hoặc thanh tác vụ. Ứng dụng web đã cài đặt này cũng sẽ có thể tương tác an toàn với các ứng dụng khác và hệ điều hành của bạn.",
    update: "Đã có nội dung mới",
  },
};

/** Muti language config for reading time plugin */
const readingTimeConfig: PluginI18nConfig<ReadingTimeI18NConfig> = {
  "/zh/": {
    word: "约 $word 字",
    minute: "小于 1 分钟",
    time: "大约 $time 分钟",
  },
  "/en/": {
    word: "About $word words",
    minute: "Less than 1 minute",
    time: "About $time min",
  },
  "/vi/": {
    word: "Khoảng $word từ",
    minute: "Ít hơn 1 phút",
    time: "Khoảng $time phút",
  },
};

/** Muti language config for valine */
const valineConfig: PluginI18nConfig<string> = {
  "/zh/": "请留言",
  "/en/": "Write a comment here",
  "/vi/": "Để lại bình luận",
};

/** Muti language config for plugins */
export const config = {
  container: containerConfig,
  component: componentConfig,
  copyCode: copyCodeConfig,
  pageInfo: pageInfoConfig,
  pwa: pwaConfig,
  readingTime: readingTimeConfig,
  valine: valineConfig,
};
