import { defineComponent, h, computed, ref, Ref } from "vue";

import type { VNode } from "vue";

import "../../styles/playground.scss";
import { LOADING_SVG, PLAY_SVG } from "../icons";
import { usePlaygroundExternal } from "../../composables/playground";
import { parsePlaygroundSettings } from "../../utils/playground";

export default defineComponent({
  name: "PlaygroundExternal",

  props: {
    title: { type: String, default: "" },
    config: { type: String, required: true },
    settings: { type: String, default: "{}" },
    id: { type: String, required: true },
  },

  setup(props) {
    const playgroundContainer = ref<HTMLElement | null>(null);
    const iframe = ref<HTMLElement | null>(null);

    const loading = ref<boolean>(true);

    const playgroundOptions = parsePlaygroundSettings(props.settings);

    const previewLink: Ref<string> = computed(() => {
      const { link } = usePlaygroundExternal(
        props.config,
        playgroundOptions.external || {}
      );

      return link;
    });

    const hideLoading = () => {
      loading.value = false;
    };

    return (): (VNode | null)[] => [
      h(
        "div",
        {
          ref: playgroundContainer,
          class: "playground-container",
          id: props.id,
        },
        [
          h(
            "div",
            {
              class: "title-container",
            },
            [
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
                  href: previewLink.value,
                  target: "_blank",
                  innerHTML: PLAY_SVG,
                }),
              ]),
            ]
          ),
          h(
            "div",
            {
              class: "preview-container",
            },
            [
              loading.value
                ? h("div", {
                    class: ["preview-loading-wrapper"],
                    innerHTML: LOADING_SVG,
                  })
                : null,
              h("iframe", {
                ref: iframe,
                class: "iframe-preview",
                src: previewLink.value,
                onload: () => hideLoading(),
              }),
            ]
          ),
        ]
      ),
    ];
  },
});
