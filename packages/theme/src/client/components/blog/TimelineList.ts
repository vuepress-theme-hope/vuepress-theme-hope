import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { RouteLink } from "vuepress/client";

import { TimelineIcon } from "@theme-hope/components/blog/icons";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useBlogLocaleData } from "@theme-hope/composables/blog/useBlogLocale";
import { useTimeline } from "@theme-hope/composables/blog/useTimeline";
import { useNavigate } from "@theme-hope/composables/useNavigate";

import "../../styles/blog/timeline-list.scss";

export default defineComponent({
  name: "TimelineList",

  setup() {
    const blogLocale = useBlogLocaleData();
    const timelines = useTimeline();
    const navigate = useNavigate();

    return (): VNode =>
      h("div", { class: "timeline-list-wrapper" }, [
        h(
          "div",
          {
            class: "title",
            onClick: () => {
              navigate(timelines.value.path);
            },
          },
          [
            h(TimelineIcon),
            h("span", { class: "num" }, timelines.value.items.length),
            blogLocale.value.timeline,
          ],
        ),
        h("hr"),
        h(
          "div",
          { class: "timeline-content" },
          h(
            "ul",
            { class: "timeline-list" },
            timelines.value.config.map(({ year, items }, index) =>
              h(
                DropTransition,
                { appear: true, delay: 0.08 * (index + 1) },
                () =>
                  h("li", [
                    h("h3", { class: "timeline-year" }, year),
                    h(
                      "ul",
                      { class: "timeline-year-wrapper" },
                      items.map(({ date, info, path }) =>
                        h("li", { class: "timeline-item" }, [
                          h("span", { class: "timeline-date" }, date),
                          h(
                            RouteLink,
                            { class: "timeline-title", to: path },
                            () => info.title,
                          ),
                        ]),
                      ),
                    ),
                  ]),
              ),
            ),
          ),
        ),
      ]);
  },
});
