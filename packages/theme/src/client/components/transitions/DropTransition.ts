import type { SlotsType, VNode } from "vue";
import { Transition, TransitionGroup, defineComponent, h } from "vue";

export const DropTransition = defineComponent({
  name: "DropTransition",

  props: {
    /**
     * Transition delay
     */
    delay: { type: Number, default: 0 },

    /**
     * Transition duration
     */
    duration: { type: Number, default: 0.25 },

    /**
     * Whether to use TransitionGroup
     */
    group: Boolean,

    /**
     * Whether to use appear
     */
    appear: Boolean,
  },

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode;
  }>,

  setup(props, { slots }) {
    const setStyle = (el: Element): void => {
      (el as HTMLElement).style.transition =
        `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      (el as HTMLElement).style.transform = "translateY(-20px)";
      (el as HTMLElement).style.opacity = "0";
    };

    const unsetStyle = (el: Element): void => {
      (el as HTMLElement).style.transform = "translateY(0)";
      (el as HTMLElement).style.opacity = "1";
    };

    return (): VNode => {
      const attrs = {
        name: "drop",
        appear: props.appear,
        onAppear: setStyle,
        onAfterAppear: unsetStyle,
        onEnter: setStyle,
        onAfterEnter: unsetStyle,
        onBeforeLeave: setStyle,
      };
      const children = (): VNode | VNode[] => slots.default();

      return props.group
        ? h(TransitionGroup, attrs, children)
        : h(Transition, attrs, children);
    };
  },
});
