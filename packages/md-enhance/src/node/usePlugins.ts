import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { codeDemoRender } from "./markdown-it/code-demo";
import { i18n } from "./i18n";

import type { App } from "@vuepress/core";
import type { LocaleConfig } from "@vuepress/shared";
import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { ContainerName } from "./i18n";
import type { MarkdownEnhanceOptions } from "../shared";

export const usePlugins = (
  app: App,
  markdownOption: MarkdownEnhanceOptions
): void => {
  const resolveConfig = (
    titleConfig: PluginI18nConvert<string>
  ): LocaleConfig<{
    defaultInfo: string;
  }> => {
    const locale: LocaleConfig<{
      defaultInfo: string;
    }> = {};

    for (const key in titleConfig)
      locale[key] = {
        defaultInfo: titleConfig[key as keyof PluginI18nConvert<string>],
      };

    locale["/"] = { defaultInfo: titleConfig[getRootLangPath(app)] };

    return locale;
  };

  if (markdownOption.customContainer) {
    const containers: ContainerName[] = ["info", "tip", "warning", "danger"];

    containers.forEach((type) =>
      app.use("@vuepress/container", {
        type,
        defaultTitle: resolveConfig(i18n[type]),
      })
    );

    app.use("@vuepress/container", {
      type: "details",
      before: (info: string): string =>
        `<details class="custom-block details"><summary>${
          info || "Details"
        }</summary>\n`,
      after: (): string => "</details>\n",
    });
  }

  if (markdownOption.align || markdownOption.enableAll)
    ["left", "center", "right", "justify"].forEach((type) =>
      app.use("@vuepress/container", {
        type,
        defaultTitle: "",
      })
    );

  if (markdownOption.demo || markdownOption.enableAll)
    app.use("@vuepress/container", {
      type: "demo",
      render: codeDemoRender,
    });
};
