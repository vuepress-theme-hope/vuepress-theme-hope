import { defineClientAppEnhance } from "@vuepress/client";
import ArticleInfo from "@ArticleInfo";
import Badge from "@Badge";
import BreadCrumb from "@BreadCrumb";
import FullScreen from "@FullScreen";
import Pagination from "@Pagination";
import TOC from "@TOC";

export default defineClientAppEnhance(({ app }) => {
  if (ArticleInfo.name) app.component("ArticleInfo", ArticleInfo);
  // eslint-disable-next-line vue/multi-word-component-names
  if (Badge.name) app.component("Badge", Badge);
  if (BreadCrumb.name) app.component("BreadCrumb", BreadCrumb);
  if (FullScreen.name) app.component("FullScreen", FullScreen);
  if (TOC.name) app.component("TOC", TOC);
  // eslint-disable-next-line vue/multi-word-component-names
  if (Pagination.name) app.component("Pagination", Pagination);
});
