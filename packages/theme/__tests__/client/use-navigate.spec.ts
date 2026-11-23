// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import { useNavigate } from "@theme-hope/composables/useNavigate";

import { mountTheme } from "./helpers.js";

const mountNavigate = (url: string): Promise<VueWrapper> =>
  mountTheme({
    content: defineComponent({
      setup: () => {
        const navigate = useNavigate();

        return (): VNode =>
          h("button", { type: "button", onClick: () => navigate(url) }, "navigate");
      },
    }),
  });

describe("use navigate", () => {
  it("opens external links in a new tab without an opener", async () => {
    const open = vi.fn<(url: string, target: string, features: string) => void>();

    vi.stubGlobal("open", open);

    const wrapper = await mountNavigate("https://example.com/");

    await wrapper.find("button").trigger("click");

    expect(open).toHaveBeenCalledWith("https://example.com/", "_blank", "noopener,noreferrer");

    wrapper.unmount();
    vi.unstubAllGlobals();
  });
});
