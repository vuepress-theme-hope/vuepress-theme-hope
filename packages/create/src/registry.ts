import { execaCommandSync } from "execa";
import inquirer from "inquirer";

import { bin } from "./bin";

import type { Lang } from "./i18n";

export interface RegistryAnswer {
  registry: "国内镜像源" | "当前源";
}

const npmmirrorRegistry = "https://registry.npmmirror.com/";

const getUserRegistry = (): string =>
  execaCommandSync(`${bin} config get registry`).stdout;

export const getRegistry = async (lang: Lang): Promise<string> => {
  const userRegistry = getUserRegistry();

  if (lang === "简体中文") {
    const { registry } = await inquirer.prompt<RegistryAnswer>([
      {
        name: "registry",
        type: "list",
        message: "选择你想使用的源",
        choices: ["国内镜像源", "当前源"],
      },
    ]);

    return registry === "国内镜像源" ? npmmirrorRegistry : userRegistry;
  }

  return userRegistry;
};
