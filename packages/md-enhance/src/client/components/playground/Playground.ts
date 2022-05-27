import { defineComponent, h } from "vue";
import type { VNode } from "vue";

import PlaygroundExternal from "./PlaygroundExternal";
import PlaygroundInternal from "./PlaygroundInternal";
import PlayFile from "./PlayFile";
import PlayImports from "./PlayImports";
import PlaySettings from "./PlaySettings";

import { parsePlaygroundSettings } from "../../utils/playground";
import { IMPORT_MAP_KEY } from "../../../shared/playground";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Playground",

  components: {
    PlayFile,
    PlayImports,
    PlaySettings,
  },

  props: {
    id: { type: String, required: true },
    title: { type: String, default: "" },
    config: { type: String, default: null },
    settings: { type: String, default: null },
  },

  setup(props) {
    const settings = parsePlaygroundSettings(props.settings);
    const mode = settings.mode;

    const encodedKey = encodeURIComponent(IMPORT_MAP_KEY);

    return (): (VNode | null)[] => [
      mode === "internal"
        ? h(PlaygroundInternal, {
            id: props.id,
            title: props.title,
            settings: props.settings,
            config: props.config.replace(
              encodedKey,
              settings.internal?.defaultImportsMap || ""
            ),
          })
        : h(PlaygroundExternal, {
            id: props.id,
            title: props.title,
            settings: props.settings,
            config: props.config.replace(
              encodedKey,
              settings.external?.defaultImportsMap || ""
            ),
          }),
    ];
  },
});
