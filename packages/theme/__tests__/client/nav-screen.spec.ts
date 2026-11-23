// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import type { ClientConfig } from "vuepress/client";

import NavScreen from "@theme-hope/components/navbar/NavScreen";
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
      status: ref<DarkmodeStatus>("auto"),
    });
  },
};

const mountNavScreen = (): Promise<VueWrapper> =>
  mountTheme({
    clientConfigs: [darkModeClientConfig],
    content: defineComponent({
      setup: () => (): VNode =>
        h(
          NavScreen,
          { show: true },
          {
            navScreenTop: () => h("button", { class: "first-focus" }, "First"),
          },
        ),
    }),
  });

describe("nav screen", () => {
  it("renders a labelled modal dialog", async () => {
    const wrapper = await mountNavScreen();
    const screen = wrapper.find("#nav-screen");

    expect(screen.attributes("role")).toBe("dialog");
    expect(screen.attributes("aria-modal")).toBe("true");
    expect(screen.attributes("aria-label")).toBe("Navigation");

    wrapper.unmount();
  });

  it("moves focus into the dialog when opened", async () => {
    const wrapper = await mountNavScreen();

    await flushPromises();

    expect(document.activeElement).toBe(wrapper.find(".first-focus").element);

    wrapper.unmount();
  });

  it("emits close on escape", async () => {
    const wrapper = await mountNavScreen();

    globalThis.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await flushPromises();

    expect(wrapper.findComponent(NavScreen).emitted("close")).toHaveLength(1);

    wrapper.unmount();
  });

  it("keeps tab focus inside the dialog", async () => {
    const wrapper = await mountNavScreen();

    await flushPromises();

    const focusable = wrapper.findAll("#nav-screen a[href], #nav-screen button");
    const first = focusable[0].element as HTMLElement;
    const last = focusable[focusable.length - 1].element as HTMLElement;

    last.focus();
    globalThis.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    await flushPromises();

    expect(document.activeElement).toBe(first);

    wrapper.unmount();
  });

  it("wraps shift+tab from the first focusable element to the last", async () => {
    const wrapper = await mountNavScreen();

    await flushPromises();

    const focusable = wrapper.findAll("#nav-screen a[href], #nav-screen button");
    const first = focusable[0].element as HTMLElement;
    const last = focusable[focusable.length - 1].element as HTMLElement;

    first.focus();
    globalThis.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", shiftKey: true }));
    await flushPromises();

    expect(document.activeElement).toBe(last);

    wrapper.unmount();
  });

  it("locks body scrolling when it opens", async () => {
    const show = ref(false);
    const wrapper = await mountTheme({
      clientConfigs: [darkModeClientConfig],
      content: defineComponent({
        setup: () => (): VNode => h(NavScreen, { show: show.value }),
      }),
    });

    show.value = true;
    await flushPromises();

    expect(document.body.style.overflow).toBe("hidden");

    wrapper.unmount();
  });
});
