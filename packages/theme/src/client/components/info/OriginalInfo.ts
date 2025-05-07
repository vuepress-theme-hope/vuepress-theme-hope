import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import { useMetaLocale } from "@theme-hope/composables/info/useMetaLocale";

import "../../styles/info/original-info.scss";

export default defineComponent({
  name: "OriginalInfo",

  inheritAttrs: false,

  props: {
    /**
     * Whether the article is original
     *
     * 文章是否是原创
     */
    isOriginal: Boolean,
  },

  setup(props) {
    const metaLocale = useMetaLocale();

    return (): VNode | null =>
      props.isOriginal
        ? h("span", { class: "page-original-info" }, metaLocale.value.origin)
        : null;
  },
});
