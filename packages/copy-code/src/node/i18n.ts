import type { HopeLangPath } from "@mr-hope/vuepress-shared";
import type { CopyCodeI18nConfig } from "../types";

/** Muti language config for copy code */
export const i18n: Record<HopeLangPath, CopyCodeI18nConfig> = {
  "/zh/": {
    copy: "复制成功 🎉",
    hint: "复制代码",
  },
  "/en/": {
    copy: "Copy successfully 🎉",
    hint: "Copy the code",
  },
  "/de/": {
    copy: "Kopieren erfolgreich 🎉",
    hint: "Kopiere den Code.",
  },
  "/vi/": {
    copy: "Sao chép thành công 🎉",
    hint: "Sao chép code",
  },
  "/uk/": {
    copy: "Скопіюйте успішно 🎉",
    hint: "Скопіюйте код",
  },
  "/ru/": {
    copy: "Скоопировать успешно 🎉",
    hint: "Скопируйте код",
  },
  "/br/": {
    copy: "Copiado com sucesso 🎉",
    hint: "Copiar o código",
  },
};
