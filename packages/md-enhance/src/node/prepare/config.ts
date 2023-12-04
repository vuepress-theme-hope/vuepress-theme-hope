import type { App } from "@vuepress/core";
import { getRealPath, isPlainObject } from "vuepress-shared/node";

import type { MarkdownEnhanceOptions } from "../options.js";
import { CLIENT_FOLDER } from "../utils.js";

const { url } = import.meta;

export const prepareConfigFile = async (
  app: App,
  options: MarkdownEnhanceOptions,
  status: Record<string, boolean>,
  legacy = true,
): Promise<string> => {
  const imports = new Set<string>();
  const enhances = new Set<string>();
  const setups = new Set<string>();

  // TODO: Remove this in v2 stable
  // @ts-expect-error
  if (options.card && legacy) {
    imports.add(
      `import { hasGlobalComponent } from "${getRealPath(
        "vuepress-shared/client",
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

  if (options.codetabs) {
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
      `import { injectEchartsConfig } from "${CLIENT_FOLDER}/index.js";`,
    );
    enhances.add(`app.component("ECharts", ECharts);`);
    enhances.add(`injectEchartsConfig(app);`);
  }

  if (options.figure)
    imports.add(`import "${CLIENT_FOLDER}styles/figure.scss";`);

  if (status["flowchart"]) {
    imports.add(
      `import FlowChart from "${CLIENT_FOLDER}components/FlowChart.js";`,
    );

    enhances.add(`app.component("FlowChart", FlowChart);`);
  }

  if (status["footnote"])
    imports.add(`import "${CLIENT_FOLDER}styles/footnote.scss";`);

  if (options.hint) {
    imports.add(
      `import { useHint } from "${CLIENT_FOLDER}composables/hint.js";`,
    );
    imports.add(`import "${CLIENT_FOLDER}styles/hint/index.scss";`);
    setups.add("useHint();");
  }

  if (status["imgMark"])
    imports.add(`import "${CLIENT_FOLDER}styles/image-mark.scss"`);

  if (status["katex"]) {
    imports.add(`import "${getRealPath("katex/dist/katex.min.css", url)}";`);
    imports.add(`import "${CLIENT_FOLDER}styles/katex.scss";`);

    if (isPlainObject(options.katex) && options.katex.copy) {
      imports.add(
        `import { useKatexCopy } from "${CLIENT_FOLDER}composables/katex.js";`,
      );
      setups.add(`useKatexCopy();`);
    }
  }

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

  if (status["mathjax"]) imports.add(`import "./mathjax.css";`);

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

  if (status["revealJs"]) {
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

  if (options.tabs) {
    imports.add(`import Tabs from "${CLIENT_FOLDER}components/Tabs.js";`);
    enhances.add(`app.component("Tabs", Tabs);`);
  }

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
