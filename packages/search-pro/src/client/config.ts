import type { ClientConfig } from "vuepress/client";
import { defineClientConfig } from "vuepress/client";

import SearchBox from "./components/SearchBox.js";
import SearchModal from "./components/SearchModal.js";
import { setupSearchModal } from "./composables/index.js";
import { injectSearchConfig } from "./helpers/index.js";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  enhance({ app }) {
    injectSearchConfig(app);
    app.component("SearchBox", SearchBox);
  },
  setup() {
    setupSearchModal();
  },
  rootComponents: [SearchModal],
});
