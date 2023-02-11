import { type VNode, defineComponent, h } from "vue";

import { PLAY_SVG } from "./icons.js";

import "../styles/playground.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Playground",

  props: {
    /**
     * Playground title
     *
     * 演示标题
     */
    title: { type: String, default: "" },

    /**
     * Playground link
     *
     * 演示链接
     */
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
          { class: "playground-container" },
          h("iframe", {
            src: decodeURIComponent(props.link),
          })
        ),
      ]),
    ];
  },
});
