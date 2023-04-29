import { defineClientConfig } from "@vuepress/client";

import SearchModal from "./components/SearchModal.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("SearchModal", SearchModal);
  },
});
