import { setupArticles } from "./articles";
import { setupCategoryMap } from "./categoryMap";
import { setupEncryptedArticles } from "./encryptedArticles";
import { setupSlides } from "./slides";
import { setupStars } from "./stars";
import { setupTagMap } from "./tagMap";
import { setupTimelines } from "./timelines";

export const setupBlog = (): void => {
  setupArticles();
  setupCategoryMap();
  setupEncryptedArticles();
  setupSlides();
  setupStars();
  setupTagMap();
  setupTimelines();
};
