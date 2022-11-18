import { defineClientConfig } from "@vuepress/client";

import SearchBox from "./components/SearchBox.js";

export default defineClientConfig({
  enhance({ app }) {
    app.component("SearchBox", SearchBox);
  },
});
