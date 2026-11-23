// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import NavbarBrand from "@theme-hope/components/navbar/NavbarBrand";

import { mountTheme } from "./helpers.js";

const mountNavbarBrand = (options: {
  site?: Record<string, unknown>;
  themeData?: Record<string, unknown>;
}): Promise<VueWrapper> =>
  mountTheme({
    ...options,
    content: defineComponent({
      setup: () => (): VNode => h(NavbarBrand),
    }),
  });

describe("navbar brand", () => {
  it("renders the site title as a link to the route locale", async () => {
    const wrapper = await mountNavbarBrand({});

    const brand = wrapper.find("a.vp-brand");

    expect(brand.exists()).toBe(true);
    expect(brand.attributes("href")).toBe("/");
    expect(brand.attributes("aria-label")).toBe("Take me home");
    expect(wrapper.find(".vp-site-name").text()).toBe("Test Site");
    expect(wrapper.find("img").exists()).toBe(false);

    wrapper.unmount();
  });

  it("renders the logo and hides the site name on mobile", async () => {
    const wrapper = await mountNavbarBrand({
      themeData: { logo: "/logo.png" },
    });

    const logo = wrapper.find("img.vp-nav-logo");

    expect(logo.exists()).toBe(true);
    expect(logo.attributes("src")).toBe("/logo.png");
    expect(logo.attributes("alt")).toBe("");
    expect(logo.classes()).not.toContain("light");
    expect(wrapper.find(".vp-site-name").classes()).toContain("hide-in-pad");

    wrapper.unmount();
  });

  it("keeps the site name visible on mobile when disabled", async () => {
    const wrapper = await mountNavbarBrand({
      themeData: { hideSiteNameOnMobile: false, logo: "/logo.png" },
    });

    expect(wrapper.find(".vp-site-name").classes()).not.toContain("hide-in-pad");

    wrapper.unmount();
  });

  it("renders a separate dark mode logo", async () => {
    const wrapper = await mountNavbarBrand({
      themeData: { logo: "/logo.png", logoDark: "/logo-dark.png" },
    });

    const logos = wrapper.findAll("img.vp-nav-logo");

    expect(logos).toHaveLength(2);
    expect(logos[0].classes()).toContain("light");
    expect(logos[1].classes()).toContain("dark");
    expect(logos[1].attributes("src")).toBe("/logo-dark.png");

    wrapper.unmount();
  });

  it("supports a custom home link and navbar title", async () => {
    const wrapper = await mountNavbarBrand({
      themeData: { home: "/guide/", navbarTitle: "Custom Title" },
    });

    expect(wrapper.find("a.vp-brand").attributes("href")).toBe("/guide/");
    expect(wrapper.find(".vp-site-name").text()).toBe("Custom Title");

    wrapper.unmount();
  });

  it("renders no site name when the site title is empty", async () => {
    const wrapper = await mountNavbarBrand({ site: { title: "" } });

    expect(wrapper.find(".vp-site-name").exists()).toBe(false);

    wrapper.unmount();
  });
});
