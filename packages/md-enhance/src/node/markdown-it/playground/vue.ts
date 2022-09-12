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

export const getVuePlaygroundPreset = (
  options: VuePresetPlaygroundOptions = {}
): PlaygroundOptions => ({
  name: "playground#vue",
  propsGetter: (playgroundData: PlaygroundData): Record<string, string> => {
    const { title = "", files, settings: localSettings, key } = playgroundData;
    const settings = {
      // defaults
      service: "https://sfc.vuejs.org/",
      dev: false,
      ssr: false,
      ...options,
      ...localSettings,
    };

    return {
      key,
      title,
      link: encodeURIComponent(
        `${settings.service}#${
          // dev flag
          settings.dev ? "__DEV__" : ""
        }${
          // ssr flag
          settings.ssr ? "__SSR__" : ""
        }${
          // code base64
          Buffer.from(
            JSON.stringify(
              Object.fromEntries(
                Object.entries(files)
                  .filter(([, { ext }]) =>
                    VUE_SUPPORTED_EXTENSIONS.includes(ext)
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
