import { getLocales } from "@mr-hope/vuepress-shared";
import { containerPlugin } from "@vuepress/plugin-container";
import {
  chartRender,
  echartsRender,
  normalDemoRender,
  getDetailsRender,
  vueDemoRender,
  reactDemoRender,
} from "./markdown-it";
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

  if (markdownOptions.align || markdownOptions.enableAll)
    ["left", "center", "right", "justify"].forEach((type) =>
      app.use(containerPlugin({ type }))
    );

  if (markdownOptions.codegroup || markdownOptions.enableAll) {
    app.use(
      containerPlugin({
        type: "code-group",
        before: () => `<CodeGroup>\n`,
        after: () => "</CodeGroup>\n",
      })
    );

    app.use(
      containerPlugin({
        type: "code-group-item",
        before: (info: string): string => {
          const isActive = info.split(":").pop() === "active";

          return `<CodeGroupItem title="${
            isActive ? info.replace(/:active$/, "") : info
          }"${isActive ? " active" : ""}>\n`;
        },
        after: () => "</CodeGroupItem>\n",
      })
    );
  }

  if (markdownOptions.chart || markdownOptions.enableAll)
    app.use(containerPlugin({ type: "chart", render: chartRender }));

  if (markdownOptions.echarts || markdownOptions.enableAll)
    app.use(containerPlugin({ type: "echarts", render: echartsRender }));

  if (markdownOptions.demo || markdownOptions.enableAll) {
    app.use(containerPlugin({ type: "normal-demo", render: normalDemoRender }));
    app.use(containerPlugin({ type: "vue-demo", render: vueDemoRender }));
    app.use(containerPlugin({ type: "react-demo", render: reactDemoRender }));
  }

  if (markdownOptions.vpre || markdownOptions.enableAll)
    app.use(
      containerPlugin({
        type: "v-pre",
        before: () => `<div v-pre>\n`,
        after: () => "</div>\n",
      })
    );
};
