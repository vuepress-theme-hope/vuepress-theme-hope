import type { HopeLangPath } from "@mr-hope/vuepress-shared";

export type ContainerName = "info" | "tip" | "warning" | "danger" | "detail";

export const i18n: Record<ContainerName, Record<HopeLangPath, string>> = {
  info: {
    "/zh/": "相关信息",
    "/en/": "Info",
    "/de/": "Information",
    "/vi/": "Thông tin",
    "/uk/": "Інформація",
    "/ru/": "Информация",
  },
  tip: {
    "/zh/": "提示",
    "/en/": "Tips",
    "/de/": "Tips",
    "/vi/": "Tips",
    "/uk/": "Поради",
    "/ru/": "Подсказки",
  },
  warning: {
    "/zh/": "注意",
    "/en/": "Note",
    "/de/": "Notiz",
    "/vi/": "Lưu ý",
    "/uk/": "Примітка",
    "/ru/": "Примечание",
  },
  danger: {
    "/zh/": "警告",
    "/en/": "Warning",
    "/de/": "Warnung",
    "/vi/": "Cẩn thận",
    "/uk/": "Увага",
    "/ru/": "Предупреждение",
  },
  detail: {
    "/zh/": "详情",
    "/en/": "Detail",
    "/de/": "Details",
    "/vi/": "Chi tiết",
    "/uk/": "Деталь",
    "/ru/": "Деталь",
  },
};
