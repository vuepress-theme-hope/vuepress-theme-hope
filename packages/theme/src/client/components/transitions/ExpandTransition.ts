import { Transition, defineComponent, h } from "vue";
import type { VNode } from "vue";

export default defineComponent({
  name: "ExpandTransition",

  setup(_props, { slots }) {
    const setHeight = (items: Element): void => {
      // explicitly set height so that it can be transitioned
      (items as HTMLElement).style.height = `${items.scrollHeight}px`;
    };

    const unsetHeight = (items: Element): void => {
      (items as HTMLElement).style.height = "";
    };

    return (): VNode =>
      h(
        Transition,
        {
          name: "expand",
          onEnter: setHeight,
          onAfterEnter: unsetHeight,
          onBeforeLeave: unsetHeight,
        },
        { default: () => slots.default?.() }
      );
  },
});
