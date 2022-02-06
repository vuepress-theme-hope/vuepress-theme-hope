import { computed, defineComponent, h } from "vue";
import PageAnchor from "../PageAnchor";
import DropTransition from "../transitions/DropTransition.vue";
import {
  useBlogOptions,
  useNavigate,
  useTimelines,
  useThemeLocaleData,
} from "../../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "TimelineItems",

  setup() {
    const blogOptions = useBlogOptions();
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();
    const navigate = useNavigate();

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
          h(PageAnchor, { items: items.value }),
          ...timelines.value.config.map(({ year, items }, index) =>
            h(DropTransition, { delay: 0.08 * (index + 1) }, () =>
              h("li", [
                h("h3", { id: year, class: "year" }, h("span", year)),
                h(
                  "ul",
                  { class: "year-wrapper" },
                  items.map(({ date, path, meta }) =>
                    h("li", [
                      h("span", { class: "date" }, date),
                      h(
                        "span",
                        {
                          class: "title",
                          onClick: () => navigate(path),
                        },
                        meta.title
                      ),
                    ])
                  )
                ),
              ])
            )
          ),
        ])
      );
  },
});
