import type { HopeLangPath } from "@mr-hope/vuepress-shared";

export type ContainerName = "info" | "tip" | "warning" | "danger" | "detail";

export const i18n: Record<ContainerName, Record<HopeLangPath, string>> = {
  info: {
    "/zh/": "相关信息",
    "/en/": "Info",
    "/de/": "Information",
    "/vi/": "Thông tin",
  },
  tip: {
    "/zh/": "提示",
    "/en/": "Tips",
    "/de/": "Tips",
    "/vi/": "Tips",
  },
  warning: {
    "/zh/": "注意",
    "/en/": "Note",
    "/de/": "Notiz",
    "/vi/": "Lưu ý",
  },
  danger: {
    "/zh/": "警告",
    "/en/": "Warning",
    "/de/": "Warnung",
    "/vi/": "Cẩn thận",
  },
  detail: {
    "/zh/": "详情",
    "/en/": "Detail",
    "/de/": "Details",
    "/vi/": "Chi tiết",
  },
};
