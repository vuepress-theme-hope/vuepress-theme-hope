import { useEventListener, useToggle } from "@vueuse/core";
import type { SlotsType, VNode } from "vue";
import { defineComponent, h, ref, shallowRef } from "vue";

import "../styles/md-demo.scss";

export default defineComponent({
  name: "MdDemo",

  props: {
    /**
     * Markdown demo id
     *
     * Markdown 代码演示 id
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * Markdown demo title
     *
     * Markdown 演示标题
     */
    title: {
      type: String,
      default: "",
    },
  },

  slots: Object as SlotsType<{
    default: () => VNode[];
    code: () => VNode[];
  }>,

  setup(props, { slots }) {
    const [isExpanded, toggleIsExpand] = useToggle(false);
    const codeContainer = shallowRef<HTMLDivElement>();
    const height = ref("0");

    useEventListener("beforeprint", () => {
      toggleIsExpand(true);
    });

    return (): VNode =>
      h("div", { class: "vp-md-demo", id: props.id }, [
        h("div", { class: "vp-md-demo-header" }, [
          h("button", {
            type: "button",
            title: "toggle",
            "aria-hidden": true,
            class: [
              "vp-md-demo-toggle-button",
              isExpanded.value ? "down" : "end",
            ],
            onClick: () => {
              height.value = isExpanded.value
                ? "0"
                : `${codeContainer.value!.clientHeight + 13.8}px`;
              toggleIsExpand();
            },
          }),
          props.title ? decodeURIComponent(props.title) : null,
        ]),

        h("div", { class: "vp-md-demo-display" }, slots.default?.()),

        h(
          "div",
          {
            class: "vp-md-demo-code-wrapper",
            style: { height: height.value },
          },
          h(
            "div",
            {
              ref: codeContainer,
              class: "vp-md-demo-codes",
            },
            slots.code?.(),
          ),
        ),
      ]);
  },
});
