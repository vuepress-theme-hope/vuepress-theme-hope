// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h, nextTick } from "vue";
import type { PageHeader } from "vuepress/client";

import TOC from "@theme-hope/components/base/TOC";

import { mountTheme } from "./helpers.js";

const items: PageHeader[] = [
  {
    title: "Section A",
    level: 2,
    slug: "section-a",
    link: "#section-a",
    children: [{ title: "Sub A", level: 3, slug: "sub-a", link: "#sub-a", children: [] }],
  },
  {
    title: "Section B",
    level: 2,
    slug: "section-b",
    link: "#section-b",
    children: [],
  },
];

const mountTOC = (options: {
  frontmatter?: Record<string, unknown>;
  items?: PageHeader[];
}): Promise<VueWrapper> =>
  mountTheme({
    ...(options.frontmatter
      ? { page: { path: "/", title: "Test Page", frontmatter: options.frontmatter } }
      : {}),
    content: defineComponent({
      setup: () => (): VNode => h(TOC, { items: options.items }),
    }),
  });

describe("toc", () => {
  it("renders the given headers as a nested list", async () => {
    const wrapper = await mountTOC({ items });
    await nextTick();

    expect(wrapper.find("aside#toc").exists()).toBe(true);
    expect(wrapper.find("aside#toc").attributes("aria-label")).toBe("On This Page");
    expect(wrapper.find(".vp-toc-header").text()).toContain("On This Page");
    expect(wrapper.findAll(".vp-toc-list")).toHaveLength(2);
    expect(wrapper.findAll(".vp-toc-item")).toHaveLength(3);
    expect(wrapper.find("a[href='#section-a']").text()).toBe("Section A");
    expect(wrapper.find("a[href='#sub-a']").text()).toBe("Sub A");
    expect(wrapper.find("a[href='#section-b']").text()).toBe("Section B");

    wrapper.unmount();
  });

  it("exposes the toc toggle semantics", async () => {
    const wrapper = await mountTOC({ items });

    await nextTick();

    const toggle = wrapper.find(".vp-toc-toggle");

    expect(toggle.element.tagName).toBe("BUTTON");
    expect(toggle.attributes("type")).toBe("button");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    expect(toggle.attributes("aria-controls")).toBe("toc-content");

    wrapper.unmount();
  });

  it("toggles the toc visibility by the header", async () => {
    const wrapper = await mountTOC({ items });
    await nextTick();

    expect(wrapper.find(".vp-toc-wrapper").classes()).not.toContain("open");

    await wrapper.find(".vp-toc-toggle").trigger("click");
    expect(wrapper.find(".vp-toc-wrapper").classes()).toContain("open");
    expect(wrapper.find(".vp-toc-toggle").attributes("aria-expanded")).toBe("true");

    await wrapper.find(".vp-toc-toggle").trigger("click");
    expect(wrapper.find(".vp-toc-wrapper").classes()).not.toContain("open");

    wrapper.unmount();
  });

  it("keeps the print button outside the toggle", async () => {
    const print = vi.fn<() => void>();

    vi.stubGlobal("print", print);

    const wrapper = await mountTOC({ items });

    await nextTick();

    const toggle = wrapper.find(".vp-toc-toggle");

    expect(toggle.find(".print-button").exists()).toBe(false);

    await wrapper.find(".print-button").trigger("click");

    expect(print).toHaveBeenCalledTimes(1);
    expect(wrapper.find(".vp-toc-wrapper").classes()).not.toContain("open");

    wrapper.unmount();
    vi.unstubAllGlobals();
  });

  it("renders nothing when the toc is disabled", async () => {
    const wrapper = await mountTOC({ frontmatter: { toc: false } });
    await nextTick();

    expect(wrapper.find("aside#toc").exists()).toBe(false);

    wrapper.unmount();
  });
});
