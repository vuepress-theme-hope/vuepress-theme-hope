import { defineClientAppEnhance } from "@vuepress/client";
import Badge from "@Badge";
import BreadCrumb from "@BreadCrumb";
import Pagination from "@Pagination";
import ScreenFull from "@ScreenFull";
import CodeGroup from "./components/CodeGroup";
import CodeGroupItem from "./components/CodeGroupItem";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app }) => {
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", CodeGroupItem);

  // eslint-disable-next-line vue/multi-word-component-names
  if (Badge.name) app.component("Badge", Badge);
  if (BreadCrumb.name) app.component("BreadCrumb", BreadCrumb);
  // eslint-disable-next-line vue/multi-word-component-names
  if (Pagination.name) app.component("Pagination", Pagination);
  if (ScreenFull.name) app.component("ScreenFull", ScreenFull);
});
