import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { MarkdownEnhanceOptions, RevealPlugin } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);
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
      : (gfm && "gfm" in options && options.gfm) || false;

  if (getStatus("chart")) {
    configImport += `import ChartJS from "${CLIENT_FOLDER}components/ChartJS.js";\n`;
    enhance += `app.component("ChartJS", ChartJS);\n`;
  }

  if (getStatus("codetabs")) {
    configImport += `import CodeTabs from "${CLIENT_FOLDER}components/CodeTabs.js";\n`;
    enhance += `app.component("CodeTabs", CodeTabs);\n`;

    // TODO: Remove it in v2 stable
    if (legacy) {
      configImport += `import { CodeGroup, CodeGroupItem } from "${CLIENT_FOLDER}compact/index.js";\n`;
      enhance += `app.component("CodeGroup", CodeGroup);\n`;
      enhance += `app.component("CodeGroupItem", CodeGroupItem);\n`;
    }
  }

  if (getStatus("container"))
    configImport += `import "${CLIENT_FOLDER}styles/container/index.scss";\n`;

  if (getStatus("demo")) {
    configImport += `import CodeDemo from "${CLIENT_FOLDER}components/CodeDemo.js";\n`;
    enhance += `app.component("CodeDemo", CodeDemo);\n`;
  }

  if (getStatus("echarts")) {
    configImport += `import ECharts from "${CLIENT_FOLDER}components/ECharts.js";\n`;
    enhance += `app.component("ECharts", ECharts);\n`;
  }

  if (getStatus("flowchart")) {
    configImport += `import FlowChart from "${CLIENT_FOLDER}components/FlowChart.js";\n`;
    enhance += `app.component("FlowChart", FlowChart);\n`;
  }

  if (getStatus("footnote", true))
    configImport += `import "${CLIENT_FOLDER}styles/footnote.scss";\n`;

  if (getStatus("imageMark", true))
    configImport += `import "${CLIENT_FOLDER}styles/image-mark.scss";\n`;

  if (getStatus("mermaid")) {
    configImport += `import Mermaid from "${CLIENT_FOLDER}components/Mermaid.js";\n`;
    enhance += `app.component("Mermaid", Mermaid);\n`;
  }

  if (getStatus("presentation")) {
    configImport += `import Presentation from "${CLIENT_FOLDER}components/Presentation.js";\n`;
    enhance += `app.component("Presentation", Presentation);\n`;
  }

  if (getStatus("playground")) {
    configImport += `import Playground from "${CLIENT_FOLDER}components/Playground.js";\n`;
    enhance += `app.component("Playground", Playground);\n`;
  }

  if (getStatus("tabs")) {
    configImport += `import Tabs from "${CLIENT_FOLDER}components/Tabs.js";\n`;
    enhance += `app.component("Tabs", Tabs);\n`;
  }

  if (getStatus("tasklist", true))
    configImport += `import "${CLIENT_FOLDER}styles/tasklist.scss";\n`;

  if (getStatus("katex"))
    configImport += `import "${CLIENT_FOLDER}styles/katex.scss";\n`;
  else if (getStatus("mathjax"))
    configImport += `import "${CLIENT_FOLDER}styles/mathjax.scss";\n`;

  if (getStatus("vuePlayground"))
    enhance += `const VuePlayground = defineAsyncComponent(() => import("${CLIENT_FOLDER}components/VuePlayground.js"));\napp.component("VuePlayground", VuePlayground);\n`;

  return app.writeTemp(
    `md-enhance/config.js`,
    `import { defineClientConfig } from "@vuepress/client";
    import { defineAsyncComponent } from "vue";
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
    `import { ${packages.join(", ")} } from "${CLIENT_FOLDER}reveal/index.js";

export const useReveal = () => [${packages
      .map((name) => `${name}()`)
      .join(", ")}
];`
  );
};
