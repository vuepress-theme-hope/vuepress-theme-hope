import { usePreferredDark, useStorage } from "@vueuse/core";
import {
  computed,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  provide,
  watch,
} from "vue";
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { app } = getCurrentInstance()!.appContext;
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

  provide(darkModeSymbol, { isDarkMode, status: darkmodeStorage });

  updateDarkModeAttr(isDarkMode);

  // provide global helpers
  if (!("$isDarkMode" in app.config.globalProperties))
    Object.defineProperties(app.config.globalProperties, {
      $isDarkMode: { get: () => isDarkMode.value },
    });
};

declare module "vue" {
  export interface ComponentCustomProperties {
    $isDarkmode: boolean;
  }
}
