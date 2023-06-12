import { defineClientConfig } from "@vuepress/client";
import SlidePage from "vuepress-plugin-md-enhance/SlidePage";

export default defineClientConfig({
  layouts: {
    Slide: SlidePage,
  },
});
