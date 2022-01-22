// TODO: Support it when vssue support vuepress2
// import { usePageTitle } from "@mr-hope/vuepress-shared/lib/client";
import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import Waline from "@Waline";
import { commentOptions } from "../define";

import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "CommentService",

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

    const type = commentOptions.type;

    const enable = computed(() => {
      return (
        commentOptions.type !== "disable" &&
        (frontmatter.value.comment ||
          (commentOptions.comment !== false &&
            (commentOptions.type === "waline" ||
              frontmatter.value.comment !== false)))
      );
    });

    return (): VNode | null =>
      type === "waline"
        ? h(Waline, { style: { display: enable.value ? "block" : "none" } })
        : // : type === "vssue"
          // ? h(Vssue, {
          //     title: usePageTitle().value,
          //     style: { display: enable.value ? "block" : "none" },
          //   })
          null;
  },
});
