import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import {
  Transition,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import { useWindowSize } from "@theme-hope/composables/index";
import NavScreenLinks from "@theme-hope/modules/navbar/components/NavScreenLinks";
import OutlookSettings from "@theme-hope/modules/outlook/components/OutlookSettings";

import type { VNode } from "vue";

import "../styles/nav-screen.scss";

export default defineComponent({
  name: "NavScreen",

  props: {
    /**
     * Whether to show the screen
     *
     * 是否显示
     */
    show: Boolean,
  },

  emits: {
    close: () => true,
  },

  setup(props, { emit, slots }) {
    const route = useRoute();
    const { isMobile } = useWindowSize();

    const screen = ref<HTMLElement>();

    onMounted(() => {
      watch(isMobile, (value) => {
        if (!value && props.show) {
          clearAllBodyScrollLocks();
          emit("close");
        }
      });

      watch(
        () => route.path,
        () => {
          clearAllBodyScrollLocks();
          emit("close");
        }
      );
    });

    onBeforeUnmount(() => {
      clearAllBodyScrollLocks();
    });

    return (): VNode =>
      h(
        Transition,
        {
          name: "fade",
          onEnter: () =>
            disableBodyScroll(screen.value!, { reserveScrollBarGap: true }),
          onAfterLeave: () => clearAllBodyScrollLocks(),
        },
        () =>
          props.show
            ? h(
                "div",
                { id: "nav-screen", ref: screen },
                h("div", { class: "container" }, [
                  slots["before"]?.(),
                  h(NavScreenLinks),
                  h("div", { class: "outlook-wrapper" }, h(OutlookSettings)),
                  slots["after"]?.(),
                ])
              )
            : null
      );
  },
});
