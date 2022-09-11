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

export const getVuePlaygroundPreset = ({
  service = "https://sfc.vuejs.org/",
  dev = false,
  ssr = false,
}: VuePresetPlaygroundOptions = {}): PlaygroundOptions => ({
  name: "playground#vue",
  getter: (playgroundData: PlaygroundData): Record<string, string> => {
    const { title = "", files, settings, key } = playgroundData;
    const optionsString = new URLSearchParams(
      Object.entries(<Record<string, unknown>>settings || {}).map<
        [string, string]
      >(([key, value]) => [key, String(value)])
    ).toString();

    return {
      key,
      title,
      link: encodeURIComponent(
        `${service}${optionsString ? `?${optionsString}` : ""}#${
          // dev flag
          dev ? "__DEV__" : ""
        }${
          // ssr flag
          ssr ? "__SSR__" : ""
        }${
          // code base64
          Buffer.from(
            JSON.stringify(
              Object.fromEntries(
                Object.entries(files)
                  .filter(([, { lang }]) =>
                    VUE_SUPPORTED_EXTENSIONS.includes(lang)
                  )
                  .map(([key, config]) => [key, config.content])
              )
            )
          ).toString("base64")
        }`
      ),
    };
  },
});
