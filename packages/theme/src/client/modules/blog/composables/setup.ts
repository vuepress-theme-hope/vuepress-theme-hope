import { setupArticles } from "./articles.js";
import { setupCategoryMap } from "./categoryMap.js";
import { setupStars } from "./stars.js";
import { setupTagMap } from "./tagMap.js";
import { setupTimelines } from "./timelines.js";

export const setupBlog = (): void => {
  setupArticles();
  setupCategoryMap();
  setupStars();
  setupTagMap();
  setupTimelines();
};
