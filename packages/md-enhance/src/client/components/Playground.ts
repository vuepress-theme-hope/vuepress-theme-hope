import { defineComponent, h, ref } from "vue";

import { LOADING_SVG, PLAY_SVG } from "./icons.js";

import type { VNode } from "vue";

import "../styles/playground.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Playground",

  props: {
    title: { type: String, default: "" },
    link: { type: String, required: true },
  },

  setup(props) {
    const loading = ref(true);

    return (): (VNode | null)[] => [
      h("div", { class: "playground-wrapper" }, [
        h("div", { class: "title-wrapper" }, [
          props.title
            ? h("div", { class: "title" }, decodeURIComponent(props.title))
            : null,
          h("div", { class: "actions" }, [
            h("a", {
              class: "action",
              href: decodeURIComponent(props.link),
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
            class: "iframe-preview",
            src: decodeURIComponent(props.link),
            onload: () => {
              loading.value = false;
            },
          }),
        ]),
      ]),
    ];
  },
});
