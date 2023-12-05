import type { VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import {
  BitbucketIcon,
  GitHubIcon,
  GitLabIcon,
  GiteeIcon,
  SourceIcon,
} from "vuepress-shared/client";

import { useNavbarRepo } from "@theme-hope/modules/navbar/composables/index";

import "../styles/repo-link.scss";

export default defineComponent({
  name: "RepoLink",

  components: { BitbucketIcon, GiteeIcon, GitHubIcon, GitLabIcon, SourceIcon },

  setup() {
    const repo = useNavbarRepo();

    return (): VNode | null =>
      repo.value
        ? h(
            "div",
            { class: "nav-item vp-repo" },
            h(
              "a",
              {
                class: "vp-repo-link",
                href: repo.value.link,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": repo.value.label,
              },
              h(resolveComponent(`${repo.value.type}Icon`), {
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
