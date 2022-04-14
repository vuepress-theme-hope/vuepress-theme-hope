import { defineClientAppEnhance } from "@vuepress/client";
import ArticleInfo from "@ArticleInfo";
import Badge from "@Badge";

export default defineClientAppEnhance(({ app }) => {
  if (ArticleInfo.name) app.component("ArticleInfo", ArticleInfo);
  // eslint-disable-next-line vue/multi-word-component-names
  if (Badge.name) app.component("Badge", Badge);
});
