import { defineClientAppSetup } from "@vuepress/client";
import { onMounted, onUpdated } from "vue";
import { initDemo } from "./demo";

import "./styles/code-demo.scss";

export default defineClientAppSetup(() => {
  onMounted(() => {
    initDemo();
  });
  onUpdated(() => {
    initDemo();
  });
});
