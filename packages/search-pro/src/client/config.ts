import { defineClientConfig } from "@vuepress/client";

import SearchBox from "./components/SearchBox.js";
import SearchModal from "./components/SearchModal.js";
import { setupSearchModal } from "./composables/index.js";

export default defineClientConfig({
  enhance({ app }) {
    app.component("SearchBox", SearchBox);
  },
  setup() {
    setupSearchModal();
  },
  rootComponents: [SearchModal],
});
