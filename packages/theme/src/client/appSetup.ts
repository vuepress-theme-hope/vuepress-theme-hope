import { defineClientAppSetup } from "@vuepress/client";
import {
  setupArticles,
  setupCategoryMap,
  setupDarkMode,
  setupEncryptedArticles,
  setupSlides,
  setupSidebarItems,
  setupStars,
  setupTagMap,
  setupTimelines,
} from "./composables";

export default defineClientAppSetup(() => {
  setupArticles();
  setupCategoryMap();
  setupDarkMode();
  setupEncryptedArticles();
  setupSlides();
  setupSidebarItems();
  setupStars();
  setupTagMap();
  setupTimelines();
});
