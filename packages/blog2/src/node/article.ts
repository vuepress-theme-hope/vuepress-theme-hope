import type { App } from "@vuepress/core";
import type { ArticleMap, PageMap } from "../shared";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogArticles) {
    __VUE_HMR_RUNTIME__.updateBlogArticles(articleMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ articleMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogArticles(articleMap)
  })
}
`;

export const prepareArticle = async (
  app: App,
  pageMap: PageMap
): Promise<void> => {
  const articleMap: ArticleMap = {};

  for (const routeLocale in pageMap)
    articleMap[routeLocale] = pageMap[routeLocale].map(({ key }) => key);

  await app.writeTemp(
    `blog/article.js`,
    `export const articleMap = ${JSON.stringify(articleMap)}\n${HMR_CODE}`
  );
};
