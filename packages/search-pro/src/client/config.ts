import { defineClientConfig } from "@vuepress/client";
import { defineAsyncComponent } from "vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component(
      "SearchBox",
      defineAsyncComponent(() => import("./components/SearchBox.vue.js"))
    );
  },
});
