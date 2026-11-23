// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Component, VNode } from "vue";
import { defineComponent, h } from "vue";

import AuthorInfo from "@theme-hope/components/info/AuthorInfo";
import CategoryInfo from "@theme-hope/components/info/CategoryInfo";
import DateInfo from "@theme-hope/components/info/DateInfo";
import OriginalInfo from "@theme-hope/components/info/OriginalInfo";
import ReadingTimeInfo from "@theme-hope/components/info/ReadingTimeInfo";
import TagInfo from "@theme-hope/components/info/TagInfo";
import WordInfo from "@theme-hope/components/info/WordInfo";

import { mountTheme } from "./helpers.js";

const mountInfo = (component: Component, props: Record<string, unknown>): Promise<VueWrapper> =>
  mountTheme({
    content: defineComponent({
      setup: () => (): VNode => h(component, props),
    }),
  });

describe("date info", () => {
  it("formats the date and exposes machine readable meta", async () => {
    const wrapper = await mountInfo(DateInfo, { date: new Date("2024-01-02T00:00:00Z") });

    expect(wrapper.find(".page-date-info").exists()).toBe(true);
    expect(wrapper.find("meta[property='datePublished']").attributes("content")).toBe(
      "2024-01-02T00:00:00.000Z",
    );

    wrapper.unmount();
  });

  it("renders nothing without a date", async () => {
    const wrapper = await mountInfo(DateInfo, { date: null });

    expect(wrapper.find(".page-date-info").exists()).toBe(false);

    wrapper.unmount();
  });
});

describe("reading time info", () => {
  it("renders the reading time with a duration meta", async () => {
    const wrapper = await mountInfo(ReadingTimeInfo, {
      readingTime: { minutes: 2.4, words: 500 },
      readingTimeLocale: { time: "2 min read", words: "500 words" },
    });

    expect(wrapper.find(".page-reading-time-info").text()).toContain("2 min read");
    expect(wrapper.find("meta[property='timeRequired']").attributes("content")).toBe("PT2M");

    wrapper.unmount();
  });

  it("rounds a short reading time up to one minute", async () => {
    const wrapper = await mountInfo(ReadingTimeInfo, {
      readingTime: { minutes: 0.3, words: 80 },
      readingTimeLocale: { time: "1 min read", words: "80 words" },
    });

    expect(wrapper.find("meta[property='timeRequired']").attributes("content")).toBe("PT1M");

    wrapper.unmount();
  });

  it("renders nothing without the reading time locale", async () => {
    const wrapper = await mountInfo(ReadingTimeInfo, { readingTime: { minutes: 1 } });

    expect(wrapper.find(".page-reading-time-info").exists()).toBe(false);

    wrapper.unmount();
  });
});

describe("word info", () => {
  it("renders the word count with a machine readable meta", async () => {
    const wrapper = await mountInfo(WordInfo, {
      readingTime: { minutes: 1, words: 321 },
      readingTimeLocale: { words: "321 words" },
    });

    expect(wrapper.find(".page-word-info").text()).toContain("321 words");
    expect(wrapper.find("meta[property='wordCount']").attributes("content")).toBe("321");

    wrapper.unmount();
  });
});

describe("author info", () => {
  it("renders plain authors", async () => {
    const wrapper = await mountInfo(AuthorInfo, { author: [{ name: "Alice" }] });

    expect(wrapper.find(".page-author-info").text()).toContain("Alice");
    expect(wrapper.find("a").exists()).toBe(false);

    wrapper.unmount();
  });

  it("links authors with an url", async () => {
    const wrapper = await mountInfo(AuthorInfo, {
      author: [{ name: "Alice", url: "https://example.com" }],
    });

    const link = wrapper.find("a");

    expect(link.attributes("href")).toBe("https://example.com");
    expect(link.attributes("target")).toBe("_blank");
    expect(link.attributes("rel")).toBe("noopener noreferrer");

    wrapper.unmount();
  });

  it("renders nothing without authors", async () => {
    const wrapper = await mountInfo(AuthorInfo, { author: [] });

    expect(wrapper.find(".page-author-info").exists()).toBe(false);

    wrapper.unmount();
  });
});

describe("original info", () => {
  it("renders only for original pages", async () => {
    const original = await mountInfo(OriginalInfo, { isOriginal: true });

    expect(original.find(".page-original-info").text()).toBe("Original");

    original.unmount();

    const notOriginal = await mountInfo(OriginalInfo, { isOriginal: false });

    expect(notOriginal.find(".page-original-info").exists()).toBe(false);

    notOriginal.unmount();
  });
});

describe("category info", () => {
  it("renders categories and the article section meta", async () => {
    const wrapper = await mountInfo(CategoryInfo, {
      category: [{ name: "Frontend", path: "/category/frontend/" }, { name: "Vue" }],
    });

    const items = wrapper.findAll(".page-category-item");

    expect(items).toHaveLength(2);
    expect(items[0].element.tagName).toBe("A");
    expect(items[0].attributes("href")).toBe("/category/frontend/");
    expect(items[0].text()).toBe("Frontend");
    expect(items[1].element.tagName).toBe("SPAN");
    expect(wrapper.find("meta[property='articleSection']").attributes("content")).toBe(
      "Frontend,Vue",
    );

    wrapper.unmount();
  });

  it("renders nothing without categories", async () => {
    const wrapper = await mountInfo(CategoryInfo, { category: [] });

    expect(wrapper.find(".page-category-info").exists()).toBe(false);

    wrapper.unmount();
  });
});

describe("tag info", () => {
  it("renders tags and the keywords meta", async () => {
    const wrapper = await mountInfo(TagInfo, {
      tag: [{ name: "VuePress", path: "/tag/vuepress/" }],
    });

    expect(wrapper.find(".page-tag-item").element.tagName).toBe("A");
    expect(wrapper.find(".page-tag-item").text()).toBe("VuePress");
    expect(wrapper.find("meta[property='keywords']").attributes("content")).toBe("VuePress");

    wrapper.unmount();
  });
});
