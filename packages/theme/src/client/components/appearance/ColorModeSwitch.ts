import type { FunctionalComponent, VNode } from "vue";
import { defineComponent, h, nextTick } from "vue";
import { IconBase } from "vuepress-shared/client";

import type { DarkmodeStatus } from "@theme-hope/composables/useDarkMode";
import { useDarkMode } from "@theme-hope/composables/useDarkMode";
import { usePure } from "@theme-hope/composables/usePure";

import "../../styles/appearance/color-mode-switch.scss";

const AutoColorModeIcon: FunctionalComponent = () =>
  h(IconBase, { name: "auto" }, () =>
    h("path", {
      d: "M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z",
    }),
  );

AutoColorModeIcon.displayName = "AutoColorModeIcon";

const LightColorModeIcon: FunctionalComponent = () =>
  h(IconBase, { name: "light" }, () =>
    h("path", {
      d: "M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z",
    }),
  );

LightColorModeIcon.displayName = "LightColorModeIcon";

const DarkColorModeIcon: FunctionalComponent = () =>
  h(IconBase, { name: "dark" }, () =>
    h("path", {
      d: "M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z",
    }),
  );

DarkColorModeIcon.displayName = "DarkColorModeIcon";

export default defineComponent({
  name: "ColorModeSwitch",

  setup() {
    const { config, isDarkMode, status } = useDarkMode();
    const isPure = usePure();

    const updateDarkmodeStatus = (): void => {
      if (config.value === "switch")
        status.value = (
          {
            light: "dark",
            dark: "auto",
            auto: "light",
          } as Record<DarkmodeStatus, DarkmodeStatus>
        )[status.value];
      else status.value = status.value === "light" ? "dark" : "light";
    };

    const toggleDarkmode = async (event: MouseEvent): Promise<void> => {
      const useViewTransition =
        // @ts-expect-error: Providing backward compatibility
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        document.startViewTransition &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !isPure.value;

      if (!useViewTransition) {
        updateDarkmodeStatus();

        return;
      }

      const x = event.clientX;
      const y = event.clientY;

      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      );

      const oldStatus = isDarkMode.value;

      const transition = document.startViewTransition(async () => {
        updateDarkmodeStatus();
        await nextTick();
      });

      await transition.ready;

      if (isDarkMode.value !== oldStatus)
        document.documentElement.animate(
          {
            clipPath: isDarkMode.value
              ? [
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                  `circle(0px at ${x}px ${y}px)`,
                ]
              : [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
          },
          {
            duration: 400,
            pseudoElement: isDarkMode.value
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          },
        );
    };

    return (): VNode =>
      h(
        "button",
        {
          type: "button",
          class: "vp-color-mode-switch",
          id: "color-mode-switch",
          onClick: toggleDarkmode,
        },
        [
          h(AutoColorModeIcon, {
            style: {
              display: status.value === "auto" ? "block" : "none",
            },
          }),
          h(DarkColorModeIcon, {
            style: {
              display: status.value === "dark" ? "block" : "none",
            },
          }),
          h(LightColorModeIcon, {
            style: {
              display: status.value === "light" ? "block" : "none",
            },
          }),
        ],
      );
  },
});
