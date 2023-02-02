import {
  type PropType,
  Transition,
  TransitionGroup,
  type VNode,
  defineComponent,
  h,
} from "vue";

export default defineComponent({
  name: "DropTransition",

  props: {
    /**
     * @description Transition type
     */
    type: {
      type: String as PropType<"single" | "group">,
      default: "single",
    },

    /**
     * @description Transition delay
     */
    delay: { type: Number, default: 0 },

    /**
     * @description Transition duration
     */
    duration: { type: Number, default: 0.25 },

    /**
     * @description appear
     */
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
