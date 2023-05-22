import { useScriptTag } from "@vueuse/core";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "CopyContentButton",

  setup() {
    useScriptTag("//unpkg.com/juice@9/client.js");
    onMounted(() => {});
  },
});
