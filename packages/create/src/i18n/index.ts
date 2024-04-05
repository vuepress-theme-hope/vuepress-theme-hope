import inquirer from "inquirer";

import { en } from "./en.js";
import type { CreateLocale, Lang } from "./typings.js";
import { zh } from "./zh.js";

export * from "./typings.js";

const i18n: Record<Lang, CreateLocale> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "english (US)": en,
  简体中文: zh,
};

interface LanguageResult {
  lang: Lang;
  locale: CreateLocale;
}

export const getLanguage = async (): Promise<LanguageResult> => {
  const { language } = await inquirer.prompt<{ language: Lang }>([
    {
      name: "language",
      type: "list",
      message: "Select a language to display / 选择显示语言",
      choices: ["english (US)", "简体中文"],
    },
  ]);

  return {
    lang: language,
    locale: i18n[language],
  };
};
