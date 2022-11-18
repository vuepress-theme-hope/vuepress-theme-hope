import { defineClientConfig } from "@vuepress/client";

import SearchPro from "./components/SearchPro.js";

export default defineClientConfig({
  enhance({ app }) {
    app.component("SearchPro", SearchPro);
  },
});
