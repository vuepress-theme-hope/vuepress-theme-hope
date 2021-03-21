import { sync } from "execa";
import { prompt } from "inquirer";

import type { Lang } from "./i18n";

export interface RegistryAnswer {
  registry: "淘宝源" | "当前源";
}

const taobaoRegistry = "https://registry.npm.taobao.org/";

const getUserRegistry = (bin: string): string =>
  sync(bin ? "yarn" : "npm", ["config", "get", "registry"]).stdout;

export const getRegistry = async (lang: Lang, bin: string): Promise<string> => {
  const userRegistry = getUserRegistry(bin);

  if (lang === "en-US" || userRegistry === taobaoRegistry) return userRegistry;

  const { registry } = await prompt<RegistryAnswer>([
    {
      name: "registry",
      type: "list",
      message: "选择你想使用的源",
      choices: ["淘宝源", "当前源"],
    },
  ]);

  return registry === "淘宝源" ? taobaoRegistry : userRegistry;
};
