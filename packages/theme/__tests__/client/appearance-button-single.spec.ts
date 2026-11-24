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

const { toggleFullscreen } = vi.hoisted(() => ({
  toggleFullscreen: vi.fn<() => Promise<void>>(async () => {}),
}));

vi.mock(import("@vueuse/core"), async (): Promise<Record<string, unknown>> => {
  const { computed: vueComputed } = await import("vue");
  const actual = await vi.importActual<Record<string, unknown>>("@vueuse/core");

  return {
    ...actual,
    useFullscreen: (): Record<string, unknown> => ({
      isFullscreen: vueComputed(() => false),
      isSupported: vueComputed(() => true),
      toggle: toggleFullscreen,
    }),
  };
});

const darkModeClientConfig = (canToggle: boolean): ClientConfig => ({
  enhance: ({ app }) => {
    app.provide(darkModeSymbol, {
      canToggle: computed(() => canToggle),
      config: computed<DarkModeOptions>(() => "switch"),
      isDarkMode: computed(() => false),
      status: ref<DarkmodeStatus>("light"),
    });
  },
});

const mountAppearance = (options: {
  canToggle: boolean;
  fullscreen?: boolean;
}): Promise<VueWrapper> =>
  mountTheme({
    clientConfigs: [darkModeClientConfig(options.canToggle)],
    themeData: { fullscreen: options.fullscreen ?? false },
    content: defineComponent({
      setup: () => (): VNode => h(AppearanceButton),
    }),
  });

describe("appearance button with a single feature", () => {
  it("names the standalone color mode switch", async () => {
    const wrapper = await mountAppearance({ canToggle: true });

    const button = wrapper.find("button#color-mode-switch");

    expect(button.exists()).toBe(true);
    expect(button.attributes("aria-label")).toBe("Theme Mode");
    expect(wrapper.find(".vp-appearance-button").exists()).toBe(false);

    wrapper.unmount();
  });

  it("hides the standalone fullscreen control from assistive technology", async () => {
    const wrapper = await mountAppearance({ canToggle: false, fullscreen: true });
    const item = wrapper.find(".vp-nav-item");

    expect(item.attributes("aria-hidden")).toBe("true");
    expect(wrapper.find("button").exists()).toBe(false);
    expect((wrapper.find(".full-screen").element as HTMLElement).tagName).toBe("SPAN");
    expect(wrapper.find(".vp-appearance-button").exists()).toBe(false);
    expect(wrapper.findAll("button, a, input, [tabindex]")).toHaveLength(0);

    wrapper.unmount();
  });

  it("keeps the standalone fullscreen control clickable", async () => {
    const wrapper = await mountAppearance({ canToggle: false, fullscreen: true });

    (wrapper.find(".full-screen").element as HTMLElement).click();
    await wrapper.vm.$nextTick();

    expect(toggleFullscreen).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });
});
