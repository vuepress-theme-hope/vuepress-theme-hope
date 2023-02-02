import { defineClientConfig, usePageFrontmatter } from "@vuepress/client";
import { type VNode, computed, defineComponent, h } from "vue";
import CommentProvider from "vuepress-plugin-comment2/provider";

import {
  type CommentOptions,
  type CommentPluginFrontmatter,
} from "../shared/index.js";

declare const COMMENT_OPTIONS: CommentOptions;

const enableComment = COMMENT_OPTIONS.comment !== false;

const CommentService = defineComponent({
  name: "CommentService",

  props: {
    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: Boolean,
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

    const enabled = computed(() => {
      return (
        frontmatter.value.comment ||
        (enableComment && frontmatter.value.comment !== false)
      );
    });

    return (): VNode | null =>
      h(CommentProvider, {
        darkmode: props.darkmode,
        style: { display: enabled.value ? "block" : "none" },
      });
  },
});

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("CommentService", CommentService);
  },
});
