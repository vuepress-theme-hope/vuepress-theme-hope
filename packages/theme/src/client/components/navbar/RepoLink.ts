import { defineComponent, h, resolveComponent } from "vue";
import { useNavbarRepo } from "../../composables";
import {
  BitbucketIcon,
  GiteeIcon,
  GitHubIcon,
  GitlabIcon,
  SourceIcon,
} from "../icons";

import type { VNode } from "vue";

export default defineComponent({
  name: "RepoLink",

  components: { BitbucketIcon, GiteeIcon, GitHubIcon, GitlabIcon, SourceIcon },

  setup() {
    const repo = useNavbarRepo();

    return (): VNode | null =>
      repo.value
        ? h(
            "a",
            {
              class: "repo-link",
              href: repo.value.link,
              target: "_blank",
              rel: "noopener noreferrer",
            },
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            h(resolveComponent(`${repo.value.type}Icon`), {
              style: {
                width: "1.25rem",
                height: "1.25rem",
                verticalAlign: "middle",
              },
            })
          )
        : null;
  },
});
