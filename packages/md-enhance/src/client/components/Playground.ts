import { ClientOnly } from "@vuepress/client";
import { defineComponent, h } from "vue";

import ExternalPlayground from "./ExternalPlayground";
import InternalPlayground from "./InternalPlayground";
import { parsePlaygroundSettings } from "../utils";
import { IMPORT_MAP_KEY } from "../../shared";

import type { VNode } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Playground",

  props: {
    id: { type: String, required: true },
    title: { type: String, default: "" },
    config: { type: String, default: "{}" },
    settings: { type: String, default: "{}" },
  },

  setup(props) {
    const settings = parsePlaygroundSettings(props.settings);
    const mode = settings.mode;

    const encodedKey = encodeURIComponent(IMPORT_MAP_KEY);

    const defaultImportsMap =
      mode === "internal"
        ? settings.internal?.defaultImportsMap
        : settings.external?.defaultImportsMap;

    return (): (VNode | null)[] => [
      h(ClientOnly, null, [
        h(mode === "internal" ? InternalPlayground : ExternalPlayground, {
          id: props.id,
          title: props.title,
          settings: props.settings,
          config: props.config.replace(encodedKey, defaultImportsMap || ""),
        }),
      ]),
    ];
  },
});
