import { defineComponent, h, onMounted } from "vue";
import { pubID } from "../define";

import type { VNode } from "vue";

export default defineComponent({
  name: "AddThis",

  setup() {
    onMounted(() => {
      const link = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${pubID}`;
      const script = document.createElement("script");

      script.src = link;

      // inject script tag
      document.getElementsByTagName("body")[0].appendChild(script);
    });

    return (): VNode => h("div", { class: "add-this" });
  },
});
