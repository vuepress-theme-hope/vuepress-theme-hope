import { computed, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { TimelineIcon } from "@theme-hope/module/blog/components/icons";
import { useTimelines } from "@theme-hope/module/blog/composables";
import { useNavigate, useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/timeline-list.scss";

export default defineComponent({
  name: "TimelineList",

  setup() {
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();
    const navigate = useNavigate();

    const hint = computed(() => themeLocale.value.blogLocales.timeline);

    return (): VNode =>
      h("div", { class: "timeline-list-wrapper" }, [
        h(
          "div",
          {
            class: "timeline-list-title",
            onClick: () => navigate(timelines.value.path),
          },
          [
            h(TimelineIcon),
            h("span", { class: "num" }, timelines.value.items.length),
            hint.value,
          ]
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
                  ])
              )
            )
          )
        ),
      ]);
  },
});
