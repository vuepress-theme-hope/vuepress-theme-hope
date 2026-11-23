import type { Slot } from "@vuepress/helper/client";
import { useEventListener, useScrollLock } from "@vueuse/core";
import type { SlotsType, VNode } from "vue";
import {
  Transition,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
} from "vue";

import AppearanceSettings from "@theme-hope/components/appearance/AppearanceSettings";
import NavScreenLinks from "@theme-hope/components/navbar/NavScreenLinks";
import { useThemeLocale } from "@theme-hope/composables/useTheme";
import { useWindowSize } from "@theme-hope/composables/useWindowSize";

import "@vuepress/helper/transition/fade-in-down.css";
import "../../styles/navbar/nav-screen.scss";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
    navScreenTop?: Slot;
    navScreenBottom?: Slot;
  }>,

  setup(props, { emit, slots }) {
    const themeLocale = useThemeLocale();
    const { isMobile } = useWindowSize();
    const body = shallowRef<HTMLElement>();
    const container = shallowRef<HTMLElement>();
    const isLocked = useScrollLock(body);

    const getFocusableElements = (): HTMLElement[] =>
      [...(container.value?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [])].filter(
        (element) => {
          const style = globalThis.getComputedStyle(element);

          return style.display !== "none" && style.visibility !== "hidden";
        },
      );

    watch(
      () => props.show,
      (show) => {
        isLocked.value = show;

        if (show) {
          void nextTick().then(() => {
            (getFocusableElements()[0] ?? container.value)?.focus();
          });
        }
      },
      { immediate: true },
    );

    useEventListener("keydown", (event: KeyboardEvent) => {
      if (!props.show) return;

      if (event.key === "Escape") {
        event.preventDefault();
        emit("close");

        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements();

      if (!focusable.length) return;

      const [first] = focusable;
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === container.value)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    watch(isMobile, (value) => {
      if (!value && props.show) isLocked.value = false;
    });

    onMounted(() => {
      body.value = document.body;

      if (props.show) isLocked.value = true;
    });

    onUnmounted(() => {
      isLocked.value = false;
    });

    return (): VNode =>
      h(
        Transition,
        {
          name: "fade-in-down",
          appear: true,
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
                {
                  id: "nav-screen",
                  ref: container,
                  class: "vp-nav-screen",
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-label": themeLocale.value.navbarLocales.navScreen ?? "Navigation",
                  tabindex: "-1",
                },
                h("div", { class: "vp-nav-screen-container" }, [
                  slots.navScreenTop?.(),
                  h(NavScreenLinks),
                  h("div", { class: "vp-appearance-wrapper" }, h(AppearanceSettings)),
                  slots.navScreenBottom?.(),
                ]),
              )
            : null,
      );
  },
});
