import { useEventListener, useResizeObserver, useToggle } from "@vueuse/core";
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
    title: String,
  },

  slots: Object as SlotsType<{
    default: () => VNode[];
    code: () => VNode[];
  }>,

  setup(props, { slots }) {
    const [isExpanded, toggleIsExpand] = useToggle(false);
    const codeContainer = shallowRef<HTMLDivElement>();
    const height = ref("0");

    let previousState: boolean | null = null;

    useEventListener("beforeprint", () => {
      toggleIsExpand(true);
    });

    useEventListener("afterprint", () => {
      if (previousState !== null) {
        toggleIsExpand(previousState);
      }

      previousState = null;
    });

    useResizeObserver(codeContainer, () => {
      if (isExpanded.value) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        height.value = `${codeContainer.value!.clientHeight + 14}px`;
      }
    });

    return (): VNode =>
      h("div", { class: "vp-container vp-md-demo", id: props.id }, [
        h("div", { class: "vp-container-header" }, [
          h("button", {
            type: "button",
            title: "toggle",
            class: [
              "vp-md-demo-toggle-button",
              isExpanded.value ? "down" : "end",
            ],
            onClick: () => {
              height.value = isExpanded.value
                ? "0"
                : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  `${codeContainer.value!.clientHeight + 14}px`;
              toggleIsExpand();
            },
          }),
          props.title
            ? h(
                "div",
                { class: "vp-container-title" },
                decodeURIComponent(props.title),
              )
            : null,
        ]),

        h("div", { class: "vp-md-demo-display" }, slots.default()),

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
            slots.code(),
          ),
        ),
      ]);
  },
});
