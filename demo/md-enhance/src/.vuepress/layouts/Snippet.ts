import type { FunctionalComponent } from "vue";
import { h } from "vue";
import { Content } from "vuepress/client";

const Snippet: FunctionalComponent = () => h(Content);

Snippet.displayName = "Snippet";

export default Snippet;
