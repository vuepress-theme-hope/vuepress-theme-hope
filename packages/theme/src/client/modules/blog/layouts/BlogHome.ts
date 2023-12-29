import type { FunctionalComponent } from "vue";
import { h } from "vue";

import BlogHome from "@theme-hope/modules/blog/components/BlogHome";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";

const BlogHomeLayout: FunctionalComponent = () =>
  h(BlogWrapper, () => h(BlogHome));

BlogHomeLayout.displayName = "BlogHomeLayout";

export default BlogHomeLayout;
