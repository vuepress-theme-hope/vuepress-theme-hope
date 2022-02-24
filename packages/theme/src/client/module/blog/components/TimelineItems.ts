import { computed, defineComponent, h, resolveComponent } from "vue";
import { RouterLink } from "vue-router";

import { DropTransition } from "@theme-hope/components/transitions";
import { useThemeLocaleData } from "@theme-hope/composables";
import {
  useBlogOptions,
  useTimelines,
} from "@theme-hope/module/blog/composables";

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
          h(DropTransition, () => h("li", { class: "desc" }, hint.value)),
          h(resolveComponent("TOC"), { items: items.value }),
          ...timelines.value.config.map(({ year, items }, index) =>
            h(
              DropTransition,
              { delay: 0.08 * (index + 1), type: "group" },
              () => [
                h(
                  "h3",
                  { key: "title", id: year, class: "year" },
                  h("span", year)
                ),
                h("li", { key: "content", class: "year-list" }, [
                  h(
                    "ul",
                    { class: "year-wrapper" },
                    items.map(({ date, info, path }) =>
                      h("li", [
                        h("span", { class: "date" }, date),
                        h(
                          RouterLink,
                          {
                            class: "title",
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
