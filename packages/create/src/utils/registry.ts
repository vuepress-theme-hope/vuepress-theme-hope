import { select } from "@inquirer/prompts";
import { execaCommandSync } from "execa";

import type { PackageManager } from "../config/index.js";
import type { SupportedLang } from "../i18n/index.js";

const NPM_MIRROR_REGISTRY = "https://registry.npmmirror.com/";

const getUserRegistry = (
  packageManager: PackageManager,
  isYarnModern: boolean,
): string =>
  execaCommandSync(
    `${packageManager} config get ${
      isYarnModern ? "npmRegistryServer" : "registry"
    }`,
  ).stdout;

export const getRegistry = async (
  packageManager: PackageManager,
  lang: SupportedLang,
): Promise<string> => {
  const isYarnModern =
    packageManager === "yarn" &&
    !execaCommandSync("yarn --version").stdout.startsWith("1");

  const userRegistry = getUserRegistry(packageManager, isYarnModern);

  if (/https:\/\/registry\.npm\.taobao\.org\/?/.test(userRegistry)) {
    console.error(
      "npm.taobao.org is no longer available, resetting it to npmmirror.com",
    );

    execaCommandSync(
      `${packageManager} config set ${
        isYarnModern ? "npmRegistryServer" : "registry"
      } ${NPM_MIRROR_REGISTRY}`,
    );
  }

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
