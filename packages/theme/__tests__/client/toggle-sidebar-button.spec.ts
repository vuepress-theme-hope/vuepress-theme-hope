// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Ref, VNode } from "vue";
import { defineComponent, h, nextTick, ref } from "vue";

import ToggleSidebarButton from "@theme-hope/components/navbar/ToggleSidebarButton";

import { mountTheme } from "./helpers.js";

const mountButton = async (): Promise<{ active: Ref<boolean>; wrapper: VueWrapper }> => {
  const active = ref(false);
  const wrapper = await mountTheme({
    content: defineComponent({
      setup: () => (): VNode => h(ToggleSidebarButton, { active: active.value }),
    }),
  });

  return { active, wrapper };
};

describe("toggle sidebar button", () => {
  it("exposes the sidebar state", async () => {
    const { active, wrapper } = await mountButton();
    const button = wrapper.find("button.vp-toggle-sidebar-button");

    expect(button.attributes("aria-label")).toBe("Toggle sidebar");
    expect(button.attributes("title")).toBe("Toggle sidebar");
    expect(button.attributes("aria-controls")).toBe("sidebar");
    expect(button.attributes("aria-expanded")).toBe("false");

    active.value = true;
    await nextTick();

    expect(button.attributes("aria-expanded")).toBe("true");

    wrapper.unmount();
  });
});
