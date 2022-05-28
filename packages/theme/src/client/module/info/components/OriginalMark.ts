import { defineComponent, h } from "vue";

import { useMetaLocale } from "@theme-hope/module/info/composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "OriginalMark",

  props: {
    isOriginal: Boolean,
  },

  setup(props) {
    const metaLocale = useMetaLocale();

    return (): VNode | null =>
      props.isOriginal
        ? h("span", { class: "origin" }, metaLocale.value.origin)
        : null;
  },
});
