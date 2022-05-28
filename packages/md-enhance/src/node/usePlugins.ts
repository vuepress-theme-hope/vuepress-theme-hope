import { containerPlugin } from "@vuepress/plugin-container";
import { getLocales } from "vuepress-shared";

import { getDetailsRender } from "./markdown-it";
import { markdownEnhanceLocales } from "./locales";

import type { App, LocaleConfig } from "@vuepress/core";
import type { MarkdownContainerName, MarkdownEnhanceOptions } from "../shared";

export const usePlugins = (
  app: App,
  markdownOptions: MarkdownEnhanceOptions
): void => {
  const locales = getLocales({
    app,
    name: "md-enhance",
    default: markdownEnhanceLocales,
    config: markdownOptions.locales,
  });

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

  if (markdownOptions.container || markdownOptions.enableAll) {
    const containers: MarkdownContainerName[] = [
      "info",
      "note",
      "tip",
      "warning",
      "danger",
    ];

    containers.forEach((type) =>
      app.use(containerPlugin({ type, locales: getContainterLocale(type) }))
    );

    app.use(
      containerPlugin({
        type: "details",
        render: getDetailsRender(getContainterLocale("details")),
      })
    );
  }
};
