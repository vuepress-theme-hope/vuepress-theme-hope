import { usePreferredDark, useStorage } from "@vueuse/core";
import type { App, ComputedRef, InjectionKey, Ref } from "vue";
import { computed, inject, onMounted, watch, watchEffect } from "vue";

import { useThemeData } from "@theme-hope/composables/index";

import type { DarkModeOptions } from "../../../../shared/index.js";

declare const __VUEPRESS_DEV__: boolean;

export type DarkmodeStatus = "light" | "dark" | "auto";

export type DarkModeRef = ComputedRef<boolean>;

export type DarkModeStatusRef = Ref<DarkmodeStatus>;

export interface DarkMode {
  isDarkMode: DarkModeRef;
  config: ComputedRef<DarkModeOptions>;
  status: DarkModeStatusRef;
  canToggle: ComputedRef<boolean>;
}

export const darkModeSymbol: InjectionKey<DarkMode> = Symbol(
  __VUEPRESS_DEV__ ? "darkMode" : "",
);

/**
 * Inject dark mode global computed
 */
export const useDarkMode = (): DarkMode => {
  const darkMode = inject(darkModeSymbol);

  if (!darkMode) throw new Error("useDarkMode() is called without provider.");

  return darkMode;
};

export const injectDarkMode = (app: App): void => {
  const themeData = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const config = computed(() => themeData.value.darkmode ?? "switch");

  const status = useStorage<DarkmodeStatus>(
    "vuepress-theme-hope-scheme",
    "auto",
  );

  const isDarkMode = computed(() => {
    const darkModeConfig = config.value;

    // Disable darkmode
    return darkModeConfig === "disable"
      ? false
      : // Force darkmode
        darkModeConfig === "enable"
        ? true
        : // Auto
          darkModeConfig === "auto"
          ? isDarkPreferred.value
          : // Toggle
            darkModeConfig === "toggle"
            ? status.value === "dark"
            : // Switch
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
    isDarkMode,
    status,
  });

  // Provide global helpers
  Object.defineProperties(app.config.globalProperties, {
    $isDarkMode: { get: () => isDarkMode.value },
  });
};

export const setupDarkMode = (): void => {
  const { config, isDarkMode, status } = useDarkMode();

  watchEffect(() => {
    if (config.value === "disable") status.value = "light";
    else if (config.value === "enable") status.value = "dark";
    else if (config.value === "toggle" && status.value === "auto")
      status.value = "light";
  });

  onMounted(() => {
    watch(
      isDarkMode,
      (isDarkMode) => {
        document.documentElement.setAttribute(
          "data-theme",
          isDarkMode ? "dark" : "light",
        );
      },
      { immediate: true },
    );
  });
};

declare module "vue" {
  export interface ComponentCustomProperties {
    $isDarkMode: boolean;
  }
}
