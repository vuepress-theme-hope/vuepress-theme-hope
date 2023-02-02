import { createRequire } from "node:module";

import { type App } from "@vuepress/core";
import { path } from "@vuepress/utils";

import { type MarkdownEnhanceOptions } from "../options.js";
import { CLIENT_FOLDER } from "../utils.js";

const require = createRequire(import.meta.url);

export const prepareConfigFile = async (
  app: App,
  options: MarkdownEnhanceOptions,
  legacy = true
): Promise<string> => {
  let configImport = "";
  let enhance = "";

  const getStatus = (key: keyof MarkdownEnhanceOptions, gfm = false): boolean =>
    key in options
      ? Boolean(options[key])
      : (gfm && "gfm" in options && options.gfm) || false;

  if (getStatus("chart")) {
    configImport += `\
import ChartJS from "${CLIENT_FOLDER}components/ChartJS.js";
`;
    enhance += `\
app.component("ChartJS", ChartJS);
`;
  }

  if (getStatus("codetabs")) {
    configImport += `\
import CodeTabs from "${CLIENT_FOLDER}components/CodeTabs.js";
`;
    enhance += `\
app.component("CodeTabs", CodeTabs);
`;

    // TODO: Remove this in v2 stable
    if (legacy) {
      configImport += `\
import { hasGlobalComponent } from "${path.resolve(
        require.resolve("vuepress-shared/client")
      )}";
import { CodeGroup, CodeGroupItem } from "${CLIENT_FOLDER}compact/index.js";
`;
      enhance += `\
if(!hasGlobalComponent("CodeGroup", app))
  app.component("CodeGroup", CodeGroup);
if(!hasGlobalComponent("CodeGroupItem", app))
  app.component("CodeGroupItem", CodeGroupItem);
`;
    }
  }

  if (getStatus("container"))
    configImport += `\
import "${CLIENT_FOLDER}styles/container/index.scss";
`;

  if (getStatus("demo")) {
    configImport += `\
import CodeDemo from "${CLIENT_FOLDER}components/CodeDemo.js";
`;
    enhance += `\
app.component("CodeDemo", CodeDemo);
`;
  }

  if (getStatus("echarts")) {
    configImport += `\
import ECharts from "${CLIENT_FOLDER}components/ECharts.js";
`;
    enhance += `\
app.component("ECharts", ECharts);
`;
  }

  if (getStatus("figure", true))
    configImport += `\
import "${CLIENT_FOLDER}styles/figure.scss";
`;

  if (getStatus("flowchart")) {
    configImport += `\
import FlowChart from "${CLIENT_FOLDER}components/FlowChart.js";
`;
    enhance += `\
app.component("FlowChart", FlowChart);
`;
  }

  if (getStatus("footnote", true))
    configImport += `\
import "${CLIENT_FOLDER}styles/footnote.scss";
`;

  if (getStatus("imgMark", true))
    configImport += `\
import "${CLIENT_FOLDER}styles/image-mark.scss";
`;

  if (getStatus("mermaid")) {
    configImport += `\
import Mermaid from "${CLIENT_FOLDER}components/Mermaid.js";
`;
    enhance += `\
app.component("Mermaid", Mermaid);
`;
  }

  if (getStatus("presentation")) {
    configImport += `\
import Presentation from "${CLIENT_FOLDER}components/Presentation.js";
`;
    enhance += `\
app.component("Presentation", Presentation);
`;
  }

  if (getStatus("playground")) {
    configImport += `\
import Playground from "${CLIENT_FOLDER}components/Playground.js";
`;
    enhance += `\
app.component("Playground", Playground);
`;
  }

  if (getStatus("tabs")) {
    configImport += `\
import Tabs from "${CLIENT_FOLDER}components/Tabs.js";
`;
    enhance += `\
app.component("Tabs", Tabs);
`;
  }

  if (getStatus("tasklist", true))
    configImport += `\
import "${CLIENT_FOLDER}styles/tasklist.scss";
`;

  if (getStatus("katex"))
    configImport += `\
import "${CLIENT_FOLDER}styles/katex.scss";
`;

  if (getStatus("vuePlayground")) {
    configImport += `\
import { defineAsyncComponent } from "vue";
`;
    enhance += `\
app.component("VuePlayground", defineAsyncComponent(() => import("${CLIENT_FOLDER}components/VuePlayground.js")));
    `;
  }

  if (getStatus("mathjax"))
    configImport += `\
import "./mathjax.css";
`;

  return app.writeTemp(
    `md-enhance/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
${configImport}

export default defineClientConfig({
  enhance: ({ app }) => {
${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
});
`
  );
};
