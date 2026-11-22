// @vitest-environment happy-dom

import { mountVuePress } from "@vuepress/test-utils/client";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import VPCard from "../../src/client/components/VPCard.js";

describe("mount vuepress", () => {
  it("should mount a component into the happy-dom document", async () => {
    const wrapper = await mountVuePress({
      attachTo: document.body,
      content: defineComponent({
        render: (): VNode => h(VPCard, { title: "Mounted card", link: "/guide/" }),
      }),
    });

    expect(wrapper.find(".vp-card").exists()).toBe(true);
    expect(wrapper.find(".vp-card-title").text()).toBe("Mounted card");

    wrapper.unmount();
  });
});
