// TODO: Support vssue when it support vue3
// import { usePageTitle } from "@mr-hope/vuepress-shared/lib/client";
import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import Giscus from "@Giscus";
import Waline from "@Waline";
import { commentOptions } from "../define";

import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "CommentService",

  props: {
    darkmode: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

    const enable = computed(() => {
      return (
        frontmatter.value.comment ||
        (commentOptions.comment !== false &&
          frontmatter.value.comment !== false)
      );
    });

    return (): VNode | null =>
      commentOptions.type === "waline"
        ? h(Waline, { style: { display: enable.value ? "block" : "none" } })
        : commentOptions.type === "giscus"
        ? h(Giscus, {
            darkmode: props.darkmode,
            style: { display: enable.value ? "block" : "none" },
          })
        : // : type === "vssue"
          // ? h(Vssue, {
          //     title: usePageTitle().value,
          //     style: { display: enable.value ? "block" : "none" },
          //   })
          null;
  },
});
