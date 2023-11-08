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
  const imports = new Set<string>();
  const enhances = new Set<string>();
  const setups = new Set<string>();

  const getStatus = (
    key: keyof MarkdownEnhanceOptions,
    gfm = false,
  ): boolean =>
    key in options
      ? Boolean(options[key])
      : (gfm && "gfm" in options && options.gfm) || false;

  if (getStatus("card")) {
    imports.add(`import VPCard from "${CLIENT_FOLDER}components/VPCard.js";`);
    enhances.add(`app.component("VPCard", VPCard)`);
  }

  if (getStatus("chart")) {
    imports.add(`import ChartJS from "${CLIENT_FOLDER}components/ChartJS.js";`);
    enhances.add(`app.component("ChartJS", ChartJS)`);
  }

  if (getStatus("codetabs")) {
    imports.add(
      `import CodeTabs from "${CLIENT_FOLDER}components/CodeTabs.js";`,
    );
    enhances.add(`app.component("CodeTabs", CodeTabs);`);

    // TODO: Remove this in v2 stable
    if (legacy) {
      imports.add(
        `import { hasGlobalComponent } from "${getRealPath(
          "vuepress-shared/client",
          url,
        )}";`,
      );
      imports.add(
        `import { CodeGroup, CodeGroupItem } from "${CLIENT_FOLDER}compact/index.js";`,
      );
      enhances.add(
        `if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);`,
      );
      enhances.add(
        `if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);`,
      );
    }
  }

  if (getStatus("container")) {
    imports.add(
      `import { useContainer } from "${CLIENT_FOLDER}composables/container.js";`,
    );
    imports.add(`import "${CLIENT_FOLDER}styles/container/index.scss";`);
    setups.add("useContainer();");
  }

  if (getStatus("demo")) {
    imports.add(
      `import CodeDemo from "${CLIENT_FOLDER}components/CodeDemo.js";`,
    );
    imports.add(`import MdDemo from "${CLIENT_FOLDER}components/MdDemo.js";`);
    enhances.add(`app.component("CodeDemo", CodeDemo);`);
    enhances.add(`app.component("MdDemo", MdDemo);`);
  }

  if (getStatus("echarts")) {
    imports.add(`import ECharts from "${CLIENT_FOLDER}components/ECharts.js";`);
    imports.add(
      `import { injectEchartsConfig } from "${CLIENT_FOLDER}/index.js";`,
    );
    enhances.add(`app.component("ECharts", ECharts);`);
    enhances.add(`injectEchartsConfig(app);`);
  }

  if (getStatus("figure", true))
    imports.add(`import "${CLIENT_FOLDER}styles/figure.scss";`);

  if (getStatus("flowchart")) {
    imports.add(
      `import FlowChart from "${CLIENT_FOLDER}components/FlowChart.js";`,
    );

    enhances.add(`app.component("FlowChart", FlowChart);`);
  }

  if (getStatus("footnote", true))
    imports.add(`import "${CLIENT_FOLDER}styles/footnote.scss";`);

  if (getStatus("imgMark", true))
    imports.add(`import "${CLIENT_FOLDER}styles/image-mark.scss"`);

  if (getStatus("mermaid")) {
    imports.add(`import Mermaid from "${CLIENT_FOLDER}components/Mermaid.js";`);
    imports.add(
      `import { injectMermaidConfig } from "${CLIENT_FOLDER}/index.js";`,
    );
    enhances.add(`injectMermaidConfig(app);`);
    enhances.add(`app.component("Mermaid", Mermaid);`);
  }

  if (getStatus("revealJs")) {
    imports.add(`import "${getRealPath("reveal.js/dist/reveal.css", url)}";`);
    imports.add(
      `import RevealJs from "${CLIENT_FOLDER}components/RevealJs.js";`,
    );
    imports.add(
      `import { injectRevealJsConfig } from "${CLIENT_FOLDER}index.js";`,
    );
    enhances.add(`injectRevealJsConfig(app);`);
    enhances.add(`app.component("RevealJs", RevealJs);`);
  }

  if (getStatus("playground")) {
    imports.add(
      `import Playground from "${CLIENT_FOLDER}components/Playground.js";`,
    );
    enhances.add(`app.component("Playground", Playground);`);
  }

  if (getStatus("tabs")) {
    imports.add(`import Tabs from "${CLIENT_FOLDER}components/Tabs.js";`);
    enhances.add(`app.component("Tabs", Tabs);`);
  }

  if (getStatus("tasklist", true))
    imports.add(`import "${CLIENT_FOLDER}styles/tasklist.scss";`);

  if (getStatus("katex")) {
    imports.add(`import "${getRealPath("katex/dist/katex.min.css", url)}";`);
    imports.add(`import "${CLIENT_FOLDER}styles/katex.scss";`);

    if (isPlainObject(options.katex) && options.katex.copy) {
      imports.add(
        `import { useKatexCopy } from "${CLIENT_FOLDER}composables/katex.js";`,
      );
      setups.add(`useKatexCopy();`);
    }
  }

  if (getStatus("vuePlayground")) {
    imports.add(`import { defineAsyncComponent } from "vue";`);
    imports.add(
      `import { injectVuePlaygroundConfig } from "${CLIENT_FOLDER}index.js";`,
    );
    enhances.add(`injectVuePlaygroundConfig(app);`);
    enhances.add(
      `app.component("VuePlayground", defineAsyncComponent(() => import("${CLIENT_FOLDER}components/VuePlayground.js")));`,
    );
  }

  if (getStatus("mathjax")) imports.add(`import "./mathjax.css";`);

  return app.writeTemp(
    `md-enhance/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
${Array.from(imports.values()).join("\n")}

export default defineClientConfig({
  enhance: ({ app }) => {
${Array.from(enhances.values())
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  setup: () => {
${Array.from(setups.values()).join("\n")}
  }
});
`,
  );
};
