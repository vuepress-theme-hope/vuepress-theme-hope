import { PluginConfig, ThemeConfig } from "@mr-hope/vuepress-types";
import { MarkdownEnhanceOption } from "../types";
import { i18n } from "@mr-hope/vuepress-shared-utils";

const pluginConfig = (
  markdownOption: MarkdownEnhanceOption,
  themeConfig: ThemeConfig
): PluginConfig[] => {
  /** i18n config */
  const containerConfig = i18n.config.container;
  const baseLang = markdownOption.baseLang || themeConfig.baseLang || "zh-CN";
  const baseLangPath = i18n.lang2path(baseLang);

  const resolveConfig = (
    titleConfig: Record<string, string>
  ): Record<string, string> => {
    titleConfig["/"] = titleConfig[baseLangPath];

    return titleConfig;
  };

  const config: PluginConfig[] = [
    /** typescript support */
    ["typescript"],
    [
      "container",
      { type: "tip", defaultTitle: resolveConfig(containerConfig.tip) },
    ],
    [
      "container",
      { type: "warning", defaultTitle: resolveConfig(containerConfig.warning) },
    ],
    [
      "container",
      { type: "danger", defaultTitle: resolveConfig(containerConfig.danger) },
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
      ["container", { type: "right", defaultTitle: "" }]
    );

  return config;
};

export default pluginConfig;
