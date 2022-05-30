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
    appear: Boolean,
  },

  setup(props, { slots }) {
    const setStyle = (item: HTMLElement): void => {
      item.style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      item.style.transform = "translateY(-20px)";
      item.style.opacity = "0";
    };

    const unsetStyle = (item: HTMLElement): void => {
      item.style.transform = "translateY(0)";
      item.style.opacity = "1";
    };

    return (): VNode =>
      h(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        props.type === "single" ? Transition : TransitionGroup,
        {
          name: "drop",
          appear: props.appear,
          onAppear: setStyle,
          onAfterAppear: unsetStyle,
          onEnter: setStyle,
          onAfterEnter: unsetStyle,
          onBeforeLeave: setStyle,
        },
        () => slots["default"]?.()
      );
  },
});
