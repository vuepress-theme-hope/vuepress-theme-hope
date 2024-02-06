import type { SlotsType, VNode } from "vue";
import { Transition, defineComponent, h } from "vue";

import { useScrollPromise } from "@theme-hope/composables/index";

import "../../styles/fade-slide-y.scss";

export default defineComponent({
  name: "FadeSlideY",

  slots: Object as SlotsType<{
    default: () => VNode;
  }>,

  setup(_props, { slots }) {
    // Handle scrollBehavior with transition
    const { resolve: onBeforeEnter, pending: onBeforeLeave } =
      useScrollPromise();

    return (): VNode =>
      h(
        Transition,
        {
          name: "fade-slide-y",
          mode: "out-in",
          onBeforeEnter,
          onBeforeLeave,
        },
        () => slots.default?.(),
      );
  },
});
