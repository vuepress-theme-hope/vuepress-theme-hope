import { getLocales } from "@mr-hope/vuepress-shared";
import { chartRender, codeDemoRender, getDetailsRender } from "./markdown-it";
import { markdownEnhanceLocales } from "./locales";

import type { ContainerPluginOptions } from "@vuepress/plugin-container";
import type { App, LocaleConfig } from "@vuepress/core";
import type { MarkdownContainerName, MarkdownEnhanceOptions } from "../shared";

export const usePlugins = (
  app: App,
  markdownOptions: MarkdownEnhanceOptions
): void => {
  const locales = getLocales(
    app,
    markdownEnhanceLocales,
    markdownOptions.locales
  );

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

  if (markdownOptions.codegroup || markdownOptions.enableAll) {
    app.use("@vuepress/container", {
      type: "code-group",
      before: () => `<CodeGroup>\n`,
      after: () => "</CodeGroup>\n",
    });

    app.use("@vuepress/container", {
      type: "code-group-item",
      before: (info: string): string => {
        const isActive = info.split(":").pop() === "active";

        return `<CodeGroupItem title="${
          isActive ? info.replace(/:active$/, "") : info
        }"${isActive ? " active" : ""}>\n`;
      },
      after: () => "</CodeGroupItem>\n",
    });
  }

  if (markdownOptions.chart || markdownOptions.enableAll)
    app.use("@vuepress/container", {
      type: "chart",
      render: chartRender,
    });

  if (markdownOptions.demo || markdownOptions.enableAll)
    app.use("@vuepress/container", {
      type: "demo",
      render: codeDemoRender,
    });

  if (markdownOptions.vpre || markdownOptions.enableAll)
    app.use("@vuepress/container", {
      type: "v-pre",
      before: () => `<div v-pre>\n`,
      after: () => "</div>\n",
    });
};
