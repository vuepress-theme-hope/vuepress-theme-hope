import { deepAssign, entries, fromEntries } from "@vuepress/helper";

import type {
  PlaygroundData,
  PlaygroundOptions,
  VuePresetPlaygroundOptions,
} from "../../typings/index.js";

const VUE_SUPPORTED_EXTENSIONS = [
  "html",
  "js",
  "ts",
  "vue",
  "jsx",
  "tsx",
  "json",
];

const DEFAULT_VUE_CDN = "https://sfc.vuejs.org/vue.runtime.esm-browser.js";
const DEFAULT_VUE_SERVER_RENDERER_CDN =
  "https://sfc.vuejs.org/server-renderer.esm-browser.js";

export const getVuePlaygroundPreset = (
  options: VuePresetPlaygroundOptions = {},
): PlaygroundOptions => ({
  name: "playground#vue",
  propsGetter: (playgroundData: PlaygroundData): Record<string, string> => {
    const { title = "", files, settings: localSettings } = playgroundData;
    const settings = {
      // Defaults
      service: "https://sfc.vuejs.org/",
      dev: false,
      ssr: false,
      ...options,
      ...localSettings,
    };

    const fileInfo = fromEntries(
      entries(files)
        .filter(([, { ext }]) => VUE_SUPPORTED_EXTENSIONS.includes(ext))
        .map(([key, { content }]) => {
          if (key === "import-map.json") {
            const importMap = <
              {
                imports: Record<string, string>;
                scopes?: Record<string, Record<string, string>>;
              }
            >JSON.parse(content);

            return [
              key,
              JSON.stringify(
                deepAssign(
                  {
                    imports: {
                      // Insure vue exists
                      vue: DEFAULT_VUE_CDN,
                      // Insure vue/server-renderer exists
                      ...(settings.ssr
                        ? {
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            "vue/server-renderer":
                              DEFAULT_VUE_SERVER_RENDERER_CDN,
                          }
                        : {}),
                    },
                  },
                  importMap,
                ),
                null,
                2,
              ),
            ];
          }

          return [key, content];
        }),
    );

    if (settings.ssr && !fileInfo["import-map.json"])
      fileInfo["import-map.json"] = JSON.stringify(
        {
          imports: {
            vue: DEFAULT_VUE_CDN,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "vue/server-renderer": DEFAULT_VUE_SERVER_RENDERER_CDN,
          },
        },
        null,
        2,
      );

    return {
      title,
      link: encodeURIComponent(
        `${settings.service}#${
          // Dev flag
          settings.dev ? "__DEV__" : ""
        }${
          // Ssr flag
          settings.ssr ? "__SSR__" : ""
        }${
          // Code base64
          Buffer.from(JSON.stringify(fileInfo)).toString("base64")
        }`,
      ),
    };
  },
});
