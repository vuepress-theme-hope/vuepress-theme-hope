// @vitest-environment happy-dom

import type { VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Component, VNode } from "vue";
import { computed, defineComponent, h, provide } from "vue";

import ArticlesInfo from "@theme-hope/components/blog/ArticlesInfo";
import BloggerInfo from "@theme-hope/components/blog/BloggerInfo";
import CategoriesInfo from "@theme-hope/components/blog/CategoriesInfo";
import InfoList from "@theme-hope/components/blog/InfoList";
import TagsInfo from "@theme-hope/components/blog/TagsInfo";
import TimelineList from "@theme-hope/components/blog/TimelineList";
import { articlesSymbol } from "@theme-hope/composables/blog/useArticles";
import { categoryMapSymbol } from "@theme-hope/composables/blog/useCategoryMap";
import { starsSymbol } from "@theme-hope/composables/blog/useStars";
import { tagMapSymbol } from "@theme-hope/composables/blog/useTagMap";
import { timelineSymbol } from "@theme-hope/composables/blog/useTimeline";

import { mountTheme } from "./helpers.js";

const provideBlogData = (): void => {
  provide(
    articlesSymbol,
    computed(() => ({ path: "/article/", items: [] })),
  );
  provide(
    starsSymbol,
    computed(() => ({ path: "/star/", items: [] })),
  );
  provide(
    categoryMapSymbol,
    computed(() => ({
      path: "/category/",
      map: { frontend: { path: "/category/frontend/", items: [] } },
    })),
  );
  provide(
    tagMapSymbol,
    computed(() => ({
      path: "/tag/",
      map: { vue: { path: "/tag/vue/", items: [] } },
    })),
  );
  provide(
    timelineSymbol,
    computed(() => ({ path: "/timeline/", config: [], items: [] })),
  );
};

const mountComponent = (component: Component, themeData = {}): Promise<VueWrapper> =>
  mountTheme({
    themeData,
    content: defineComponent({
      setup: () => {
        provideBlogData();

        return (): VNode => h(component);
      },
    }),
  });

describe("blog and info links", () => {
  it("names the blogger link with the visible name", async () => {
    const wrapper = await mountComponent(BloggerInfo, {
      blog: { name: "Alice", intro: "/intro/", avatar: "/avatar.png" },
    });
    const link = wrapper.find("a.vp-blogger");

    expect(link.attributes("href")).toBe("/intro/");
    expect(link.attributes("aria-label")).toBe("Personal Intro: Alice");
    expect(wrapper.find(".vp-blogger-name").text()).toBe("Alice");

    wrapper.unmount();
  });

  it("renders articles, categories, tags and timeline titles as links", async () => {
    const articles = await mountComponent(ArticlesInfo);

    expect(articles.find("a.title").attributes("href")).toBe("/article/");
    articles.unmount();

    const categories = await mountComponent(CategoriesInfo);

    expect(categories.find("a.title").attributes("href")).toBe("/category/");
    categories.unmount();

    const tags = await mountComponent(TagsInfo);

    expect(tags.find("a.title").attributes("href")).toBe("/tag/");
    tags.unmount();

    const timeline = await mountComponent(TimelineList);

    expect(timeline.find("a.title").attributes("href")).toBe("/timeline/");
    timeline.unmount();
  });

  it("labels the type buttons and exposes the active one", async () => {
    const wrapper = await mountComponent(InfoList);
    const buttons = wrapper.findAll("button.vp-blog-type-button");

    expect(buttons).toHaveLength(4);
    expect(buttons.map((button) => button.attributes("aria-label"))).toStrictEqual([
      "Articles",
      "Category",
      "Tag",
      "Timeline",
    ]);
    expect(buttons[0].attributes("aria-pressed")).toBe("true");
    expect(buttons[1].attributes("aria-pressed")).toBe("false");

    await buttons[1].trigger("click");

    expect(buttons[1].attributes("aria-pressed")).toBe("true");
    expect(buttons[0].attributes("aria-pressed")).toBe("false");

    wrapper.unmount();
  });
});
