// @vitest-environment happy-dom

import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import type { ClientConfig } from "vuepress/client";

import ColorMode from "@theme-hope/components/appearance/ColorMode";
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

describe("color mode", () => {
  it("labels the switch with its visible label and an accessible name", async () => {
    const wrapper = await mountTheme({
      clientConfigs: [darkModeClientConfig],
      content: defineComponent({
        setup: () => (): VNode => h(ColorMode),
      }),
    });

    const label = wrapper.find("label.vp-color-mode-title");

    expect(label.attributes("for")).toBe("color-mode-switch");
    expect(label.text()).toBe("Theme Mode");

    const button = wrapper.find("button#color-mode-switch");

    expect(button.exists()).toBe(true);
    expect(button.attributes("aria-label")).toBe("Theme Mode");

    wrapper.unmount();
  });
});
