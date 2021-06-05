import { defineClientAppEnhance } from "@vuepress/client";
import Badge from "./components/Badge";
import BreadCrumb from "./components/BreadCrumb";
import CodeGroup from "./components/CodeGroup";
import CodeGroupItem from "./components/CodeGroupItem";
import OutboundLink from "./components/OutboundLink";
import Pagination from "./components/Pagination.vue";
import ScreenFull from "./components/ScreenFull";

import "@mr-hope/vuepress-shared/styles/config/index.scss";
import "./styles/index.scss";

export default defineClientAppEnhance(({ app }) => {
  app.component("Badge", Badge);
  app.component("BreadCrumb", BreadCrumb);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", CodeGroupItem);
  app.component("OutboundLink", OutboundLink);
  app.component("Pagination", Pagination);
  app.component("ScreenFull", ScreenFull);
});
