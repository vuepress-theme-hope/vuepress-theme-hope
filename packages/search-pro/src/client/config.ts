import { defineClientConfig } from "@vuepress/client";

import SearchBox from "./components/SearchBox.js";
import SearchModal from "./components/SearchModal.js";
import { setupSearchModal } from "./composables/index.js";
import { injectMiniSearchConfig } from "./helpers/index.js";

export default defineClientConfig({
  enhance({ app }) {
    injectMiniSearchConfig(app);
    app.component("SearchBox", SearchBox);
  },
  setup() {
    setupSearchModal();
  },
  rootComponents: [SearchModal],
});
