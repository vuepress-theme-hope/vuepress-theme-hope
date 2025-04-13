import type { App } from "vuepress/core";

import type { MarkdownEnhancePluginOptions } from "../options.js";
import { CLIENT_FOLDER } from "../utils.js";

export const prepareConfigFile = async (
  app: App,
  options: MarkdownEnhancePluginOptions,
  status: Record<string, boolean>,
): Promise<string> => {
  const imports = new Set<string>();
  const enhances = new Set<string>();

  if (status.chartjs) {
    imports.add(`import ChartJS from "${CLIENT_FOLDER}components/ChartJS.js";`);
    enhances.add(`app.component("ChartJS", ChartJS)`);
  }

  if (options.demo) {
    imports.add(
      `import CodeDemo from "${CLIENT_FOLDER}components/CodeDemo.js";`,
    );
    imports.add(`import MdDemo from "${CLIENT_FOLDER}components/MdDemo.js";`);
    enhances.add(`app.component("CodeDemo", CodeDemo);`);
    enhances.add(`app.component("MdDemo", MdDemo);`);
  }

  if (status.echarts) {
    imports.add(`import ECharts from "${CLIENT_FOLDER}components/ECharts.js";`);
    enhances.add(`app.component("ECharts", ECharts);`);
  }

  if (status.flowchart) {
    imports.add(
      `import FlowChart from "${CLIENT_FOLDER}components/FlowChart.js";`,
    );

    enhances.add(`app.component("FlowChart", FlowChart);`);
  }

  if (status.kotlinPlayground) {
    imports.add(
      `import KotlinPlayground from "${CLIENT_FOLDER}components/KotlinPlayground.js";`,
    );
    enhances.add(`app.component("KotlinPlayground", KotlinPlayground);`);
  }

  if (status.markmap) {
    imports.add(`import MarkMap from "${CLIENT_FOLDER}components/MarkMap.js";`);
    enhances.add(`app.component("MarkMap", MarkMap);`);
  }

  if (status.mermaid) {
    imports.add(`import Mermaid from "${CLIENT_FOLDER}components/Mermaid.js";`);
    enhances.add(`app.component("Mermaid", Mermaid);`);
  }

  if (options.playground) {
    imports.add(
      `import Playground from "${CLIENT_FOLDER}components/Playground.js";`,
    );
    enhances.add(`app.component("Playground", Playground);`);
  }

  if (status.sandpack) {
    imports.add(
      `import SandPack from "${CLIENT_FOLDER}components/SandPack.js";`,
    );

    enhances.add(`app.component("SandPack", SandPack);`);
  }

  if (status.vuePlayground) {
    imports.add(
      `import VuePlayground from "${CLIENT_FOLDER}components/VuePlayground.js";`,
    );
    enhances.add(`app.component("VuePlayground", VuePlayground);`);
  }

  return app.writeTemp(
    `md-enhance/config.js`,
    `\
${Array.from(imports.values()).join("\n")}

export default {
  enhance: ({ app }) => {
${Array.from(enhances.values())
  .map((item) => item.split("\n").map((line) => `    ${line}`))
  .flat()
  .join("\n")}
  },
};
`,
  );
};
