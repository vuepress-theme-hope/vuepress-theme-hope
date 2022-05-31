import { ensureEndingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { MarkdownEnhanceOptions, RevealPlugin } from "../shared";

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

export const prepareConfigFile = async (
  app: App,
  options: MarkdownEnhanceOptions,
  legacy = false
): Promise<string> => {
  let configImport = "";
  let enhance = "";

  const getStatus = (key: keyof MarkdownEnhanceOptions, gfm = false): boolean =>
    key in options
      ? Boolean(options[key])
      : gfm && "gfm" in options
      ? Boolean(options.gfm)
      : options.enableAll || false;

  if (getStatus("chart")) {
    configImport += `import ChartJS from "${CLIENT_FOLDER}components/ChartJS";\n`;
    enhance += `app.component("ChartJS", ChartJS);\n`;
  }

  if (getStatus("echarts")) {
    configImport += `import ECharts from "${CLIENT_FOLDER}components/ECharts";\n`;
    enhance += `app.component("ECharts", ECharts);\n`;
  }

  if (getStatus("demo")) {
    configImport += `import CodeDemo from "${CLIENT_FOLDER}components/CodeDemo";\n`;
    enhance += `app.component("CodeDemo", CodeDemo);\n`;
  }

  if (getStatus("codetabs")) {
    configImport += `import CodeTabs from "${CLIENT_FOLDER}components/CodeTabs";\n`;
    enhance += `app.component("CodeTabs", CodeTabs);\n`;

    // TODO: Remove it in v2 stable
    if (legacy) {
      configImport += `import { CodeGroup, CodeGroupItem } from "${CLIENT_FOLDER}compact";\n`;
      enhance += `app.component("CodeGroup", CodeGroup);\n`;
      enhance += `app.component("CodeGroupItem", CodeGroupItem);\n`;
    }
  }

  if (getStatus("flowchart")) {
    configImport += `import FlowChart from "${CLIENT_FOLDER}components/FlowChart";\n`;
    enhance += `app.component("FlowChart", FlowChart);\n`;
  }

  if (getStatus("mermaid")) {
    configImport += `import Mermaid from "${CLIENT_FOLDER}components/Mermaid";\n`;
    enhance += `app.component("Mermaid", Mermaid);\n`;
  }

  if (getStatus("presentation")) {
    configImport += `import Presentation from "${CLIENT_FOLDER}components/Presentation";\n`;
    enhance += `app.component("Presentation", Presentation);\n`;
  }

  if (getStatus("container"))
    configImport += `import "${CLIENT_FOLDER}styles/container/index.scss";\n`;

  if (getStatus("footnote"))
    configImport += `import "${CLIENT_FOLDER}styles/footnote.scss";\n`;

  if (getStatus("imageMark"))
    configImport += `import "${CLIENT_FOLDER}styles/image-mark.scss";\n`;

  if (getStatus("tabs")) {
    configImport += `import Tabs from "${CLIENT_FOLDER}components/Tabs";\n`;
    enhance += `app.component("Tabs", Tabs);\n`;
  }

  if (getStatus("tasklist"))
    configImport += `import "${CLIENT_FOLDER}styles/tasklist.scss";\n`;

  if (getStatus("tex"))
    configImport += `import "${CLIENT_FOLDER}styles/tex.scss";\n`;

  return app.writeTemp(
    `md-enhance/config.js`,
    `import { defineClientConfig } from "@vuepress/client";
${configImport}

export default defineClientConfig({
  enhance: ({ app }) => {
${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  }
});`
  );
};

export const prepareRevealPluginFile = async (
  app: App,
  revealPlugins: RevealPlugin[]
): Promise<void> => {
  const packages = [
    "reveal",
    "revealMarkdown",
    ...revealPlugins.map(
      (key) => `reveal${key[0].toUpperCase()}${key.substring(1)}`
    ),
  ];

  await app.writeTemp(
    "md-enhance/reveal.js",
    `import { ${packages.join(", ")} } from "${CLIENT_FOLDER}reveal";

export const useReveal = () => [${packages
      .map((name) => `${name}()`)
      .join(", ")}
];`
  );
};
