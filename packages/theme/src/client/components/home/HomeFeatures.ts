import { usePageFrontmatter } from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import { computed, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import { usePure } from "../../composables";

import type { VNode } from "vue";
import type { ProjectHomePageFrontmatter } from "../../../shared";

export default defineComponent({
  name: "HomeFeatures",
  setup() {
    const frontmatter = usePageFrontmatter<ProjectHomePageFrontmatter>();
    const isPure = usePure();

    const features = computed(() => {
      if (isArray(frontmatter.value.features))
        return frontmatter.value.features;

      return [];
    });

    return (): VNode | null =>
      features.value.length
        ? h(
            "div",
            { class: "features" },
            frontmatter.value.features?.map((feature, index) =>
              feature.link
                ? h(
                    RouterLink,
                    {
                      class: [
                        "feature link",
                        {
                          [`feature${(index % 9) + 1}`]: !isPure.value,
                        },
                      ],

                      to: feature.link,
                      role: "navigation",
                    },
                    {
                      default: () => [
                        h("h2", feature.title),
                        h("p", feature.details),
                      ],
                    }
                  )
                : h(
                    "div",
                    {
                      class: [
                        "feature",
                        {
                          [`feature${(index % 9) + 1}`]: !isPure.value,
                        },
                      ],
                    },
                    [h("h2", feature.title), h("p", feature.details)]
                  )
            )
          )
        : null;
  },
});
