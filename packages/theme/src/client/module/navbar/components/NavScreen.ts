import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import {
  Transition,
  defineComponent,
  h,
  ref,
  onBeforeUnmount,
  onMounted,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import { useThemeData } from "@theme-hope/composables";
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

  emits: ["close"],

  setup(props, { emit, slots }) {
    const themeData = useThemeData();
    const route = useRoute();
    const screen = ref<HTMLElement>();

    const handler = (): void => {
      if (
        window.innerWidth > (themeData.value.mobileBreakPoint || 719) &&
        props.active
      ) {
        clearAllBodyScrollLocks();
        emit("close");
      }
    };

    watch(
      () => route.path,
      () => {
        clearAllBodyScrollLocks();
        emit("close");
      }
    );

    onMounted(() => {
      window.addEventListener("orientationchange", handler, false);
      window.addEventListener("resize", handler, false);
    });

    onBeforeUnmount(() => {
      clearAllBodyScrollLocks();
      window.removeEventListener("orientationchange", handler, false);
      window.removeEventListener("resize", handler, false);
    });

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
