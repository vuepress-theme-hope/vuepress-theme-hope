import {
  useEventListener,
  usePreferredDark,
  useStorage,
  watchImmediate,
} from "@vueuse/core";
import type { App, ComputedRef, InjectionKey, Ref } from "vue";
import { computed, inject, onMounted, watchEffect } from "vue";

import { useTheme } from "@theme-hope/composables/useTheme";

import type { DarkModeOptions } from "../../shared/index.js";

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
  const isDarkPreferred = usePreferredDark();
  const theme = useTheme();
  const config = computed(() => theme.value.darkmode ?? "switch");

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

  useEventListener("beforeprint", () => {
    if (isDarkMode.value)
      document.documentElement.setAttribute("data-theme", "light");
  });

  useEventListener("afterprint", () => {
    if (isDarkMode.value)
      document.documentElement.setAttribute("data-theme", "dark");
  });

  onMounted(() => {
    watchImmediate(isDarkMode, (isDarkMode) => {
      document.documentElement.setAttribute(
        "data-theme",
        isDarkMode ? "dark" : "light",
      );
    });
  });
};

declare module "vue" {
  export interface ComponentCustomProperties {
    $isDarkMode: boolean;
  }
}
