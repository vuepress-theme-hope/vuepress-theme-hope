import type { LangPaths } from "@mr-hope/vuepress-shared";
import type { CopyCodeI18NConfig } from "../types";

/** Muti language config for copy code */
export const i18n: Record<LangPaths, CopyCodeI18NConfig> = {
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
