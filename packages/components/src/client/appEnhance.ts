import { defineClientAppEnhance } from "@vuepress/client";
import Badge from "./components/Badge";
import BreadCrumb from "./components/BreadCrumb";
import CodeGroup from "./components/CodeGroup";
import CodeGroupItem from "./components/CodeGroupItem";
import OutboundLink from "./components/OutboundLink";
import Pagination from "./components/Pagination.vue";
import ScreenFull from "./components/ScreenFull";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app }) => {
  // eslint-disable-next-line vue/multi-word-component-names
  app.component("Badge", Badge);
  app.component("BreadCrumb", BreadCrumb);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", CodeGroupItem);
  // unregister the built-in `<OutboundLink>` to avoid warning
  delete app._context.components.OutboundLink;
  // override the built-in `<OutboundLink>`
  app.component("OutboundLink", OutboundLink);
  // eslint-disable-next-line vue/multi-word-component-names
  app.component("Pagination", Pagination);
  app.component("ScreenFull", ScreenFull);
});
