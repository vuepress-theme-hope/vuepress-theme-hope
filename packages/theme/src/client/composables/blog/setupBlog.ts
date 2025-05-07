import { setupArticles } from "@theme-hope/composables/blog/useArticles";
import { setupCategoryMap } from "@theme-hope/composables/blog/useCategoryMap";
import { setupStars } from "@theme-hope/composables/blog/useStars";
import { setupTagMap } from "@theme-hope/composables/blog/useTagMap";
import { setupTimeline } from "@theme-hope/composables/blog/useTimeline";

export const setupBlog = (): void => {
  setupArticles();
  setupCategoryMap();
  setupStars();
  setupTagMap();
  setupTimeline();
};
