import { execaCommandSync } from "execa";
import inquirer from "inquirer";

import { type Lang } from "./config/i18n.js";
import { type PackageManager } from "./utils/index.js";

export interface RegistryAnswer {
  registry: "国内镜像源" | "当前源";
}

const npmmirrorRegistry = "https://registry.npmmirror.com/";

const getUserRegistry = (packageManager: PackageManager): string =>
  execaCommandSync(`${packageManager} config get registry`).stdout;

export const getRegistry = async (
  packageManager: PackageManager,
  lang: Lang
): Promise<string> => {
  const userRegistry = getUserRegistry(packageManager);

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
