import { deepAssign } from "vuepress-shared";
import { playground } from "./playground";

import type { PluginWithOptions } from "markdown-it";
import type { PlaygroundData, VuePlaygroundOptions } from "../../shared";

export const DEFAULT_VUE_PLAYGROUND_OPTIONS: VuePlaygroundOptions = {
  autoResize: true,
  showCode: false,
  showCompileOutput: false,
  showImportMap: true,
  clearConsole: false,
  layout: "vertical",
  ssr: false,
};
const VUE_SUPPORTED_EXTENSIONS = [
  "html",
  "js",
  "ts",
  "vue",
  "jsx",
  "tsx",
  "json",
];

const encodeFiles = (playgroundData: PlaygroundData): string =>
  Buffer.from(
    JSON.stringify(
      Object.fromEntries(
        Object.entries(playgroundData.files)
          .filter(([, { lang }]) => VUE_SUPPORTED_EXTENSIONS.includes(lang))
          .map(([key, config]) => [key, config.content])
      )
    )
  ).toString("base64");

export const vuePlayground: PluginWithOptions<VuePlaygroundOptions> = (
  md,
  { service = "https://sfc.vuejs.org/", ...options } = {}
) => {
  md.use(playground, {
    name: "vue-playground",
    openRender: (playgroundData: PlaygroundData) =>
      `<VuePlayground key="${playgroundData.key}" title="${
        playgroundData.title || ""
      }" settings="${encodeURIComponent(
        JSON.stringify(playgroundData.settings || {})
      )}" files="${encodeURIComponent(encodeFiles(playgroundData))}">\n`,
    closeRender: () => `</VuePlayground>\n`,
  });

  md.use(playground, {
    name: "vue-external-playground",
    openRender: (playgroundData: PlaygroundData) => {
      const optionsString = new URLSearchParams(
        Object.entries(
          deepAssign(
            {},
            <Record<string, unknown>>playgroundData.settings || {},
            <Record<string, unknown>>options
          )
        ).map<[string, string]>(([key, value]) => [key, String(value)])
      ).toString();

      const link = `${service.replace(/\/$/g, "")}${
        optionsString ? `?${optionsString}` : ""
      }#${encodeFiles(playgroundData)}`;

      return `<Playground key="${playgroundData.key}" title="${
        playgroundData.title || ""
      }" link="${encodeURIComponent(link)}">\n`;
    },
    closeRender: () => `</Playground>\n`,
  });
};
