// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import type { ClientConfig } from "vuepress/client";

import ThemeColor from "@theme-hope/components/appearance/ThemeColor";
import ThemeColorPicker from "@theme-hope/components/appearance/ThemeColorPicker";
import type { DarkmodeStatus } from "@theme-hope/composables/useDarkMode";
import { darkModeSymbol } from "@theme-hope/composables/useDarkMode";

import type { DarkModeOptions } from "../../src/shared/index.js";
import { mountTheme } from "./helpers.js";

vi.mock(import("../../src/client/styles/variables.module.scss"), () => ({
  default: {
    hasMultipleThemeColors: "true",
    "theme-1": "#f00",
  },
}));

const darkModeClientConfig: ClientConfig = {
  enhance: ({ app }) => {
    app.provide(darkModeSymbol, {
      canToggle: computed(() => true),
      config: computed<DarkModeOptions>(() => "switch"),
      isDarkMode: computed(() => false),
      status: ref<DarkmodeStatus>("light"),
    });
  },
};

const themeColors = { "theme-1": "#f00", "theme-2": "#0f0" };

const mountPicker = (): Promise<VueWrapper> =>
  mountTheme({
    clientConfigs: [darkModeClientConfig],
    content: defineComponent({
      setup: () => (): VNode => h(ThemeColorPicker, { themeColors }),
    }),
  });

describe("theme color picker", () => {
  it("renders decorative swatches outside the accessibility tree", async () => {
    localStorage.clear();

    const wrapper = await mountPicker();
    const list = wrapper.find("ul.vp-theme-color-picker");

    expect(list.attributes("aria-hidden")).toBe("true");
    expect(list.attributes("role")).toBeUndefined();
    expect(wrapper.find("button").exists()).toBe(false);
    expect(wrapper.findAll("li > span.theme-color")).toHaveLength(3);
    expect(wrapper.findAll("[tabindex]")).toHaveLength(0);
    expect(wrapper.findAll("button, a, input, [tabindex]")).toHaveLength(0);

    wrapper.unmount();
  });

  it("hides the whole theme color group", async () => {
    localStorage.clear();

    const wrapper = await mountTheme({
      clientConfigs: [darkModeClientConfig],
      content: defineComponent({
        setup: () => (): VNode => h(ThemeColor),
      }),
    });
    const group = wrapper.find(".vp-theme-color");

    expect(group.exists()).toBe(true);
    expect(group.attributes("aria-hidden")).toBe("true");
    expect(wrapper.find(".vp-theme-color-title").text()).toBe("Theme Color");
    expect(wrapper.findAll("button, a, input, [tabindex]")).toHaveLength(0);

    wrapper.unmount();
  });

  it("applies and clears a theme color", async () => {
    localStorage.clear();

    const wrapper = await mountPicker();
    const swatches = wrapper.findAll("li > span.theme-color");

    (swatches[1].element as HTMLElement).click();
    await wrapper.vm.$nextTick();

    expect(document.documentElement.classList.contains("theme-1")).toBe(true);
    expect(localStorage.getItem("VUEPRESS_THEME_COLOR")).toBe("theme-1");

    (swatches[0].element as HTMLElement).click();
    await wrapper.vm.$nextTick();

    expect(document.documentElement.classList.contains("theme-1")).toBe(false);
    expect(localStorage.getItem("VUEPRESS_THEME_COLOR")).toBeNull();

    wrapper.unmount();
  });
});
