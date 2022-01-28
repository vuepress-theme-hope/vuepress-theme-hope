import { defineClientAppEnhance } from "@vuepress/client";
import Badge from "@Badge";
import BreadCrumb from "@BreadCrumb";
import PageInfo from "@PageInfo";
import Pagination from "@Pagination";
import ScreenFull from "@ScreenFull";

export default defineClientAppEnhance(({ app }) => {
  // eslint-disable-next-line vue/multi-word-component-names
  if (Badge.name) app.component("Badge", Badge);
  if (BreadCrumb.name) app.component("BreadCrumb", BreadCrumb);
  if (PageInfo.name) app.component("PageInfo", PageInfo);
  // eslint-disable-next-line vue/multi-word-component-names
  if (Pagination.name) app.component("Pagination", Pagination);
  if (ScreenFull.name) app.component("ScreenFull", ScreenFull);
});
