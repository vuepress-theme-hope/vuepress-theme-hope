// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h, nextTick } from "vue";

import PasswordModal from "@theme-hope/components/encrypt/PasswordModal";

import { mountTheme } from "./helpers.js";

const mountPasswordModal = (
  props: Record<string, unknown> = {},
  options: Record<string, unknown> = {},
): Promise<VueWrapper> =>
  mountTheme({
    ...options,
    content: defineComponent({
      setup: () => (): VNode => h(PasswordModal, props),
    }),
  });

describe("password modal", () => {
  it("renders the password hint and a password input", async () => {
    const wrapper = await mountPasswordModal({ hint: "Ask the author" });

    const hints = wrapper.findAll(".vp-decrypt-hint");

    expect(hints[0].find("svg").exists()).toBe(true);
    expect(hints[1].text()).toBe("Ask the author");

    const input = wrapper.find("input[type='password']");

    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Enter password");

    wrapper.unmount();
  });

  it("emits the password when pressing enter", async () => {
    const wrapper = await mountPasswordModal();

    await wrapper.find("input[type='password']").setValue("secret");
    await wrapper.find("input[type='password']").trigger("keydown", { key: "Enter" });

    expect(wrapper.findComponent(PasswordModal).emitted("verify")).toStrictEqual([
      ["secret", false],
    ]);

    wrapper.unmount();
  });

  it("emits the password when clicking the submit button", async () => {
    const wrapper = await mountPasswordModal();

    await wrapper.find("input[type='password']").setValue("another");
    await wrapper.find("button.vp-decrypt-submit").trigger("click");

    expect(wrapper.findComponent(PasswordModal).emitted("verify")).toStrictEqual([
      ["another", false],
    ]);

    wrapper.unmount();
  });

  it("passes the remember password option", async () => {
    const wrapper = await mountPasswordModal();

    await wrapper.find("input[type='password']").setValue("secret");
    await wrapper.find("input#remember-password").setValue(true);
    await wrapper.find("button.vp-decrypt-submit").trigger("click");

    expect(wrapper.findComponent(PasswordModal).emitted("verify")).toStrictEqual([
      ["secret", true],
    ]);

    wrapper.unmount();
  });

  it("shows the error hint after a failed attempt", async () => {
    vi.useFakeTimers();

    const wrapper = await mountPasswordModal();

    await wrapper.find("button.vp-decrypt-submit").trigger("click");
    await nextTick();

    expect(wrapper.find(".vp-decrypt-hint.tried").text()).toBe(
      "Please enter the correct password!",
    );

    vi.advanceTimersByTime(1000);
    await nextTick();

    expect(wrapper.find(".vp-decrypt-hint.tried").exists()).toBe(false);

    wrapper.unmount();
    vi.useRealTimers();
  });

  it("shows the page title when requested", async () => {
    const wrapper = await mountPasswordModal({ showTitle: true });

    expect(wrapper.find(".vp-page-title h1").text()).toBe("Test Page");

    wrapper.unmount();
  });
});
