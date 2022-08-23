import { defineClientConfig } from "@vuepress/client";
import { setupCopyCode } from "./composables.js";

import "balloon-css/balloon.css";
import "./styles/button.scss";

export default defineClientConfig({
  setup: () => {
    setupCopyCode();
  },
});
