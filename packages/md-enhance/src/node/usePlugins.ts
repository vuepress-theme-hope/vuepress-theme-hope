import { getLocales } from "@mr-hope/vuepress-shared";
import { codeDemoRender, getDetailsRender } from "./markdown-it";
import { i18n } from "./i18n";

import type { ContainerPluginOptions } from "@vuepress/plugin-container";
import type { App } from "@vuepress/core";
import type { LocaleConfig } from "@vuepress/shared";
import type { MarkdownContainerName, MarkdownEnhanceOptions } from "../shared";

export const usePlugins = (
  app: App,
  markdownOptions: MarkdownEnhanceOptions
): void => {
  const locales = getLocales(app, i18n, markdownOptions.locales);

  const getContainterLocale = (
    key: MarkdownContainerName
  ): LocaleConfig<{
    defaultInfo: string;
  }> =>
    Object.fromEntries(
      Object.keys(locales).map((path) => [
        path,
        { defaultInfo: locales[path][key] },
      ])
    );

  if (markdownOptions.customContainer || markdownOptions.enableAll) {
    const containers: MarkdownContainerName[] = [
      "info",
      "tip",
      "warning",
      "danger",
    ];

    containers.forEach((type) =>
      app.use("@vuepress/container", {
        type,
        locales: getContainterLocale(type),
      } as ContainerPluginOptions)
    );

    app.use("@vuepress/container", {
      type: "details",
      render: getDetailsRender(getContainterLocale("details")),
    } as ContainerPluginOptions);
  }

  if (markdownOptions.align || markdownOptions.enableAll)
    ["left", "center", "right", "justify"].forEach((type) =>
      app.use("@vuepress/container", { type } as ContainerPluginOptions)
    );

  if (markdownOptions.demo || markdownOptions.enableAll)
    app.use("@vuepress/container", {
      type: "demo",
      render: codeDemoRender,
    });
};
