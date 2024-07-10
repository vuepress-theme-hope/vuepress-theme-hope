import { select } from "@inquirer/prompts";

import { en } from "./en.js";
import type { CreateLocale, SupportedLang } from "./typings.js";
import { zh } from "./zh.js";

export * from "./typings.js";

const i18n: Record<SupportedLang, CreateLocale> = { en, zh };

interface LanguageResult {
  lang: SupportedLang;
  locale: CreateLocale;
}

export const getLanguage = async (): Promise<LanguageResult> => {
  const language = await select<SupportedLang>({
    message: "Select a language to display / 选择显示语言",
    choices: [
      { name: "English", value: "en" },
      { name: "简体中文", value: "zh" },
    ],
  });

  return {
    lang: language,
    locale: i18n[language],
  };
};
