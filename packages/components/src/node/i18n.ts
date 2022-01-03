import type { HopeLangPath } from "@mr-hope/vuepress-shared";
import type { ComponentI18nConfig } from "../types";

export const i18n: Record<HopeLangPath, ComponentI18nConfig> = {
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
  "/de/": {
    backToTop: "Zurück nach oben.",
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
    pagination: {
      prev: "Bài kế",
      next: "Bài trước",
      navigate: "Đi đến",
      button: "Đi",
      errorText: "Xin hãy nhập 1 số từ 1 đến $page !",
    },
  },
  "/uk/": {
    backToTop: "Повернутися до початку",
    pagination: {
      prev: "Попередня",
      next: "Далі",
      navigate: "Перейти до",
      button: "Перейти",
      errorText: "Будь ласка, введіть число від 1 до $page !",
    },
  },
  "/ru/": {
    backToTop: "Вернуться к началу",
    pagination: {
      prev: "Предыдущая",
      next: "Далее",
      navigate: "Перейти к",
      button: "Перейти",
      errorText: "Пожалуйста, введите число от 1 до $page !",
    },
  },
  "/br/": {
    backToTop: "Volta ao topo",
    pagination: {
      prev: "Anterior",
      next: "Próximo",
      navigate: "Pular para",
      button: "Ir",
      errorText: "Por favor, digite um número entre 1 e $page !",
    },
  },
};
