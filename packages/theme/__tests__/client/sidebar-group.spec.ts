// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { config } from "@vue/test-utils";
import { mountVuePress } from "@vuepress/test-utils/client";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import SidebarLinks from "@theme-hope/components/sidebar/SidebarLinks";
import type { SidebarItem } from "@theme-hope/typings/sidebar";

// The theme registers `VPIcon` globally in the real app
config.global.stubs = { VPIcon: true };

const mountSidebar = (items: SidebarItem[], path = "/vps/changelog.html"): Promise<VueWrapper> =>
  mountVuePress({
    page: { path, title: "Sidebar" },
    content: defineComponent({
      setup: () => (): VNode => h(SidebarLinks, { config: items }),
    }),
  });

/** The demo config of issue #4223, where the group is expanded by default */
const expandedGroupItems: SidebarItem[] = [
  { text: "Changelog", link: "/vps/changelog.html" },
  {
    text: "Details",
    prefix: "/vps/used/",
    collapsible: true,
    expanded: true,
    children: [
      { text: "Test", link: "/vps/used/test.html" },
      { text: "Test 1", link: "/vps/used/test1.html" },
    ],
  },
];

describe("sidebar group collapsing", () => {
  it("should collapse an expanded group with a single click", async () => {
    const wrapper = await mountSidebar(expandedGroupItems);
    const group = wrapper.find(".vp-sidebar-group");

    expect(group.find(".vp-sidebar-links").exists()).toBe(true);
    expect(group.find(".vp-arrow").classes()).toContain("down");
    expect(group.find(".vp-sidebar-header").attributes("aria-expanded")).toBe("true");
    expect(group.find(".vp-sidebar-header").attributes("aria-controls")).toBe(
      group.find(".vp-sidebar-links").attributes("id"),
    );

    await group.find(".vp-sidebar-header").trigger("click");

    expect(group.find(".vp-sidebar-links").exists()).toBe(false);
    expect(group.find(".vp-arrow").classes()).toContain("end");
    expect(group.find(".vp-sidebar-header").attributes("aria-expanded")).toBe("false");

    wrapper.unmount();
  });

  it("should expand the collapsed group again with a single click", async () => {
    const wrapper = await mountSidebar(expandedGroupItems);
    const group = wrapper.find(".vp-sidebar-group");

    await group.find(".vp-sidebar-header").trigger("click");

    expect(group.find(".vp-sidebar-links").exists()).toBe(false);

    await group.find(".vp-sidebar-header").trigger("click");

    expect(group.find(".vp-sidebar-links").exists()).toBe(true);
    expect(group.find(".vp-arrow").classes()).toContain("down");

    wrapper.unmount();
  });

  it("should toggle a group without the expanded option as before", async () => {
    const wrapper = await mountSidebar([
      { text: "Changelog", link: "/vps/changelog.html" },
      {
        text: "Details",
        prefix: "/vps/used/",
        collapsible: true,
        children: [{ text: "Test", link: "/vps/used/test.html" }],
      },
    ]);
    const group = wrapper.find(".vp-sidebar-group");

    expect(group.find(".vp-sidebar-links").exists()).toBe(false);

    await group.find(".vp-sidebar-header").trigger("click");

    expect(group.find(".vp-sidebar-links").exists()).toBe(true);

    await group.find(".vp-sidebar-header").trigger("click");

    expect(group.find(".vp-sidebar-links").exists()).toBe(false);

    wrapper.unmount();
  });
});
