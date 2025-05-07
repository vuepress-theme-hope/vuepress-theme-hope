import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { RepoIcon } from "vuepress-shared/client";

import { useNavbarRepo } from "@theme-hope/composables/navbar/useNavbarRepo";

import "../../styles/navbar/repo-link.scss";

export default defineComponent({
  name: "RepoLink",

  setup() {
    const repo = useNavbarRepo();

    return (): VNode | null =>
      repo.value
        ? h(
            "div",
            { class: "vp-nav-item vp-action" },
            h(
              "a",
              {
                class: "vp-action-link",
                href: repo.value.link,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": repo.value.label,
              },
              h(RepoIcon, {
                type: repo.value.type,
                style: {
                  width: "1.25rem",
                  height: "1.25rem",
                  verticalAlign: "middle",
                },
              }),
            ),
          )
        : null;
  },
});
