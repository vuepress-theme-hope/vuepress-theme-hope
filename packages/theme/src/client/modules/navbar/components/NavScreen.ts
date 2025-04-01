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
import { onContentUpdated } from "vuepress/client";

import { useWindowSize } from "@theme-hope/composables/index";
import NavScreenLinks from "@theme-hope/modules/navbar/components/NavScreenLinks";
import OutlookSettings from "@theme-hope/modules/outlook/components/OutlookSettings";

import "@vuepress/helper/transition/fade-in-down.css";
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

  slots: Object as SlotsType<{
    before?: () => VNode[] | VNode | null;
    after?: () => VNode[] | VNode | null;
  }>,

  setup(props, { slots }) {
    const { isMobile } = useWindowSize();

    const body = shallowRef<HTMLElement>();
    const isLocked = useScrollLock(body);

    onContentUpdated(() => {
      isLocked.value = false;
    });

    watch(isMobile, (value) => {
      if (!value && props.show) isLocked.value = false;
    });

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
                  slots.before?.(),
                  h(NavScreenLinks),
                  h("div", { class: "vp-outlook-wrapper" }, h(OutlookSettings)),
                  slots.after?.(),
                ]),
              )
            : null,
      );
  },
});
