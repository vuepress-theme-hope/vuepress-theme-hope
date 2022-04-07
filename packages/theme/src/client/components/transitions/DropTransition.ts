import { Transition, TransitionGroup, defineComponent, h } from "vue";

import type { PropType, VNode } from "vue";

export default defineComponent({
  name: "DropTransition",

  components: {
    Transition,
    TransitionGroup,
  },

  props: {
    type: { type: String as PropType<"single" | "group">, default: "single" },
    delay: { type: Number, default: 0 },
    duration: { type: Number, default: 0.25 },
  },

  setup(props, { slots }) {
    const setStyle = (item: Element): void => {
      (
        item as HTMLElement
      ).style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      (item as HTMLElement).style.transform = "translateY(-20px)";
      (item as HTMLElement).style.opacity = "0";
    };

    const unsetStyle = (item: Element): void => {
      (item as HTMLElement).style.transform = "translateY(0)";
      (item as HTMLElement).style.opacity = "1";
    };

    return (): VNode =>
      props.type === "single"
        ? h(
            Transition,
            {
              name: "drop",
              appear: true,
              onAppear: setStyle,
              onAfterAppear: unsetStyle,
              onEnter: setStyle,
              onAfterEnter: unsetStyle,
              onBeforeLeave: setStyle,
            },
            () => slots.default?.()
          )
        : h(
            TransitionGroup,
            {
              name: "drop",
              appear: true,
              onAppear: setStyle,
              onAfterAppear: unsetStyle,
              onEnter: setStyle,
              onAfterEnter: unsetStyle,
              onBeforeLeave: setStyle,
            },
            () => slots.default?.()
          );
  },
});
