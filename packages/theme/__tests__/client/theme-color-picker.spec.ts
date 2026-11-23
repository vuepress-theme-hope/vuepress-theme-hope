// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import type { ClientConfig } from "vuepress/client";

import ThemeColorPicker from "@theme-hope/components/appearance/ThemeColorPicker";
import type { DarkmodeStatus } from "@theme-hope/composables/useDarkMode";
import { darkModeSymbol } from "@theme-hope/composables/useDarkMode";

import type { DarkModeOptions } from "../../src/shared/index.js";
import { mountTheme } from "./helpers.js";

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
  it("renders every color as a labelled button", async () => {
    localStorage.clear();

    const wrapper = await mountPicker();
    const buttons = wrapper.findAll("button");

    expect(buttons).toHaveLength(3);
    expect(buttons.every((button) => button.attributes("type") === "button")).toBe(true);
    expect(buttons.map((button) => button.attributes("aria-label"))).toStrictEqual([
      "Theme Color",
      "theme-1",
      "theme-2",
    ]);
    expect(wrapper.find("ul").attributes("role")).toBe("group");
    expect(wrapper.find("ul").attributes("aria-label")).toBe("Theme Color");

    wrapper.unmount();
  });

  it("applies and clears a theme color", async () => {
    localStorage.clear();

    const wrapper = await mountPicker();
    const buttons = wrapper.findAll("button");

    buttons[1].element.click();
    await wrapper.vm.$nextTick();

    expect(document.documentElement.classList.contains("theme-1")).toBe(true);
    expect(localStorage.getItem("VUEPRESS_THEME_COLOR")).toBe("theme-1");
    expect(buttons[1].attributes("aria-pressed")).toBe("true");
    expect(buttons[0].attributes("aria-pressed")).toBe("false");

    buttons[0].element.click();
    await wrapper.vm.$nextTick();

    expect(document.documentElement.classList.contains("theme-1")).toBe(false);
    expect(localStorage.getItem("VUEPRESS_THEME_COLOR")).toBeNull();
    expect(buttons[0].attributes("aria-pressed")).toBe("true");

    wrapper.unmount();
  });
});
