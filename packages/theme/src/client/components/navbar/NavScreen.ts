import type { Slot } from "@vuepress/helper/client";
import { useScrollLock } from "@vueuse/core";
import type { SlotsType, VNode } from "vue";
import {
  Transition,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
} from "vue";
import { onContentUpdated, useRoute } from "vuepress/client";

import AppearanceSettings from "@theme-hope/components/appearance/AppearanceSettings";
import NavScreenLinks from "@theme-hope/components/navbar/NavScreenLinks";
import { useWindowSize } from "@theme-hope/composables/useWindowSize";

import "@vuepress/helper/transition/fade-in-down.css";
import "../../styles/navbar/nav-screen.scss";

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

  slots: Object as SlotsType<{
    navScreenTop?: Slot;
    navScreenBottom?: Slot;
  }>,

  setup(props, { slots }) {
    const { isMobile } = useWindowSize();
    const route = useRoute();
    const body = shallowRef<HTMLElement>();
    const isLocked = useScrollLock(body);

    onContentUpdated(() => {
      isLocked.value = false;
    });

    watch(isMobile, (value) => {
      if (!value && props.show) isLocked.value = false;
    });

    // unlock the screen when route changes
    // this prevents NavScreen block contents when navbar has links within one route.
    watch(
      () => route.fullPath,
      () => {
        isLocked.value = false;
      },
    );

    onMounted(() => {
      body.value = document.body;
    });

    onUnmounted(() => {
      isLocked.value = false;
    });

    return (): VNode =>
      h(
        Transition,
        {
          name: "fade-in-down",
          onEnter: () => {
            isLocked.value = true;
          },
          onAfterLeave: () => {
            isLocked.value = false;
          },
        },
        () =>
          props.show
            ? h(
                "div",
                { id: "nav-screen", class: "vp-nav-screen" },
                h("div", { class: "vp-nav-screen-container" }, [
                  slots.navScreenTop?.(),
                  h(NavScreenLinks),
                  h(
                    "div",
                    { class: "vp-appearance-wrapper" },
                    h(AppearanceSettings),
                  ),
                  slots.navScreenBottom?.(),
                ]),
              )
            : null,
      );
  },
});
