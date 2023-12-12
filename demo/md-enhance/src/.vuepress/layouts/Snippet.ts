import { Content } from "@vuepress/client";
import { h, type FunctionalComponent } from "vue";

const Snippet: FunctionalComponent = () => h(Content);

Snippet.displayName = "Snippet";

export default Snippet;
