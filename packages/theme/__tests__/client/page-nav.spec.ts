// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import type { TestClient } from "@vuepress/test-utils/client";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import type { ClientConfig } from "vuepress/client";

import PageNav from "@theme-hope/components/base/PageNav";
import { setupSidebarItems } from "@theme-hope/composables/sidebar/useSidebarItems";

import { createThemeClient, mountTheme } from "./helpers.js";

const pageNavContent = defineComponent({
  setup: () => (): VNode => h(PageNav),
});

const routes = {
  "/guide/": {
    component: pageNavContent,
    pageData: { path: "/guide/", title: "Guide" },
  },
  "/guide/intro.html": {
    component: pageNavContent,
    pageData: { path: "/guide/intro.html", title: "Introduction" },
  },
  "/guide/usage.html": {
    component: pageNavContent,
    pageData: {
      path: "/guide/usage.html",
      title: "Usage",
      // keep a previous link on the next page so that the keyboard test can navigate back
      frontmatter: { prev: "/guide/intro.html", next: false },
    },
  },
};

const sidebarClientConfig: ClientConfig = {
  setup: () => {
    setupSidebarItems();
  },
};

const mountPageNav = async (options: Parameters<typeof mountTheme>[0] = {}): Promise<VueWrapper> =>
  mountTheme({
    content: pageNavContent,
    page: { path: "/guide/", title: "Guide" },
    routes,
    clientConfigs: [sidebarClientConfig],
    ...options,
  });

const mountPageNavClient = async (
  options: Parameters<typeof mountTheme>[0] = {},
): Promise<{ client: TestClient; wrapper: VueWrapper }> => {
  const { attachTo, ...clientOptions } = options;
  const client = await createThemeClient({
    content: pageNavContent,
    page: { path: "/guide/", title: "Guide" },
    routes,
    clientConfigs: [sidebarClientConfig],
    ...clientOptions,
  });

  return { client, wrapper: await client.mount({ attachTo: attachTo ?? document.body }) };
};

describe("page nav", () => {
  it("renders previous and next links from frontmatter", async () => {
    const wrapper = await mountPageNav({
      page: {
        path: "/guide/",
        title: "Guide",
        frontmatter: {
          prev: { text: "Introduction", link: "/guide/intro.html" },
          next: { text: "Usage", link: "/guide/usage.html" },
        },
      },
    });

    const nav = wrapper.find("nav.vp-page-nav");

    expect(nav.exists()).toBe(true);
    expect(nav.find("a.prev").attributes("href")).toBe("/guide/intro.html");
    expect(nav.find("a.prev .link").text()).toContain("Introduction");
    expect(nav.find("a.next").attributes("href")).toBe("/guide/usage.html");
    expect(nav.find("a.next .link").text()).toContain("Usage");

    wrapper.unmount();
  });

  it("falls back to the sidebar order when frontmatter has no prev/next", async () => {
    const wrapper = await mountPageNav({
      themeData: {
        sidebar: {
          "/guide/": [
            { text: "Introduction", link: "/guide/intro.html" },
            { text: "Guide", link: "/guide/" },
            { text: "Usage", link: "/guide/usage.html" },
          ],
        },
      },
    });

    expect(wrapper.find("a.prev .link").text()).toContain("Introduction");
    expect(wrapper.find("a.next .link").text()).toContain("Usage");

    wrapper.unmount();
  });

  it("navigates with alt + arrow keys and prevents the default behavior", async () => {
    const { client, wrapper } = await mountPageNavClient({
      page: {
        path: "/guide/",
        title: "Guide",
        frontmatter: { prev: "/guide/intro.html", next: "/guide/usage.html" },
      },
    });

    const nextEvent = new KeyboardEvent("keydown", {
      altKey: true,
      cancelable: true,
      key: "ArrowRight",
    });

    globalThis.dispatchEvent(nextEvent);
    await flushPromises();

    expect(client.router.currentRoute.value.path).toBe("/guide/usage.html");
    expect(nextEvent.defaultPrevented).toBe(true);

    const prevEvent = new KeyboardEvent("keydown", {
      altKey: true,
      cancelable: true,
      key: "ArrowLeft",
    });

    globalThis.dispatchEvent(prevEvent);
    await flushPromises();

    expect(client.router.currentRoute.value.path).toBe("/guide/intro.html");
    expect(prevEvent.defaultPrevented).toBe(true);

    wrapper.unmount();
  });

  it("ignores arrow keys without alt", async () => {
    const { client, wrapper } = await mountPageNavClient({
      page: {
        path: "/guide/",
        title: "Guide",
        frontmatter: { prev: "/guide/intro.html", next: "/guide/usage.html" },
      },
    });

    const event = new KeyboardEvent("keydown", {
      cancelable: true,
      key: "ArrowRight",
    });

    globalThis.dispatchEvent(event);
    await flushPromises();

    expect(client.router.currentRoute.value.path).toBe("/guide/");
    expect(event.defaultPrevented).toBe(false);

    wrapper.unmount();
  });

  it("renders nothing when both links are disabled", async () => {
    const wrapper = await mountPageNav({
      page: {
        path: "/guide/",
        title: "Guide",
        frontmatter: { prev: false, next: false },
      },
    });

    expect(wrapper.find("nav.vp-page-nav").exists()).toBe(false);

    wrapper.unmount();
  });
});
