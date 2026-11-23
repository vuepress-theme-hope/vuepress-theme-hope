// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import PageFooter from "@theme-hope/components/base/PageFooter";

import { mountTheme } from "./helpers.js";

const mountFooter = (options: {
  frontmatter?: Record<string, unknown>;
  themeData?: Record<string, unknown>;
}): Promise<VueWrapper> =>
  mountTheme({
    page: {
      path: "/",
      title: "Test Page",
      ...(options.frontmatter ? { frontmatter: options.frontmatter } : {}),
    },
    themeData: options.themeData,
    content: defineComponent({
      setup: () => (): VNode => h(PageFooter),
    }),
  });

describe("page footer", () => {
  it("is hidden by default", async () => {
    const wrapper = await mountFooter({});

    expect(wrapper.find("footer.vp-footer-wrapper").exists()).toBe(false);

    wrapper.unmount();
  });

  it("renders the global footer when enabled", async () => {
    const wrapper = await mountFooter({
      themeData: { displayFooter: true, footer: "<p>Theme footer</p>" },
    });

    expect(wrapper.find("footer.vp-footer-wrapper").exists()).toBe(true);
    expect(wrapper.find(".vp-footer").html()).toContain("<p>Theme footer</p>");

    wrapper.unmount();
  });

  it("renders the frontmatter footer as html", async () => {
    const wrapper = await mountFooter({
      frontmatter: { footer: "<strong>Page footer</strong>" },
    });

    expect(wrapper.find(".vp-footer strong").text()).toBe("Page footer");

    wrapper.unmount();
  });

  it("does not render when the footer is disabled in frontmatter", async () => {
    const wrapper = await mountFooter({
      frontmatter: { footer: false },
      themeData: { displayFooter: true },
    });

    expect(wrapper.find("footer.vp-footer-wrapper").exists()).toBe(false);

    wrapper.unmount();
  });

  it("renders a custom copyright", async () => {
    const wrapper = await mountFooter({
      frontmatter: { copyright: "Copyright © 2024 Someone" },
    });

    expect(wrapper.find(".vp-copyright").text()).toBe("Copyright © 2024 Someone");

    wrapper.unmount();
  });

  it("generates the copyright from the author and license", async () => {
    const wrapper = await mountFooter({
      frontmatter: {
        author: [{ name: "Alice" }],
        license: "MIT",
      },
      themeData: { displayFooter: true },
    });

    expect(wrapper.find(".vp-copyright").text()).toMatch(/^Copyright © \d{4} Alice MIT Licensed$/u);

    wrapper.unmount();
  });
});
