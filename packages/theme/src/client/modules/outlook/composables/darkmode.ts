import { usePreferredDark, useStorage } from "@vueuse/core";
import { computed, inject, onMounted, watch } from "vue";
import { useThemeData } from "@theme-hope/composables";

import type { App, InjectionKey, Ref, WritableComputedRef } from "vue";

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

export const injectDarkMode = (app: App): void => {
  const themeData = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const darkmodeStorage = useStorage<DarkmodeStatus>(
    "vuepress-theme-hope-scheme",
    "auto"
  );

  const isDarkMode = computed<boolean>(() => {
    const { darkmode } = themeData.value;

    // disable darkmode
    return darkmode === "disable"
      ? false
      : // force darkmode
      darkmode === "enable"
      ? true
      : // auto
      darkmode === "auto"
      ? isDarkPreferred.value
      : // toggle
      darkmode === "toggle"
      ? darkmodeStorage.value === "dark"
      : // switch
        darkmodeStorage.value === "dark" ||
        (darkmodeStorage.value === "auto" && isDarkPreferred.value);
  });

  app.provide(darkModeSymbol, { isDarkMode, status: darkmodeStorage });

  // provide global helpers
  Object.defineProperties(app.config.globalProperties, {
    $isDarkMode: { get: () => isDarkMode.value },
  });
};

export const setupDarkMode = (): void => {
  const { isDarkMode } = useDarkMode();

  const updateDOM = (isDark = isDarkMode.value): void => {
    const html = window?.document.querySelector("html");

    html?.setAttribute("data-theme", isDark ? "dark" : "light");
  };

  onMounted(() => {
    watch(isDarkMode, updateDOM, { immediate: true });
  });
};

declare module "vue" {
  export interface ComponentCustomProperties {
    $isDarkMode: boolean;
  }
}
