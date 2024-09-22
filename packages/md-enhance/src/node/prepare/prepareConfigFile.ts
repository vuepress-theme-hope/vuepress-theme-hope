import { getRealPath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { MarkdownEnhancePluginOptions } from "../options.js";
import { CLIENT_FOLDER } from "../utils.js";

const { url } = import.meta;

export const prepareConfigFile = async (
  app: App,
  options: MarkdownEnhancePluginOptions,
  status: Record<string, boolean>,
  legacy = true,
): Promise<string> => {
  const imports = new Set<string>();
  const enhances = new Set<string>();

  // TODO: Remove this in v2 stable
  // @ts-expect-error: card does not exist
  if (options.card && legacy) {
    imports.add(
      `import { hasGlobalComponent } from "${getRealPath(
        "@vuepress/helper/client",
        url,
      )}";`,
    );
    imports.add(`import { VPCard } from "${CLIENT_FOLDER}compact/index.js";`);
    enhances.add(
      `if(!hasGlobalComponent("VPCard", app)) app.component("VPCard", VPCard);`,
    );
  }

  if (status["chart"]) {
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

  if (status["echarts"]) {
    imports.add(`import ECharts from "${CLIENT_FOLDER}components/ECharts.js";`);
    imports.add(
      `import { injectEChartsConfig } from "${CLIENT_FOLDER}/index.js";`,
    );
    enhances.add(`app.component("ECharts", ECharts);`);
    enhances.add(`injectEChartsConfig(app);`);
  }

  if (status["flowchart"]) {
    imports.add(
      `import FlowChart from "${CLIENT_FOLDER}components/FlowChart.js";`,
    );

    enhances.add(`app.component("FlowChart", FlowChart);`);
  }

  if (status["footnote"])
    imports.add(`import "${CLIENT_FOLDER}styles/footnote.scss";`);

  if (status["kotlinPlayground"]) {
    imports.add(
      `import KotlinPlayground from "${CLIENT_FOLDER}components/KotlinPlayground.js";`,
    );
    imports.add(
      `import { injectKotlinPlaygroundConfig } from "${CLIENT_FOLDER}index.js";`,
    );
    enhances.add(`injectKotlinPlaygroundConfig(app);`);
    enhances.add(`app.component("KotlinPlayground", KotlinPlayground);`);
  }

  if (status["markmap"]) {
    imports.add(`import MarkMap from "${CLIENT_FOLDER}components/MarkMap.js";`);
    enhances.add(`app.component("MarkMap", MarkMap);`);
  }

  if (status["mermaid"]) {
    imports.add(`import Mermaid from "${CLIENT_FOLDER}components/Mermaid.js";`);
    imports.add(
      `import { injectMermaidConfig } from "${CLIENT_FOLDER}/index.js";`,
    );
    enhances.add(`injectMermaidConfig(app);`);
    enhances.add(`app.component("Mermaid", Mermaid);`);
  }

  if (options.playground) {
    imports.add(
      `import Playground from "${CLIENT_FOLDER}components/Playground.js";`,
    );
    enhances.add(`app.component("Playground", Playground);`);
  }

  if (status["sandpack"]) {
    imports.add(`import { defineAsyncComponent } from "vue";`);
    imports.add(
      `import { LoadingIcon } from "${getRealPath(
        "@vuepress/helper/client",
        url,
      )}";`,
    );
    imports.add(
      `import { injectSandpackConfig } from "${CLIENT_FOLDER}index.js";`,
    );
    enhances.add(`injectSandpackConfig(app);`);
    enhances.add(
      `\
app.component(
  "SandPack",
  defineAsyncComponent({
    loader: () => import("${CLIENT_FOLDER}components/SandPack.js"),
    loadingComponent: LoadingIcon,
  })
);`,
    );
  }

  if (options.spoiler)
    imports.add(`import "${getRealPath("@mdit/plugin-spoiler/style", url)}";`);

  if (status["tasklist"])
    imports.add(`import "${CLIENT_FOLDER}styles/tasklist.scss";`);

  if (status["vuePlayground"]) {
    imports.add(
      `import VuePlayground from "${CLIENT_FOLDER}components/VuePlayground.js";`,
    );
    imports.add(
      `import { injectVuePlaygroundConfig } from "${CLIENT_FOLDER}index.js";`,
    );
    enhances.add(`injectVuePlaygroundConfig(app);`);
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
