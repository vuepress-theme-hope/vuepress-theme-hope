import { defineComponent, h, ref } from "vue";

import { LOADING_SVG, PLAY_SVG } from "./icons";
import { useExternalPlayground } from "../composables";
import { parsePlaygroundSettings } from "../utils";

import type { VNode } from "vue";

import "../styles/playground.scss";

export default defineComponent({
  name: "ExternalPlayground",

  props: {
    id: { type: String, required: true },
    config: { type: String, required: true },
    title: { type: String, default: "" },
    settings: { type: String, default: "{}" },
  },

  setup(props) {
    const playgroundContainer = ref<HTMLElement | null>(null);
    const iframe = ref<HTMLElement | null>(null);

    const loading = ref(true);

    const playgroundOptions = parsePlaygroundSettings(props.settings);

    const { link } = useExternalPlayground(
      props.config,
      playgroundOptions.external || {}
    );

    return (): (VNode | null)[] => [
      h(
        "div",
        {
          ref: playgroundContainer,
          class: "playground-container",
          id: props.id,
        },
        [
          h("div", { class: "title-container" }, [
            props.title
              ? h(
                  "div",
                  { class: "playground-title" },
                  decodeURIComponent(props.title)
                )
              : null,
            h("div", { class: "op-btns" }, [
              h("a", {
                class: "op-btn",
                href: link,
                target: "_blank",
                innerHTML: PLAY_SVG,
              }),
            ]),
          ]),
          h("div", { class: "preview-container" }, [
            loading.value
              ? h("div", {
                  class: ["preview-loading-wrapper"],
                  innerHTML: LOADING_SVG,
                })
              : null,
            h("iframe", {
              ref: iframe,
              class: "iframe-preview",
              src: link,
              onload: () => (loading.value = false),
            }),
          ]),
        ]
      ),
    ];
  },
});
