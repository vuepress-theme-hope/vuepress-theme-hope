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
      h("div", { class: "vp-playground" }, [
        h("div", { class: "vp-playground-header" }, [
          props.title
            ? h(
                "div",
                { class: "vp-playground-title" },
                decodeURIComponent(props.title)
              )
            : null,
          h("div", { class: "vp-playground-actions" }, [
            h("a", {
              class: "vp-playground-action",
              href: decodeURIComponent(props.link),
              target: "_blank",
              innerHTML: PLAY_SVG,
            }),
          ]),
        ]),
        h(
          "div",
          { class: "vp-playground-container" },
          h("iframe", {
            src: decodeURIComponent(props.link),
          })
        ),
      ]),
    ];
  },
});
