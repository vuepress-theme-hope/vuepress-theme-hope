import type { App } from "@vuepress/core";
import type { MarkdownEnhanceOptions, RevealPlugin } from "../shared";

const PATH_PREFIX = "vuepress-plugin-md-enhance/lib/client/";

export const prepareAppEnhanceFile = async (
  app: App,
  options: MarkdownEnhanceOptions
): Promise<void> => {
  let appEnhanceImport = "";
  let appEnhanceRegister = "";

  const getStatus = (key: keyof MarkdownEnhanceOptions, gfm = false): boolean =>
    key in options
      ? Boolean(options[key])
      : gfm && "gfm" in options
      ? Boolean(options.gfm)
      : options.enableAll || false;

  if (getStatus("chart")) {
    appEnhanceImport += `import ChartJS from "${PATH_PREFIX}components/ChartJS";\n`;
    appEnhanceRegister += `app.component("ChartJS", ChartJS);\n`;
  }

  if (getStatus("demo")) {
    appEnhanceImport += `import CodeDemo from "${PATH_PREFIX}components/CodeDemo";\n`;
    appEnhanceRegister += `app.component("CodeDemo", CodeDemo);\n`;
  }

  if (getStatus("codegroup")) {
    appEnhanceImport += `import CodeGroup from "${PATH_PREFIX}components/CodeGroup";\n`;
    appEnhanceRegister += `app.component("CodeGroup", CodeGroup);\n`;
    appEnhanceImport += `import CodeGroupItem from "${PATH_PREFIX}components/CodeGroupItem";\n`;
    appEnhanceRegister += `app.component("CodeGroupItem", CodeGroupItem);\n`;
  }

  if (getStatus("flowchart")) {
    appEnhanceImport += `import FlowChart from "${PATH_PREFIX}components/FlowChart";\n`;
    appEnhanceRegister += `app.component("FlowChart", FlowChart);\n`;
  }

  if (getStatus("mermaid")) {
    appEnhanceImport += `import Mermaid from "${PATH_PREFIX}components/Mermaid";\n`;
    appEnhanceRegister += `app.component("Mermaid", Mermaid);\n`;
  }

  if (getStatus("presentation")) {
    appEnhanceImport += `import Presentation from "${PATH_PREFIX}components/Presentation";\n`;
    appEnhanceRegister += `app.component("Presentation", Presentation);\n`;
  }

  if (getStatus("align"))
    appEnhanceImport += `import "${PATH_PREFIX}styles/align.scss";\n`;

  if (getStatus("container"))
    appEnhanceImport += `import "${PATH_PREFIX}styles/container/index.scss";\n`;

  if (getStatus("footnote"))
    appEnhanceImport += `import "${PATH_PREFIX}styles/footnote.scss";\n`;

  if (getStatus("imageMark"))
    appEnhanceImport += `import "${PATH_PREFIX}styles/image-mark.scss";\n`;

  if (getStatus("tasklist"))
    appEnhanceImport += `import "${PATH_PREFIX}styles/tasklist.scss";\n`;

  if (getStatus("tex"))
    appEnhanceImport += `import "${PATH_PREFIX}styles/tex.scss";\n`;

  await app.writeTemp(
    `md-enhance/appEnhance.js`,
    `import { defineClientAppEnhance } from "@vuepress/client";
${appEnhanceImport}

export default defineClientAppEnhance(({ app }) => {
${appEnhanceRegister
  .split("\n")
  .map((item) => `  ${item}`)
  .join("\n")}
});`
  );
};

export const prepareRevealPluginFile = async (
  app: App,
  revealPlugins: RevealPlugin[]
): Promise<string> =>
  app.writeTemp(
    "md-enhance/reveal-plugins.js",
    `export const usePlugins = () => [${["markdown", ...revealPlugins]
      .map(
        (item) => `
  import(
    /* webpackChunkName: "reveal" */ "reveal.js/plugin/${item}/${item}.esm.js"
  )`
      )
      .join(",")}
];`
  );
