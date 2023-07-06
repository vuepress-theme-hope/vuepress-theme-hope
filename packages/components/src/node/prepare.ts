import { createRequire } from "node:module";

import type { App } from "@vuepress/core";
import { path } from "@vuepress/utils";
import {
  isArray,
  isNumber,
  isPlainObject,
  isString,
} from "vuepress-shared/node";

import { getIconLinks, getNoticeOptions } from "./components/index.js";
import type { BackToTopOptions, ComponentOptions } from "./options/index.js";
import { AVAILABLE_COMPONENTS, CLIENT_FOLDER } from "./utils.js";

const require = createRequire(import.meta.url);

export const prepareConfigFile = (
  app: App,
  {
    components = [],
    componentOptions = {},
    rootComponents = {},
  }: ComponentOptions,
  legacy: boolean,
): Promise<string> => {
  const imports: string[] = [];
  let enhance = "";
  const setups: string[] = [];
  const configRootComponents: string[] = [];
  let shouldImportH = false;
  let shouldImportUseScriptTag = false;
  let shouldImportUseStyleTag = false;

  components.forEach((item) => {
    if (AVAILABLE_COMPONENTS.includes(item)) {
      imports.push(
        `import ${item} from "${CLIENT_FOLDER}components/${item}.js";`,
      );

      enhance += `\
if(!hasGlobalComponent("${item}")) app.component("${item}", ${item});
`;
    }

    if (item === "FontIcon")
      getIconLinks(componentOptions.fontIcon?.assets).forEach((item) => {
        const { type, content } = item;

        if (type === "script") shouldImportUseScriptTag = true;
        else shouldImportUseStyleTag = true;

        setups.push(content);
      });

    if (legacy && (item as unknown) === "Catalog") {
      imports.push(
        `import Catalog from "${CLIENT_FOLDER}compact/components/Catalog.js";`,
      );
      enhance += `\
if(!hasGlobalComponent("Catalog")) app.component("Catalog", Catalog);
`;
    }
  });

  if (isString(rootComponents.addThis)) {
    shouldImportUseScriptTag = true;
    setups.push(
      `useScriptTag(\`https://s7.addthis.com/js/300/addthis_widget.js#pubid=${rootComponents.addThis}\`);`,
    );
  }

  if (rootComponents.backToTop) {
    const { threshold, progress } = isPlainObject(rootComponents.backToTop)
      ? rootComponents.backToTop
      : <BackToTopOptions>{};

    shouldImportH = true;
    imports.push(
      `import BackToTop from "${CLIENT_FOLDER}components/BackToTop.js";`,
    );

    const config = isPlainObject(rootComponents.backToTop)
      ? {
          ...(isNumber(threshold) ? { threshold } : {}),
          ...(progress === false ? { noProgress: true } : {}),
        }
      : {};

    configRootComponents.push(`() => h(BackToTop, ${JSON.stringify(config)}),`);
  }

  if (isArray(rootComponents.notice)) {
    shouldImportH = true;
    imports.push(`import Notice from "${CLIENT_FOLDER}components/Notice.js";`);

    configRootComponents.push(
      `() => h(Notice, { config: ${JSON.stringify(
        getNoticeOptions(rootComponents.notice),
      )} }),`,
    );
  }

  return app.writeTemp(
    `components/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "${path.resolve(
      require.resolve("vuepress-shared/client"),
    )}";
${
  shouldImportH
    ? `\
import { h } from "vue";
`
    : ""
}
${
  shouldImportUseScriptTag
    ? `\
import { useScriptTag } from "${path.resolve(
        require.resolve("@vueuse/core/index.mjs"),
      )}";
`
    : ""
}\
${
  shouldImportUseStyleTag
    ? `\
import { useStyleTag } from "${path.resolve(
        require.resolve("@vueuse/core/index.mjs"),
      )}";
`
    : ""
}\
${imports.join("\n")}

import "${CLIENT_FOLDER}styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  setup: () => {
${setups.map((item) => `    ${item}`).join("\n")}
  },
  rootComponents: [
${configRootComponents.map((item) => `    ${item}`).join("\n")}
  ],
});
`,
  );
};
