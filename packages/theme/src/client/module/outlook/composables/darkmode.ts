import { usePreferredDark, useStorage } from "@vueuse/core";
import { computed, inject, onMounted, onUnmounted, provide, watch } from "vue";
import { useThemeData } from "@theme-hope/composables";

import type { InjectionKey, Ref, WritableComputedRef } from "vue";

export type DarkmodeStatus = "light" | "dark" | "auto";

export type DarkModeRef = WritableComputedRef<boolean>;

export type DarkModeStatusRef = Ref<DarkmodeStatus>;

export interface DarkMode {
  isDarkMode: DarkModeRef;
  status: DarkModeStatusRef;
}

export const darkModeSymbol: InjectionKey<DarkMode> = Symbol.for("darkMode");

/**
 * Inject dark mode global computed
 */
export const useDarkMode = (): DarkMode => {
  const darkmode = inject(darkModeSymbol);

  if (!darkmode) {
    throw new Error("useDarkMode() is called without provider.");
  }

  return darkmode;
};

export const updateDarkModeAttr = (isDarkMode: DarkModeRef): void => {
  const update = (isDark = isDarkMode.value): void => {
    const html = window?.document.querySelector("html");

    html?.setAttribute("data-theme", isDark ? "dark" : "light");
  };

  onMounted(() => {
    watch(isDarkMode, update, { immediate: true });
  });

  onUnmounted(() => update());
};

export const setupDarkMode = (): void => {
  const themeData = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const darkmodeStorage = useStorage<DarkmodeStatus>(
    "vuepress-theme-hope-scheme",
    "auto"
  );

  const isDarkMode = computed<boolean>(() => {
    const { darkmode } = themeData.value;

    // disable dark mode
    return darkmode === "disable"
      ? false
      : // force dark
      darkmode === "force-dark"
      ? true
      : // auto
      darkmode === "auto"
      ? isDarkPreferred.value
      : // switch
      darkmode === "switch"
      ? darkmodeStorage.value === "dark"
      : // auto-switch
        darkmodeStorage.value === "dark" ||
        (darkmodeStorage.value === "auto" && isDarkPreferred.value);
  });

  provide(darkModeSymbol, { isDarkMode, status: darkmodeStorage });

  updateDarkModeAttr(isDarkMode);
};
