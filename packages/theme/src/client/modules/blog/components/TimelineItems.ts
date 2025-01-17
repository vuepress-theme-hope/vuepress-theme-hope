import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import type { PageHeader } from "vuepress/client";
import { RouteLink } from "vuepress/client";

import { DropTransition } from "@theme-hope/components/transitions/index";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import {
  useBlogOptions,
  useTimeline,
} from "@theme-hope/modules/blog/composables/index";
import TOC from "@theme-hope/modules/info/components/TOC";

import { PageInfo } from "../../../../shared/index.js";

import "../styles/timeline-items.scss";

export default defineComponent({
  name: "TimelineItems",

  setup() {
    const blogOptions = useBlogOptions();
    const themeLocale = useThemeLocaleData();
    const timelines = useTimeline();

    const hint = computed(
      () =>
        blogOptions.value.timeline ??
        themeLocale.value.blogLocales.timelineTitle,
    );

    const items = computed<PageHeader[]>(() =>
      timelines.value.config.map(({ year }) => ({
        title: year.toString(),
        level: 2,
        slug: year.toString(),
        children: [],
        link: `#${year}`,
      })),
    );

    return (): VNode =>
      h(
        "div",
        { class: "timeline-wrapper" },
        h("ul", { class: "timeline-content" }, [
          h(DropTransition, () => h("li", { class: "motto" }, hint.value)),
          h(TOC, { items: items.value }),
          timelines.value.config.map(({ year, items }, index) =>
            h(
              DropTransition,
              { appear: true, delay: 0.08 * (index + 1), type: "group" },
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
                          () => info[PageInfo.title],
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
