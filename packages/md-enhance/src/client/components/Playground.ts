import { defineComponent, h } from "vue";

import { PLAY_SVG } from "./icons.js";

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
        h(
          "div",
          { class: "preview-container" },
          h("iframe", {
            class: "iframe-preview",
            src: decodeURIComponent(props.link),
          })
        ),
      ]),
    ];
  },
});
