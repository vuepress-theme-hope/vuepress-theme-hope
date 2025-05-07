import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import type { PageHeader } from "vuepress/client";
import { RouteLink } from "vuepress/client";

import TOC from "@theme-hope/components/base/TOC";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useBlogOptions } from "@theme-hope/composables/blog/useBlogOptions";
import { useTimeline } from "@theme-hope/composables/blog/useTimeline";
import { useThemeLocale } from "@theme-hope/composables/useTheme";

import "../../styles/blog/timeline-items.scss";

export default defineComponent({
  name: "TimelineItems",

  setup() {
    const blogOptions = useBlogOptions();
    const themeLocale = useThemeLocale();
    const timelines = useTimeline();

    const hint = computed(
      () =>
        blogOptions.value.timeline ??
        themeLocale.value.blogLocales.timelineTitle,
    );

    const items = computed(() =>
      timelines.value.config.map(({ year }) => ({
        title: year.toString(),
        level: 2,
        slug: year.toString(),
        children: [],
      })),
    );

    return (): VNode =>
      h(
        "div",
        { class: "timeline-wrapper" },
        h("ul", { class: "timeline-content" }, [
          h(DropTransition, () => h("li", { class: "motto" }, hint.value)),
          h(TOC, { items: items.value as unknown as PageHeader[] }),
          timelines.value.config.map(({ year, items }, index) =>
            h(
              DropTransition,
              { appear: true, delay: 0.08 * (index + 1), group: true },
              () => [
                h(
                  "h3",
                  { key: "title", id: year, class: "timeline-year-title" },
                  h("span", year),
                ),
                h("li", { key: "content", class: "timeline-year-list" }, [
                  h(
                    "ul",
                    { class: "timeline-year-wrapper" },
                    items.map(({ date, info, path }) =>
                      h("li", { class: "timeline-item" }, [
                        h("span", { class: "timeline-date" }, date),
                        h(
                          RouteLink,
                          {
                            class: "timeline-title",
                            to: path,
                          },
                          () => info.title,
                        ),
                      ]),
                    ),
                  ),
                ]),
              ],
            ),
          ),
        ]),
      );
  },
});
