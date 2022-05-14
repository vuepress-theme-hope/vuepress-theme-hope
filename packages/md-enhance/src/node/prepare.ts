import { ensureEndingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";
import type { App } from "@vuepress/core";
import type { MarkdownEnhanceOptions, RevealPlugin } from "../shared";

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

export const prepareAppEnhanceFile = async (
  app: App,
  options: MarkdownEnhanceOptions
): Promise<string> => {
  let appEnhanceImport = "";
  let appEnhanceRegister = "";

  const getStatus = (key: keyof MarkdownEnhanceOptions, gfm = false): boolean =>
    key in options
      ? Boolean(options[key])
      : gfm && "gfm" in options
      ? Boolean(options.gfm)
      : options.enableAll || false;

  if (getStatus("chart")) {
    appEnhanceImport += `import ChartJS from "${CLIENT_FOLDER}components/ChartJS";\n`;
    appEnhanceRegister += `app.component("ChartJS", ChartJS);\n`;
  }

  if (getStatus("demo")) {
    appEnhanceImport += `import CodeDemo from "${CLIENT_FOLDER}components/CodeDemo";\n`;
    appEnhanceRegister += `app.component("CodeDemo", CodeDemo);\n`;
  }

  if (getStatus("codegroup")) {
    appEnhanceImport += `import CodeGroup from "${CLIENT_FOLDER}components/CodeGroup";\n`;
    appEnhanceRegister += `app.component("CodeGroup", CodeGroup);\n`;
    appEnhanceImport += `import CodeGroupItem from "${CLIENT_FOLDER}components/CodeGroupItem";\n`;
    appEnhanceRegister += `app.component("CodeGroupItem", CodeGroupItem);\n`;
  }

  if (getStatus("flowchart")) {
    appEnhanceImport += `import FlowChart from "${CLIENT_FOLDER}components/FlowChart";\n`;
    appEnhanceRegister += `app.component("FlowChart", FlowChart);\n`;
  }

  if (getStatus("mermaid")) {
    appEnhanceImport += `import Mermaid from "${CLIENT_FOLDER}components/Mermaid";\n`;
    appEnhanceRegister += `app.component("Mermaid", Mermaid);\n`;
  }

  if (getStatus("presentation")) {
    appEnhanceImport += `import Presentation from "${CLIENT_FOLDER}components/Presentation";\n`;
    appEnhanceRegister += `app.component("Presentation", Presentation);\n`;
  }

  if (getStatus("align"))
    appEnhanceImport += `import "${CLIENT_FOLDER}styles/align.scss";\n`;

  if (getStatus("container"))
    appEnhanceImport += `import "${CLIENT_FOLDER}styles/container/index.scss";\n`;

  if (getStatus("footnote"))
    appEnhanceImport += `import "${CLIENT_FOLDER}styles/footnote.scss";\n`;

  if (getStatus("imageMark"))
    appEnhanceImport += `import "${CLIENT_FOLDER}styles/image-mark.scss";\n`;

  if (getStatus("tasklist"))
    appEnhanceImport += `import "${CLIENT_FOLDER}styles/tasklist.scss";\n`;

  if (getStatus("tex"))
    appEnhanceImport += `import "${CLIENT_FOLDER}styles/tex.scss";\n`;

  return app.writeTemp(
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
