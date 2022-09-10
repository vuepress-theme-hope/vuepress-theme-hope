import { playground } from "./playground/index.js";

import type { PluginSimple } from "markdown-it";
import type {
  PlaygroundData,
  VuePlaygroundOptions,
} from "../../shared/index.js";

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

export const vuePlayground: PluginSimple = (md) => {
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
};
