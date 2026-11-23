// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import SkipLink from "@theme-hope/components/base/SkipLink";

import { createThemeClient, mountTheme } from "./helpers.js";

const skipLinkPage = defineComponent({
  setup: () => (): VNode[] => [h(SkipLink), h("main", { id: "main-content" }, "Page content")],
});

const mountSkipLink = (content = "main-content"): Promise<VueWrapper> =>
  mountTheme({
    content: defineComponent({
      setup: () => (): VNode[] => [
        h(SkipLink, { content }),
        h("main", { id: content }, "Page content"),
      ],
    }),
  });

describe("skip link", () => {
  it("renders a visually hidden link pointing to the main content", async () => {
    const wrapper = await mountSkipLink();
    const link = wrapper.find("a.vp-skip-link");

    expect(link.exists()).toBe(true);
    expect(link.attributes("href")).toBe("#main-content");
    expect(link.classes()).toContain("sr-only");
    expect(link.text()).toBe("Skip to main content");

    wrapper.unmount();
  });

  it("does not steal focus when the initial page is mounted", async () => {
    const wrapper = await mountSkipLink();
    const main = wrapper.find("main");

    expect(document.activeElement).not.toBe(main.element);
    expect(main.attributes("tabindex")).toBeUndefined();

    wrapper.unmount();
  });

  it("focuses the main content after navigation", async () => {
    const client = await createThemeClient({
      content: skipLinkPage,
      routes: { "/next.html": { component: skipLinkPage } },
    });
    const wrapper = await client.mount({ attachTo: document.body });

    await client.router.push("/next.html");
    await flushPromises();

    const main = document.querySelector("#main-content");

    expect(document.activeElement).toBe(main);
    expect(main?.getAttribute("tabindex")).toBe("-1");

    wrapper.unmount();
  });

  it("focuses the main content and marks it focusable when clicked", async () => {
    const wrapper = await mountSkipLink();
    const main = wrapper.find("main");

    await wrapper.find("a.vp-skip-link").trigger("click");

    expect(document.activeElement).toBe(main.element);
    expect(main.attributes("tabindex")).toBe("-1");

    wrapper.unmount();
  });

  it("removes the temporary tabindex when the main content loses focus", async () => {
    const wrapper = await mountSkipLink();
    const main = wrapper.find("main");

    await wrapper.find("a.vp-skip-link").trigger("click");
    expect(main.attributes("tabindex")).toBe("-1");

    await main.trigger("blur");

    expect(main.attributes("tabindex")).toBeUndefined();

    wrapper.unmount();
  });

  it("supports a custom target id", async () => {
    const wrapper = await mountSkipLink("article");
    const link = wrapper.find("a.vp-skip-link");

    expect(link.attributes("href")).toBe("#article");

    await link.trigger("click");

    expect(document.activeElement).toBe(wrapper.find("#article").element);

    wrapper.unmount();
  });
});
