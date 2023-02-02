import { type VNode, defineComponent, h, resolveComponent } from "vue";
import {
  BitbucketIcon,
  GitHubIcon,
  GiteeIcon,
  GitlabIcon,
  SourceIcon,
} from "vuepress-shared/client";

import { useNavbarRepo } from "@theme-hope/modules/navbar/composables/index";

import "../styles/repo-link.scss";

export default defineComponent({
  name: "RepoLink",

  components: { BitbucketIcon, GiteeIcon, GitHubIcon, GitlabIcon, SourceIcon },

  setup() {
    const repo = useNavbarRepo();

    return (): VNode | null =>
      repo.value
        ? h(
            "div",
            { class: "nav-item" },
            h(
              "a",
              {
                class: "repo-link",
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
              })
            )
          )
        : null;
  },
});
