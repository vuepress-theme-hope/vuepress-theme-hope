import { defineClientConfig } from "@vuepress/client";
import LightGallery from "./components/LightGallery";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("LightGallery", LightGallery);
  },
});
