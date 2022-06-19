import { defineClientConfig, usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import CommentProvider from "@CommentProvider";

import type { VNode } from "vue";
import type { CommentOptions, CommentPluginFrontmatter } from "../shared";

declare const COMMENT_OPTIONS: CommentOptions;

const enableComment = COMMENT_OPTIONS;

export default defineClientConfig({
  enhance: ({ app }) => {
    const CommentService = defineComponent({
      name: "CommentService",

      props: {
        darkmode: Boolean,
      },

      setup(props) {
        const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

        const enabled = computed(() => {
          return (
            frontmatter.value.comment ||
            (enableComment !== false && frontmatter.value.comment !== false)
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
