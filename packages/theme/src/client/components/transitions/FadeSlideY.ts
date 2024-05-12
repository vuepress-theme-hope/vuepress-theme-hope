import type { FunctionalComponent, VNode } from "vue";
import { Transition, h } from "vue";

import { scrollPromise } from "@theme-hope/utils/index";

import "../../styles/fade-slide-y.scss";

export const FadeSlideY: FunctionalComponent<
  Record<never, never>,
  Record<never, never>,
  { default: () => VNode }
> = (_props, { slots }): VNode =>
  h(
    Transition,
    {
      name: "fade-slide-y",
      mode: "out-in",
      // Handle scrollBehavior with transition
      onBeforeEnter: scrollPromise.resolve,
      onBeforeLeave: scrollPromise.pending,
    },
    () => slots.default(),
  );

FadeSlideY.displayName = "FadeSlideY";
