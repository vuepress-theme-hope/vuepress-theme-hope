import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { Transition, defineComponent, h, ref } from "vue";

import NavScreenLinks from "@theme-hope/module/navbar/components/NavScreenLinks";
import OutlookSettings from "@theme-hope/module/outlook/components/OutlookSettings";

import type { VNode } from "vue";

import "../styles/nav-screen.scss";

export default defineComponent({
  name: "NavScreen",

  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const screen = ref<HTMLElement>();

    return (): VNode =>
      h(
        Transition,
        {
          name: "fade",
          onEnter: () =>
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            disableBodyScroll(screen.value!, { reserveScrollBarGap: true }),
          onAfterLeave: () => clearAllBodyScrollLocks(),
        },
        () =>
          props.active
            ? h(
                "div",
                { id: "nav-screen", ref: screen },
                h("div", { class: "container" }, [
                  slots.before?.(),
                  h(NavScreenLinks),
                  h("div", { class: "outlook-wrapper" }, h(OutlookSettings)),
                  slots.after?.(),
                ])
              )
            : null
      );
  },
});
