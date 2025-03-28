import type { FunctionalComponent, VNode } from "vue";
import { Transition, h } from "vue";

import { scrollPromise } from "@theme-hope/utils/index";

import "@vuepress/helper/transition/fade-in-up.css";

export const FadeInUpTransition: FunctionalComponent<
  Record<never, never>,
  Record<never, never>,
  { default: () => VNode }
> = (_props, { slots }): VNode =>
  h(
    Transition,
    {
      name: "fade-in-up",
      mode: "out-in",
      // Handle scrollBehavior with transition
      onBeforeEnter: scrollPromise.resolve,
      onBeforeLeave: scrollPromise.pending,
    },
    () => slots.default(),
  );

FadeInUpTransition.displayName = "FadeInUpTransition";
