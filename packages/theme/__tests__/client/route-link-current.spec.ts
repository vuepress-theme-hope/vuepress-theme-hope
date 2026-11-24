// @vitest-environment happy-dom
import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { useRoute } from "vuepress/client";

import CategoryInfo from "../../src/client/components/info/CategoryInfo.js";
import { mountTheme } from "./helpers.js";

const categoryLandingPage = defineComponent({
  setup(): () => VNode {
    const route = useRoute();

    return () =>
      h("div", [
        h(CategoryInfo, {
          category: [{ name: "Frontend", path: "/category/frontend/" }],
        }),
        h("span", { class: "route-path" }, route.path),
      ]);
  },
});

const mountCategoryPage = (): Promise<VueWrapper> =>
  mountTheme({
    page: { path: "/category/frontend/", title: "Frontend" },
    content: categoryLandingPage,
  });

describe("category link to the current page", () => {
  it("does not log a warning or an error when clicked", async () => {
    const warn = vi.spyOn(globalThis.console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(globalThis.console, "error").mockImplementation(() => {});
    const wrapper = await mountCategoryPage();

    try {
      const link = wrapper.find("a.page-category-item");

      expect(link.attributes("href")).toBe("/category/frontend/");

      await link.trigger("click");
      await flushPromises();

      expect(warn).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    } finally {
      wrapper.unmount();
      warn.mockRestore();
      error.mockRestore();
    }
  });

  it("keeps the current route after the click", async () => {
    const wrapper = await mountCategoryPage();

    try {
      await wrapper.find("a.page-category-item").trigger("click");
      await flushPromises();

      expect(wrapper.find(".route-path").text()).toBe("/category/frontend/");
    } finally {
      wrapper.unmount();
    }
  });
});
