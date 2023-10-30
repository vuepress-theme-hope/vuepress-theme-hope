import type { App } from "@vuepress/core";
import { getRealPath, isPlainObject } from "vuepress-shared/node";

import type { MarkdownEnhanceOptions } from "../options.js";
import { CLIENT_FOLDER } from "../utils.js";

const { url } = import.meta;

export const prepareConfigFile = async (
  app: App,
  options: MarkdownEnhanceOptions,
  legacy = true,
): Promise<string> => {
  const imports: string[] = [];
  const enhances: string[] = [];
  const setups: string[] = [];

  const getStatus = (
    key: keyof MarkdownEnhanceOptions,
    gfm = false,
  ): boolean =>
    key in options
      ? Boolean(options[key])
      : (gfm && "gfm" in options && options.gfm) || false;

  if (getStatus("card")) {
    imports.push(`import VPCard from "${CLIENT_FOLDER}components/VPCard.js";`);
    enhances.push(`app.component("VPCard", VPCard)`);
  }

  if (getStatus("chart")) {
    imports.push(
      `import ChartJS from "${CLIENT_FOLDER}components/ChartJS.js";`,
    );
    enhances.push(`app.component("ChartJS", ChartJS)`);
  }

  if (getStatus("codetabs")) {
    imports.push(
      `import CodeTabs from "${CLIENT_FOLDER}components/CodeTabs.js";`,
    );
    enhances.push(`app.component("CodeTabs", CodeTabs);`);

    // TODO: Remove this in v2 stable
    if (legacy) {
      imports.push(
        `import { hasGlobalComponent } from "${getRealPath(
          "vuepress-shared/client",
          url,
        )}";`,
        `import { CodeGroup, CodeGroupItem } from "${CLIENT_FOLDER}compact/index.js";`,
      );
      enhances.push(
        `if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);`,
        `if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);`,
      );
    }
  }

  if (getStatus("container"))
    imports.push(`import "${CLIENT_FOLDER}styles/container/index.scss";`);

  if (getStatus("demo")) {
    imports.push(
      `import CodeDemo from "${CLIENT_FOLDER}components/CodeDemo.js";`,
    );
    enhances.push(`app.component("CodeDemo", CodeDemo);`);
  }

  if (getStatus("echarts")) {
    imports.push(
      `import ECharts from "${CLIENT_FOLDER}components/ECharts.js";`,
    );
    enhances.push(`app.component("ECharts", ECharts);`);
  }

  if (getStatus("figure", true))
    imports.push(`import "${CLIENT_FOLDER}styles/figure.scss";`);

  if (getStatus("flowchart")) {
    imports.push(
      `import FlowChart from "${CLIENT_FOLDER}components/FlowChart.js";`,
    );

    enhances.push(`app.component("FlowChart", FlowChart);`);
  }

  if (getStatus("footnote", true))
    imports.push(`import "${CLIENT_FOLDER}styles/footnote.scss";`);

  if (getStatus("imgMark", true))
    imports.push(`import "${CLIENT_FOLDER}styles/image-mark.scss"`);

  if (getStatus("mermaid")) {
    imports.push(
      `import Mermaid from "${CLIENT_FOLDER}components/Mermaid.js";`,
      `import { injectMermaidConfig } from "${CLIENT_FOLDER}/index.js";`,
    );
    enhances.push(
      `injectMermaidConfig(app);`,
      `app.component("Mermaid", Mermaid);`,
    );
  }

  if (getStatus("revealJs")) {
    imports.push(
      `import "${getRealPath("reveal.js/dist/reveal.css", url)}";`,
      `import RevealJs from "${CLIENT_FOLDER}components/RevealJs.js";`,
      `import { injectRevealJsConfig } from "${CLIENT_FOLDER}index.js";`,
    );
    enhances.push(
      `injectRevealJsConfig(app);`,
      `app.component("RevealJs", RevealJs);`,
    );
  }

  if (getStatus("playground")) {
    imports.push(
      `import Playground from "${CLIENT_FOLDER}components/Playground.js";`,
    );
    enhances.push(`app.component("Playground", Playground);`);
  }

  if (getStatus("tabs")) {
    imports.push(`import Tabs from "${CLIENT_FOLDER}components/Tabs.js";`);
    enhances.push(`app.component("Tabs", Tabs);`);
  }

  if (getStatus("tasklist", true))
    imports.push(`import "${CLIENT_FOLDER}styles/tasklist.scss";`);

  if (getStatus("katex")) {
    imports.push(
      `import "${getRealPath("katex/dist/katex.min.css", url)}";`,
      `import "${CLIENT_FOLDER}styles/katex.scss";`,
    );

    if (isPlainObject(options.katex) && options.katex.copy) {
      imports.push(
        `import { useKatexCopy } from "${CLIENT_FOLDER}composables/katex.js";`,
      );
      setups.push(`useKatexCopy();`);
    }
  }

  if (getStatus("vuePlayground")) {
    const asyncImports = `import { defineAsyncComponent } from "vue";`;

    if (!imports.includes(asyncImports))
      imports.push(`import { defineAsyncComponent } from "vue";`);

    imports.push(
      `import { injectVuePlaygroundConfig } from "${CLIENT_FOLDER}index.js";`,
    );
    enhances.push(
      `injectVuePlaygroundConfig(app);`,
      `app.component("VuePlayground", defineAsyncComponent(() => import("${CLIENT_FOLDER}components/VuePlayground.js")));`,
    );
  }

  if (getStatus("mathjax")) imports.push(`import "./mathjax.css";`);

  if (getStatus("sandpack")) {
    const asyncImports = `import { defineAsyncComponent } from "vue";`;

    if (!imports.includes(asyncImports))
      imports.push(`import { defineAsyncComponent } from "vue";`);

    imports.push(
      `import { injectSandpackConfig } from "${CLIENT_FOLDER}index.js";`,
    );
    enhances.push(
      `injectSandpackConfig(app);`,
      `app.component("MdSandpack", defineAsyncComponent(() => import("${CLIENT_FOLDER}components/Sandpack.js")));`,
    );
  }

  return app.writeTemp(
    `md-enhance/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
${imports.join("\n")}

export default defineClientConfig({
  enhance: ({ app }) => {
${enhances.map((item) => `    ${item}`).join("\n")}
  },
  setup: () => {
${setups.join("\n")}
  }
});
`,
  );
};
