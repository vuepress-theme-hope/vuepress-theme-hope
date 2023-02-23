import { type App } from "@vuepress/core";
import { isArray, isString } from "@vuepress/shared";

import { getIconLink, getNoticeOptions } from "./components/index.js";
import { type ComponentOptions } from "./options/index.js";
import { AVAILABLE_COMPONENTS, CLIENT_FOLDER } from "./utils.js";

export const prepareConfigFile = (
  app: App,
  {
    components = [],
    componentOptions = {},
    rootComponents = {},
  }: ComponentOptions,
  legacy: boolean
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
        `import ${item} from "${CLIENT_FOLDER}components/${item}.js";`
      );

      enhance += `\
if(!hasGlobalComponent("${item}")) app.component("${item}", ${item});
`;
    }

    if (item === "FontIcon")
      getIconLink(componentOptions.fontIcon?.assets).forEach((item) => {
        const { type, content } = item;

        if (type === "script") shouldImportUseScriptTag = true;
        else shouldImportUseStyleTag = true;

        setups.push(content);
      });

    if (legacy && (item as unknown) === "Catalog") {
      imports.push(
        `import Catalog from "${CLIENT_FOLDER}compact/components/Catalog.js";`
      );
      enhance += `\
if(!hasGlobalComponent("Catalog")) app.component("Catalog", Catalog);
`;
    }
  });

  if (isString(rootComponents.addThis)) {
    shouldImportUseScriptTag = true;
    setups.push(
      `useScriptTag(\`//s7.addthis.com/js/300/addthis_widget.js#pubid=${rootComponents.addThis}\`);`
    );
  }

  if (rootComponents.backToTop) {
    shouldImportH = true;
    imports.push(
      `import BackToTop from "${CLIENT_FOLDER}components/BackToTop.js";`
    );
    configRootComponents.push(
      `() => h(BackToTop, { threshold: ${
        typeof rootComponents.backToTop === "number"
          ? rootComponents.backToTop
          : 300
      } }),`
    );
  }

  if (isArray(rootComponents.notice)) {
    shouldImportH = true;
    imports.push(`import Notice from "${CLIENT_FOLDER}components/Notice.js";`);

    configRootComponents.push(
      `() => h(Notice, { config: ${JSON.stringify(
        getNoticeOptions(rootComponents.notice)
      )} }),`
    );
  }

  return app.writeTemp(
    `components/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "${CLIENT_FOLDER}shared.js";
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
import { useScriptTag } from "${CLIENT_FOLDER}vueuse.js";
`
    : ""
}\
${
  shouldImportUseStyleTag
    ? `\
import { useStyleTag } from "${CLIENT_FOLDER}vueuse.js";
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
`
  );
};
