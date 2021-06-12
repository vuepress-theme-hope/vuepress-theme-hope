import type { ComponentLocaleConfig } from "../shared";

export const i18n: ComponentLocaleConfig = {
  "/zh/": {
    backToTop: "返回顶部",
    openInNewWindow: "在新窗口中打开",
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
    openInNewWindow: "Open in new window",
    pagination: {
      prev: "Prev",
      next: "Next",
      navigate: "Jump to",
      button: "Go",
      errorText: "Please enter a number between 1 and $page !",
    },
  },
  "/de/": {
    backToTop: "Zurück nach oben.",
    openInNewWindow: "In einem neuen Fenster öffnen",
    pagination: {
      prev: "Vorheriges",
      next: "Nächstes",
      navigate: "Springe zu",
      button: "Los",
      errorText: "Bitte gib eine Nummer zwischen 1 und $page ein!",
    },
  },
  "/vi/": {
    backToTop: "Trở lại đầu trang",
    openInNewWindow: "Mở trong cửa sổ mới",
    pagination: {
      prev: "Bài kế",
      next: "Bài trước",
      navigate: "Đi đến",
      button: "Đi",
      errorText: "Xin hãy nhập 1 số từ 1 đến $page !",
    },
  },
};
