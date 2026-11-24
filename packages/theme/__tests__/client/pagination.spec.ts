// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import Pagination from "@theme-hope/components/blog/Pagination";

import { mountTheme } from "./helpers.js";

const pageNumbers = (wrapper: VueWrapper): string[] =>
  wrapper
    .findAll(".vp-pagination-number > button")
    .filter((item) => !item.classes("prev") && !item.classes("next") && !item.classes("ellipsis"))
    .map((item) => item.text());

const mountPagination = (props: {
  current?: number;
  perPage?: number;
  total?: number;
}): Promise<VueWrapper> =>
  mountTheme({
    content: defineComponent({
      setup: () => (): VNode => h(Pagination, props),
    }),
  });

describe("pagination", () => {
  it("renders the first page without a previous button", async () => {
    const wrapper = await mountPagination({ current: 1, perPage: 5, total: 15 });

    expect(wrapper.find(".vp-pagination-list").exists()).toBe(true);
    expect(wrapper.find(".prev").exists()).toBe(false);
    expect(wrapper.find(".next").exists()).toBe(true);
    expect(pageNumbers(wrapper)).toStrictEqual(["1", "2", "3"]);

    wrapper.unmount();
  });

  it("renders the last page without a next button", async () => {
    const wrapper = await mountPagination({ current: 3, perPage: 5, total: 15 });

    expect(wrapper.find(".prev").exists()).toBe(true);
    expect(wrapper.find(".next").exists()).toBe(false);
    expect(wrapper.find(".active").text()).toBe("3");

    wrapper.unmount();
  });

  it("emits the previous and next page on click", async () => {
    const wrapper = await mountPagination({ current: 2, perPage: 5, total: 15 });

    await wrapper.find(".prev").trigger("click");
    await wrapper.find(".next").trigger("click");

    expect(wrapper.findComponent(Pagination).emitted("updateCurrentPage")).toStrictEqual([
      [1],
      [3],
    ]);

    wrapper.unmount();
  });

  it("emits the clicked page number", async () => {
    const wrapper = await mountPagination({ current: 1, perPage: 5, total: 15 });

    await wrapper.findAll(".vp-pagination-number > button")[1].trigger("click");

    expect(wrapper.findComponent(Pagination).emitted("updateCurrentPage")).toStrictEqual([[2]]);

    wrapper.unmount();
  });

  it("shows both ellipses around the current page in the middle", async () => {
    const wrapper = await mountPagination({ current: 5, perPage: 10, total: 100 });

    expect(wrapper.findAll(".ellipsis")).toHaveLength(2);
    expect(pageNumbers(wrapper)).toStrictEqual(["1", "3", "4", "5", "6", "7", "10"]);

    wrapper.unmount();
  });

  it("shows the first and last pages with a single ellipsis at the edges", async () => {
    const firstPage = await mountPagination({ current: 1, perPage: 10, total: 100 });

    expect(pageNumbers(firstPage)).toStrictEqual(["1", "2", "3", "4", "5", "10"]);
    expect(firstPage.findAll(".ellipsis")).toHaveLength(1);

    firstPage.unmount();

    const lastPage = await mountPagination({ current: 10, perPage: 10, total: 100 });

    expect(pageNumbers(lastPage)).toStrictEqual(["1", "6", "7", "8", "9", "10"]);
    expect(lastPage.findAll(".ellipsis")).toHaveLength(1);

    lastPage.unmount();
  });

  it("exposes accessible page controls", async () => {
    const wrapper = await mountPagination({ current: 2, perPage: 5, total: 15 });

    expect(wrapper.find(".vp-pagination-number .prev").element.tagName).toBe("BUTTON");
    expect(wrapper.find(".vp-pagination-number .next").element.tagName).toBe("BUTTON");
    expect(wrapper.find(".vp-pagination-number .active").attributes("aria-current")).toBe("page");
    expect(wrapper.find(".vp-pagination-number div[role='navigation']").exists()).toBe(false);
    expect(wrapper.find("button.vp-pagination-button").attributes("role")).toBeUndefined();

    wrapper.unmount();
  });

  it("does not render the pager for a single page", async () => {
    const wrapper = await mountPagination({ current: 1, perPage: 10, total: 5 });

    expect(wrapper.find(".vp-pagination").exists()).toBe(true);
    expect(wrapper.find(".vp-pagination-list").exists()).toBe(false);

    wrapper.unmount();
  });

  it("jumps to the entered page on enter", async () => {
    const wrapper = await mountPagination({ current: 1, perPage: 10, total: 100 });
    const input = wrapper.find("input#navigation-text");

    await input.setValue("7");
    await input.trigger("keydown", { key: "Enter" });

    expect(wrapper.findComponent(Pagination).emitted("updateCurrentPage")).toStrictEqual([[7]]);

    wrapper.unmount();
  });

  it("ignores an out of range page number", async () => {
    const wrapper = await mountPagination({ current: 1, perPage: 10, total: 100 });
    const input = wrapper.find("input#navigation-text");

    await input.setValue("11");
    await input.trigger("keydown", { key: "Enter" });

    expect(wrapper.findComponent(Pagination).emitted("updateCurrentPage")).toBeUndefined();

    wrapper.unmount();
  });
});
