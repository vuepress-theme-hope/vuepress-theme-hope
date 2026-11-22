// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import { setupSidebarItems } from "@theme-hope/composables/sidebar/useSidebarItems";
import NotFound from "@theme-hope/layouts/base/NotFound";

import { createThemeClient, mountTheme } from "./helpers.js";

const mountNotFound = (themeData?: Record<string, unknown>): Promise<VueWrapper> =>
  mountTheme({
    page: { path: "/missing.html", title: "Missing" },
    themeData,
    clientConfigs: [{ setup: (): void => setupSidebarItems() }],
    content: defineComponent({
      setup: () => (): VNode => h(NotFound),
    }),
  });

describe("not found", () => {
  it("renders the 404 hint and both actions", async () => {
    const wrapper = await mountNotFound();

    expect(wrapper.find("main#main-content.not-found").exists()).toBe(true);
    expect(wrapper.find(".error-code").text()).toBe("404");
    expect(wrapper.find(".error-title").text()).toBe("Page not found");

    const actions = wrapper.findAll("button.action-button");

    expect(actions).toHaveLength(2);
    expect(actions[0].text()).toBe("Go back");
    expect(actions[1].text()).toBe("Take me home");

    wrapper.unmount();
  });

  it("navigates to the configured home page", async () => {
    const client = await createThemeClient({
      page: { path: "/missing.html", title: "Missing" },
      themeData: { home: "/home/" },
      routes: { "/home/": { component: () => null } },
      clientConfigs: [{ setup: (): void => setupSidebarItems() }],
      content: defineComponent({
        setup: () => (): VNode => h(NotFound),
      }),
    });
    const wrapper = await client.mount({ attachTo: document.body });

    await wrapper.findAll("button.action-button")[1].trigger("click");
    await flushPromises();

    expect(client.router.currentRoute.value.path).toBe("/home/");

    wrapper.unmount();
  });
});
