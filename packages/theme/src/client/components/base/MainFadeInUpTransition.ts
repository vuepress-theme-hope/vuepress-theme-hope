import type { Slot } from "@vuepress/helper/client";
import { RenderDefault } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { Transition, defineComponent, h } from "vue";

import { usePure } from "@theme-hope/composables/usePure";
import { scrollPromise } from "@theme-hope/utils/scrollPromise";

import "@vuepress/helper/transition/fade-in-up.css";

export default defineComponent({
  name: "MainFadeInUpTransition",

  slots: Object as SlotsType<{
    default?: Slot;
  }>,

  setup(_props, { slots }) {
    const pure = usePure();

    return (): VNode =>
      pure.value
        ? h(RenderDefault, {}, slots.default)
        : h(
            Transition,
            {
              name: "fade-in-up",
              mode: "out-in",
              // Handle scrollBehavior with transition
              onBeforeEnter: scrollPromise.resolve,
              onBeforeLeave: scrollPromise.pending,
            },
            slots.default,
          );
  },
});
