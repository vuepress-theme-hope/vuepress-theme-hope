import { execSync, spawnSync } from "node:child_process";

import { select } from "@inquirer/prompts";

import type { PackageManager } from "../config/index.js";
import type { SupportedLang } from "../i18n/index.js";

const NPM_MIRROR_REGISTRY = "https://registry.npmmirror.com/";

const getUserRegistry = (
  packageManager: PackageManager,
  isYarnModern: boolean,
): string =>
  execSync(
    `${packageManager} config get ${
      isYarnModern ? "npmRegistryServer" : "registry"
    }`,
    { encoding: "utf8" },
  ).trim();

export const getRegistry = async (
  packageManager: PackageManager,
  lang: SupportedLang,
): Promise<string> => {
  const isYarnModern =
    packageManager === "yarn" &&
    !spawnSync(`${packageManager} --version`, {
      shell: true,
    })
      .stdout.toString()
      .startsWith("1");

  const userRegistry = getUserRegistry(packageManager, isYarnModern);

  if (lang === "zh") {
    const registry = await select({
      message: "选择你想使用的源",
      choices: ["国内镜像源", "当前源"].map((registry) => ({
        name: registry,
        value: registry,
      })),
    });

    return registry === "国内镜像源" ? NPM_MIRROR_REGISTRY : userRegistry;
  }

  return userRegistry;
};
