import { defineClientConfig } from "@vuepress/client";
import AddThis from "./components/AddThis";

export default defineClientConfig({
  rootComponents: [AddThis],
});
