import type { ClientConfig } from "vuepress/client";
import { defineClientConfig } from "vuepress/client";

import { setupCopyright } from "./composables/index.js";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  setup: () => {
    setupCopyright();
  },
});
