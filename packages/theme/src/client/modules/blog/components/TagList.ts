import { entries } from "@vuepress/helper/client";
import type { BlogPluginCategoryFrontmatter } from "@vuepress/plugin-blog";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { RouteLink, usePageFrontmatter } from "vuepress/client";
import { generateIndexFromHash } from "vuepress-shared/client";

import { useTagMap } from "@theme-hope/modules/blog/composables/index";

import cssVariables from "../../../styles/variables.module.scss";

import "../styles/tag-list.scss";

export default defineComponent({
  name: "TagList",

  setup() {
    const frontmatter = usePageFrontmatter<BlogPluginCategoryFrontmatter>();
    const tagMap = useTagMap();

    const isActive = (name: string): boolean =>
      name === frontmatter.value.blog?.name;

    return (): VNode =>
      h(
        "ul",
        { class: "vp-tag-list" },
        entries(tagMap.value.map)
          // Sort from more to less
          .sort(([, a], [, b]) => b.items.length - a.items.length)
          .map(([tag, { path, items }]) =>
            h(
              "li",
              {
                class: [
                  "vp-tag",
                  `color${generateIndexFromHash(tag, Number(cssVariables["colorNumber"]))}`,
                  { active: isActive(tag) },
                ],
              },
              h(RouteLink, { to: path }, () => [
                tag,
                h("span", { class: "vp-tag-count" }, items.length),
              ]),
            ),
          ),
      );
  },
});
