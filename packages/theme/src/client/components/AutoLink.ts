import type { PropType, SlotsType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import { AutoLink } from "vuepress/client";

import type { AutoLinkOptions } from "../../shared/index.js";

export default defineComponent({
  name: "AutoLink",

  props: {
    /**
     * Autolink config
     */
    config: {
      type: Object as PropType<AutoLinkOptions>,
      required: true,
    },

    /**
     * Whether icon should not fix width
     */
    iconSizing: {
      type: String as PropType<"height" | "width" | "both">,
      default: "both",
    },
  },

  emits: ["focusout"],

  slots: Object as SlotsType<{
    before?: () => VNode[] | VNode | null;
    after?: () => VNode[] | VNode | null;
    default?: () => VNode[] | VNode;
  }>,

  setup(props, { emit, slots }) {
    return (): VNode => {
      const { icon } = props.config;

      return h(
        AutoLink,
        {
          ...props, // Class needs to be merged manually
          onFocusout: () => {
            emit("focusout");
          },
        },
        {
          default: slots.default,
          before:
            slots.before ??
            (icon
              ? (): VNode | null =>
                  h(resolveComponent("VPIcon"), {
                    icon,
                    sizing: props.iconSizing,
                  })
              : null),
          after: slots.after,
        },
      );
    };
  },
});
