import { defineClientConfig, usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import CommentProvider from "@CommentProvider";
import { commentOptions } from "./define";

import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../shared";

export default defineClientConfig({
  enhance: ({ app }) => {
    const CommentService = defineComponent({
      name: "CommentService",

      props: {
        darkmode: {
          type: Boolean,
          default: false,
        },
      },

      setup(props) {
        const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

        const enabled = computed(() => {
          return (
            frontmatter.value.comment ||
            (commentOptions.comment !== false &&
              frontmatter.value.comment !== false)
          );
        });

        return (): VNode | null =>
          h(CommentProvider, {
            darkmode: props.darkmode,
            style: { display: enabled.value ? "block" : "none" },
          });
      },
    });

    app.component("CommentService", CommentService);
  },
});
