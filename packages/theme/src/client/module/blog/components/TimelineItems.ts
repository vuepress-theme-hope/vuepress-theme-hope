import { computed, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useThemeLocaleData } from "@theme-hope/composables";
import {
  useBlogOptions,
  useTimelines,
} from "@theme-hope/module/blog/composables";
import TOC from "@theme-hope/module/info/components/TOC";

import type { VNode } from "vue";

import "../styles/timeline-items.scss";

export default defineComponent({
  name: "TimelineItems",

  setup() {
    const blogOptions = useBlogOptions();
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();

    const hint = computed(
      () =>
        blogOptions.value.timeline ||
        themeLocale.value.blogLocales.timelineTitle
    );

    const items = computed(() =>
      timelines.value.config.map(({ year }) => ({
        title: year.toString(),
        level: 2,
        slug: year.toString(),
        children: [],
      }))
    );

    return (): VNode =>
      h(
        "div",
        { class: "timeline-wrapper" },
        h("ul", { class: "timeline-content" }, [
          h(DropTransition, () => h("li", { class: "motto" }, hint.value)),
          h(TOC, { items: items.value }),
          ...timelines.value.config.map(({ year, items }, index) =>
            h(
              DropTransition,
              { appear: true, delay: 0.08 * (index + 1), type: "group" },
              () => [
                h(
                  "h3",
                  { key: "title", id: year, class: "timeline-year-title" },
                  h("span", year)
                ),
                h("li", { key: "content", class: "timeline-year-list" }, [
                  h(
                    "ul",
                    { class: "timeline-year-wrapper" },
                    items.map(({ date, info, path }) =>
                      h("li", { class: "timeline-item" }, [
                        h("span", { class: "timeline-date" }, date),
                        h(
                          RouterLink,
                          {
                            class: "timeline-title",
                            to: path,
                          },
                          () => info.title
                        ),
                      ])
                    )
                  ),
                ]),
              ]
            )
          ),
        ])
      );
  },
});
