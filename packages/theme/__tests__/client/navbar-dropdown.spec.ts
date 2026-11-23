// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import NavbarDropdown from "@theme-hope/components/navbar/NavbarDropdown";

import type { AutoLinkOptions, NavGroup } from "../../src/shared/index.js";
import { mountTheme } from "./helpers.js";

const config: NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>> = {
  text: "Resources",
  children: [
    { text: "Guide", link: "/guide/" },
    {
      text: "Ecosystem",
      children: [{ text: "Components", link: "/components/" }],
    },
  ],
};

const mountDropdown = (dropdownConfig = config): Promise<VueWrapper> =>
  mountTheme({
    content: defineComponent({
      setup: () => (): VNode => h(NavbarDropdown, { config: dropdownConfig }),
    }),
  });

describe("navbar dropdown", () => {
  it("renders the dropdown title as a button", async () => {
    const wrapper = await mountDropdown();

    const title = wrapper.find("button.vp-dropdown-title");

    expect(title.exists()).toBe(true);
    expect(title.attributes("type")).toBe("button");
    expect(title.attributes("aria-label")).toBe("Resources");
    expect(title.attributes("aria-expanded")).toBe("false");
    expect(title.attributes("aria-controls")).toBe(wrapper.find("ul.vp-dropdown").attributes("id"));
    expect(title.text()).toContain("Resources");
    // The dropdown list must not be nested inside the button
    expect(title.find("ul.vp-dropdown").exists()).toBe(false);

    wrapper.unmount();
  });

  it("uses the explicit aria label", async () => {
    const wrapper = await mountDropdown({ ...config, ariaLabel: "Resource links" });

    expect(wrapper.find("button.vp-dropdown-title").attributes("aria-label")).toBe(
      "Resource links",
    );

    wrapper.unmount();
  });

  it("renders link and nested group children", async () => {
    const wrapper = await mountDropdown();

    expect(wrapper.findAll(".vp-dropdown > .vp-dropdown-item")).toHaveLength(2);
    expect(wrapper.find(".vp-dropdown-subtitle").text()).toContain("Ecosystem");
    expect(wrapper.findAll(".vp-dropdown-subitems > .vp-dropdown-subitem")).toHaveLength(1);
    expect(wrapper.find("a[href='/guide/']").exists()).toBe(true);
    expect(wrapper.find("a[href='/components/']").exists()).toBe(true);

    wrapper.unmount();
  });

  it("opens only when activated from the keyboard", async () => {
    const wrapper = await mountDropdown();

    await wrapper.find("button.vp-dropdown-title").trigger("click", { detail: 1 });
    expect(wrapper.find(".vp-dropdown-wrapper").classes()).not.toContain("open");

    await wrapper.find("button.vp-dropdown-title").trigger("click", { detail: 0 });
    expect(wrapper.find(".vp-dropdown-wrapper").classes()).toContain("open");
    expect(wrapper.find("button.vp-dropdown-title").attributes("aria-expanded")).toBe("true");

    wrapper.unmount();
  });

  it("closes when the last item loses focus", async () => {
    const wrapper = await mountDropdown();

    await wrapper.find("button.vp-dropdown-title").trigger("click", { detail: 0 });
    expect(wrapper.find(".vp-dropdown-wrapper").classes()).toContain("open");

    const lastSubitem = wrapper.findAll(".vp-dropdown-subitem a").at(-1)!;

    await lastSubitem.trigger("focusout");

    expect(wrapper.find(".vp-dropdown-wrapper").classes()).not.toContain("open");

    wrapper.unmount();
  });
});
