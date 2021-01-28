import type { LangPaths } from "@mr-hope/vuepress-shared";
import type { ComponentI18nConfig } from "../types";

export const i18n: Record<LangPaths, ComponentI18nConfig> = {
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
