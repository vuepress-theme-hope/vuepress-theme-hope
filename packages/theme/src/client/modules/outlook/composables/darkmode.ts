import { usePreferredDark, useStorage } from "@vueuse/core";
import type { App, ComputedRef, InjectionKey, Ref } from "vue";
import { computed, inject, onMounted, watch } from "vue";

import { useThemeData } from "@theme-hope/composables/index";

import type { DarkmodeOptions } from "../../../../shared/index.js";

declare const __VUEPRESS_DEV__: boolean;

export type DarkmodeStatus = "light" | "dark" | "auto";

export type DarkModeRef = ComputedRef<boolean>;

export type DarkModeStatusRef = Ref<DarkmodeStatus>;

export interface DarkMode {
  isDarkmode: DarkModeRef;
  config: ComputedRef<DarkmodeOptions>;
  status: DarkModeStatusRef;
  canToggle: ComputedRef<boolean>;
}

export const darkModeSymbol: InjectionKey<DarkMode> = Symbol(
  __VUEPRESS_DEV__ ? "darkMode" : "",
);

/**
 * Inject dark mode global computed
 */
export const useDarkmode = (): DarkMode => {
  const darkmode = inject(darkModeSymbol);

  if (!darkmode) throw new Error("useDarkmode() is called without provider.");

  return darkmode;
};

export const injectDarkmode = (app: App): void => {
  const themeData = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const status = useStorage<DarkmodeStatus>(
    "vuepress-theme-hope-scheme",
    "auto",
  );

  const config = computed(() => themeData.value.darkmode || "switch");

  const isDarkmode = computed(() => {
    const darkmode = config.value;

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
            ? status.value === "dark"
            : // switch
              status.value === "dark" ||
              (status.value === "auto" && isDarkPreferred.value);
  });

  const canToggle = computed(() => {
    const darkmode = config.value;

    return darkmode === "switch" || darkmode === "toggle";
  });

  app.provide(darkModeSymbol, {
    canToggle,
    config,
    isDarkmode,
    status,
  });

  // provide global helpers
  Object.defineProperties(app.config.globalProperties, {
    $isDarkmode: { get: () => isDarkmode.value },
  });
};

export const setupDarkmode = (): void => {
  const { isDarkmode } = useDarkmode();

  const updateDOM = (isDark = isDarkmode.value): void =>
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );

  onMounted(() => {
    watch(isDarkmode, updateDOM, { immediate: true });
  });
};

declare module "vue" {
  export interface ComponentCustomProperties {
    $isDarkmode: boolean;
  }
}
