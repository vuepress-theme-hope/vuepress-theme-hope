import type {
  PlaygroundData,
  PlaygroundOptions,
  VuePresetPlaygroundOptions,
} from "../../../shared/index.js";

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

export const getVuePlaygroundPreset = ({
  service = "https://sfc.vuejs.org/",
  dev = false,
  ssr = false,
}: VuePresetPlaygroundOptions = {}): PlaygroundOptions => ({
  name: "playground#vue",
  openRender: (playgroundData: PlaygroundData): string => {
    const optionsString = new URLSearchParams(
      Object.entries(
        <Record<string, unknown>>playgroundData.settings || {}
      ).map<[string, string]>(([key, value]) => [key, String(value)])
    ).toString();

    return `<Playground key="${playgroundData.key}" title="${
      playgroundData.title || ""
    }" link="${encodeURIComponent(
      `${service}${optionsString ? `?${optionsString}` : ""}#${
        dev ? "__DEV__" : ""
      }${ssr ? "__SSR__" : ""}${encodeFiles(playgroundData)}`
    )}">\n`;
  },
  closeRender: () => `</Playground>\n`,
});
