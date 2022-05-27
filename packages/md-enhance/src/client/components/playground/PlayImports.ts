import { defineComponent } from "vue";

import type { VNode } from "vue";

export default defineComponent({
  name: "PlayImports",

  props: {
    id: { type: String, required: true },
    title: { type: String, default: "" },
    config: { type: String, required: true },
    lang: { type: String, default: "" },
  },

  setup() {
    return (): (VNode | null)[] => [
      // empty
    ];
  },
});
