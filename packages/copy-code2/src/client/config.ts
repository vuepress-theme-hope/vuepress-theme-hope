import type { ClientConfig } from "vuepress/client";
import { defineClientConfig } from "vuepress/client";

import { setupCopyCode } from "./composables/index.js";

import "balloon-css/balloon.css";
import "./styles/button.scss";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  setup: () => {
    setupCopyCode();
  },
});
