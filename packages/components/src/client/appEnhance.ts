import { defineClientAppEnhance } from "@vuepress/client";
import Badge from "./components/Badge";
import BreadCrumb from "./components/BreadCrumb";
import CodeGroup from "./components/CodeGroup";
import CodeGroupItem from "./components/CodeGroupItem";
import ExternalLinkIcon from "./components/ExternalLinkIcon";
import Pagination from "./components/Pagination.vue";
import ScreenFull from "./components/ScreenFull";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app }) => {
  // eslint-disable-next-line vue/multi-word-component-names
  app.component("Badge", Badge);
  app.component("BreadCrumb", BreadCrumb);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", CodeGroupItem);
  // override the built-in `<ExternalLinkIcon>`
  app.component("ExternalLinkIcon", ExternalLinkIcon);
  // eslint-disable-next-line vue/multi-word-component-names
  app.component("Pagination", Pagination);
  app.component("ScreenFull", ScreenFull);
});
