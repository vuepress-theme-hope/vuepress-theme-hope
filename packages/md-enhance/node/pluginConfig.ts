import { codeDemoRender } from "./markdown-it/code-demo";

import { PluginConfig, ThemeConfig } from "@mr-hope/vuepress-types";
import { MarkdownEnhanceOptions } from "../types";
import { i18n, lang2path } from "@mr-hope/vuepress-utils";
import { PluginI18nConvert } from "@mr-hope/vuepress-shared";

const pluginConfig = (
  markdownOption: MarkdownEnhanceOptions,
  themeConfig: ThemeConfig
): PluginConfig[] => {
  /** i18n config */
  const { container } = i18n;
  const baseLang = markdownOption.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = lang2path(baseLang);

  const resolveConfig = (
    titleConfig: PluginI18nConvert<string>
  ): PluginI18nConvert<string> => {
    titleConfig["/"] = titleConfig[baseLangPath];

    return titleConfig;
  };

  const config: PluginConfig[] = [
    [
      "container",
      { type: "info", defaultTitle: resolveConfig(container.info) },
    ],
    ["container", { type: "tip", defaultTitle: resolveConfig(container.tip) }],
    [
      "container",
      { type: "warning", defaultTitle: resolveConfig(container.warning) },
    ],
    [
      "container",
      { type: "danger", defaultTitle: resolveConfig(container.danger) },
    ],
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

export default pluginConfig;
