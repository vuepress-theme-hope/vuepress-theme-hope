import { defineClientConfig } from "@vuepress/client";

import SearchButton from "./components/SearchButton.js";

export default defineClientConfig({
  enhance({ app }) {
    app.component("SearchButton", SearchButton);
  },
});
