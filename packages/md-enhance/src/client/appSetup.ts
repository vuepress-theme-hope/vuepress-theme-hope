import { defineClientAppSetup } from "@vuepress/client";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { initDemo } from "./demo";

import "./styles/code-demo.scss";

export default defineClientAppSetup(() => {
  const route = useRoute();

  watch(
    () => route.path,
    () => initDemo()
  );

  onMounted(() => initDemo());
});
