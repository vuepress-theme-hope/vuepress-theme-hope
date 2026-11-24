// @vitest-environment happy-dom

import { describe, expect, it, vi } from "vitest";
import type { ComputedRef, VNode } from "vue";
import { defineComponent, h } from "vue";

import ToggleFullScreen from "@theme-hope/components/appearance/ToggleFullScreen";

import { mountTheme } from "./helpers.js";

const { toggleMock } = vi.hoisted(() => ({
  toggleMock: vi.fn<() => Promise<void>>(async () => {}),
}));

vi.mock(import("@vueuse/core"), async (): Promise<Record<string, unknown>> => {
  const { computed } = await import("vue");
  const actual = await vi.importActual<Record<string, unknown>>("@vueuse/core");

  return {
    ...actual,
    useFullscreen: (): {
      isFullscreen: ComputedRef<boolean>;
      isSupported: ComputedRef<boolean>;
      toggle: () => Promise<void>;
    } => ({
      isFullscreen: computed(() => false),
      isSupported: computed(() => true),
      toggle: toggleMock,
    }),
  };
});

describe("toggle full screen", () => {
  it("renders as a mouse-only decoration", async () => {
    const wrapper = await mountTheme({
      content: defineComponent({
        setup: () => (): VNode => h(ToggleFullScreen),
      }),
    });

    expect(wrapper.find(".full-screen-wrapper").attributes("aria-hidden")).toBe("true");
    expect(wrapper.find("button").exists()).toBe(false);
    expect(wrapper.find("label").exists()).toBe(false);

    const control = wrapper.find(".full-screen");

    expect((control.element as HTMLElement).tagName).toBe("SPAN");
    expect(control.attributes("tabindex")).toBeUndefined();
    expect(control.attributes("aria-label")).toBeUndefined();
    expect(wrapper.findAll("button, a, input, [tabindex]")).toHaveLength(0);

    wrapper.unmount();
  });

  it("toggles fullscreen on click", async () => {
    const wrapper = await mountTheme({
      content: defineComponent({
        setup: () => (): VNode => h(ToggleFullScreen),
      }),
    });

    await wrapper.find(".full-screen").trigger("click");

    expect(toggleMock).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });
});
