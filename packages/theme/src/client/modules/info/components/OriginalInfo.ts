import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import { useMetaLocale } from "@theme-hope/modules/info/composables/index";

import "../styles/original-info.scss";

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
