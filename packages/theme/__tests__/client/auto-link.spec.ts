// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/base/AutoLink";

import type { AutoLinkOptions } from "../../src/shared/index.js";
import { mountTheme } from "./helpers.js";

const routes = {
  "/guide/": { pageData: { path: "/guide/", title: "Guide" } },
};

const mountAutoLink = (
  config: AutoLinkOptions,
  slots: Record<string, () => VNode> = {},
): Promise<VueWrapper> =>
  mountTheme({
    content: defineComponent({
      setup: () => (): VNode => h(AutoLink, { config }, slots),
    }),
    routes,
  });

describe("auto link", () => {
  it("renders an internal link with base and accessible label", async () => {
    const wrapper = await mountAutoLink({ text: "Guide", link: "/guide/" });
    const link = wrapper.find("a");

    expect(link.attributes("href")).toBe("/guide/");
    expect(link.text()).toBe("Guide");
    expect(link.attributes("aria-label")).toBe("Guide");
    expect(link.attributes("target")).toBeUndefined();

    wrapper.unmount();
  });

  it("renders an external link in a new tab with safe rel", async () => {
    const wrapper = await mountAutoLink({
      text: "GitHub",
      link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    });
    const link = wrapper.find("a");

    expect(link.attributes("href")).toBe(
      "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    );
    expect(link.attributes("target")).toBe("_blank");
    expect(link.attributes("rel")).toBe("noopener noreferrer");

    wrapper.unmount();
  });

  it("renders the icon before the text", async () => {
    const wrapper = await mountAutoLink({
      text: "Guide",
      link: "/guide/",
      icon: "lucide:book",
    });
    const icon = wrapper.find("v-p-icon-stub");

    expect(icon.exists()).toBe(true);
    expect(icon.attributes("icon")).toBe("lucide:book");
    expect(icon.attributes("sizing")).toBe("both");

    wrapper.unmount();
  });

  it("keeps a custom before slot instead of the icon", async () => {
    const wrapper = await mountAutoLink(
      { text: "Guide", link: "/guide/", icon: "lucide:book" },
      { before: (): VNode => h("span", { class: "custom-before" }, "before") },
    );

    expect(wrapper.find(".custom-before").exists()).toBe(true);
    expect(wrapper.find("v-p-icon-stub").exists()).toBe(false);

    wrapper.unmount();
  });

  it("emits focusout when the link loses focus", async () => {
    let count = 0;
    const wrapper = await mountTheme({
      content: defineComponent({
        setup: () => (): VNode =>
          h(AutoLink, {
            config: { text: "Guide", link: "/guide/" },
            onFocusout: () => {
              count += 1;
            },
          }),
      }),
      routes,
    });

    await wrapper.find("a").trigger("focusout");

    expect(count).toBe(1);

    wrapper.unmount();
  });
});
