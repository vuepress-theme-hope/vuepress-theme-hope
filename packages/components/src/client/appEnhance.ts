import { defineClientAppEnhance } from "@vuepress/client";
import Badge from "@Badge";
import BreadCrumb from "@BreadCrumb";
import Pagination from "@Pagination";
import ScreenFull from "@ScreenFull";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app }) => {
  // eslint-disable-next-line vue/multi-word-component-names
  if (Badge.name) app.component("Badge", Badge);
  if (BreadCrumb.name) app.component("BreadCrumb", BreadCrumb);
  // eslint-disable-next-line vue/multi-word-component-names
  if (Pagination.name) app.component("Pagination", Pagination);
  if (ScreenFull.name) app.component("ScreenFull", ScreenFull);
});
