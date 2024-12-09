import { defineClientConfig } from "vuepress/client";

import LightGallery from "./components/LightGallery.js";

export default defineClientConfig({
  rootComponents: [LightGallery],
});
