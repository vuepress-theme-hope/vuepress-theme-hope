import { usePageData } from "@vuepress/client";
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

import { useWindowSize } from "@theme-hope/composables/index";
import NavScreenLinks from "@theme-hope/modules/navbar/components/NavScreenLinks";
import OutlookSettings from "@theme-hope/modules/outlook/components/OutlookSettings";

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

  emits: ["close"],

  slots: Object as SlotsType<{
    before?: () => VNode | VNode[];
    after?: () => VNode | VNode[];
  }>,

  setup(props, { emit, slots }) {
    const page = usePageData();
    const { isMobile } = useWindowSize();

    const body = shallowRef<HTMLElement>();
    const isLocked = useScrollLock(body);

    onMounted(() => {
      body.value = document.body;

      watch(isMobile, (value) => {
        if (!value && props.show) {
          isLocked.value = false;
          emit("close");
        }
      });
      watch(
        () => page.value.path,
        () => {
          isLocked.value = false;
          emit("close");
        },
      );
    });

    onUnmounted(() => {
      isLocked.value = false;
    });

    return (): VNode =>
      h(
        Transition,
        {
          name: "fade",
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
                { id: "nav-screen" },
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
