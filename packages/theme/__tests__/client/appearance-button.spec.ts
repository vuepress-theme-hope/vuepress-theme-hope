// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import type { ClientConfig } from "vuepress/client";

import AppearanceButton from "@theme-hope/components/appearance/AppearanceButton";
import type { DarkmodeStatus } from "@theme-hope/composables/useDarkMode";
import { darkModeSymbol } from "@theme-hope/composables/useDarkMode";

import type { DarkModeOptions } from "../../src/shared/index.js";
import { mountTheme } from "./helpers.js";

// The multi-feature branch is only rendered when multiple theme colors exist
vi.mock(import("@theme-hope/components/appearance/ThemeColor"), async () => {
  const actual = await vi.importActual<Record<string, unknown>>(
    "@theme-hope/components/appearance/ThemeColor",
  );

  return { ...actual, hasMultipleThemeColors: true };
});

const darkModeClientConfig: ClientConfig = {
  enhance: ({ app }) => {
    app.provide(darkModeSymbol, {
      canToggle: computed(() => true),
      config: computed<DarkModeOptions>(() => "switch"),
      isDarkMode: computed(() => false),
      status: ref<DarkmodeStatus>("auto"),
    });
  },
};

const mountAppearanceButton = (): Promise<VueWrapper> =>
  mountTheme({
    clientConfigs: [darkModeClientConfig],
    content: defineComponent({
      setup: () => (): VNode => h(AppearanceButton),
    }),
  });

describe("appearance button", () => {
  it("renders an accessible trigger with an accessible name", async () => {
    const wrapper = await mountAppearanceButton();
    const button = wrapper.find("button.vp-appearance-button");

    expect(button.exists()).toBe(true);
    expect(button.attributes("aria-label")).toBe("Appearance");
    expect(button.attributes("aria-expanded")).toBe("false");
    expect(button.attributes("aria-controls")).toBe("appearance-dropdown");
    expect(button.attributes("tabindex")).toBeUndefined();
    expect(button.attributes("aria-hidden")).toBeUndefined();
    expect(wrapper.find("#appearance-dropdown").exists()).toBe(true);

    wrapper.unmount();
  });

  it("toggles the dropdown with the keyboard accessible button", async () => {
    const wrapper = await mountAppearanceButton();
    const button = wrapper.find("button.vp-appearance-button");

    await button.trigger("click");
    expect(button.attributes("aria-expanded")).toBe("true");
    expect(button.classes()).toContain("open");

    await button.trigger("click");
    expect(button.attributes("aria-expanded")).toBe("false");
    expect(button.classes()).not.toContain("open");

    wrapper.unmount();
  });

  it("closes on escape and restores focus to the trigger", async () => {
    const wrapper = await mountAppearanceButton();
    const button = wrapper.find("button.vp-appearance-button");

    await button.trigger("click");
    (button.element as HTMLElement).focus();
    await button.trigger("keydown", { key: "Escape" });

    expect(button.attributes("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(button.element);

    wrapper.unmount();
  });

  it("closes when focus leaves the menu", async () => {
    const wrapper = await mountAppearanceButton();
    const button = wrapper.find("button.vp-appearance-button");

    await button.trigger("click");
    await wrapper.find(".vp-appearance").trigger("focusout", {
      relatedTarget: document.body,
    });

    expect(button.attributes("aria-expanded")).toBe("false");

    wrapper.unmount();
  });
});
