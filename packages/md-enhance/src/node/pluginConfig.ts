import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { codeDemoRender } from "./markdown-it/code-demo";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Context, PluginConfig } from "@mr-hope/vuepress-types";
import type { MarkdownEnhanceOptions } from "../types";

export const pluginConfig = (
  markdownOption: MarkdownEnhanceOptions,
  context: Context
): PluginConfig[] => {
  const rootLangPath = getRootLangPath(context);

  const resolveConfig = (
    titleConfig: PluginI18nConvert<string>
  ): PluginI18nConvert<string> => {
    titleConfig["/"] = titleConfig[rootLangPath];

    return titleConfig;
  };

  const config: PluginConfig[] = [
    ["container", { type: "info", defaultTitle: resolveConfig(i18n.info) }],
    ["container", { type: "tip", defaultTitle: resolveConfig(i18n.tip) }],
    [
      "container",
      { type: "warning", defaultTitle: resolveConfig(i18n.warning) },
    ],
    ["container", { type: "danger", defaultTitle: resolveConfig(i18n.danger) }],
    [
      "container",
      {
        type: "details",
        before: (info: string): string =>
          `<details class="custom-block details"><summary>${
            info || "Details"
          }</summary>\n`,
        after: (): string => "</details>\n",
      },
    ],
  ];

  if (markdownOption.align || markdownOption.enableAll)
    config.push(
      ["container", { type: "left", defaultTitle: "" }],
      ["container", { type: "center", defaultTitle: "" }],
      ["container", { type: "right", defaultTitle: "" }],
      ["container", { type: "justify", defaultTitle: "" }]
    );

  if (markdownOption.demo || markdownOption.enableAll)
    config.push(["container", { type: "demo", render: codeDemoRender }]);

  return config;
};
