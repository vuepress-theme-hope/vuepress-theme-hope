import type { FunctionalComponent } from "vue";
import { h } from "vue";

import BlogHomePage from "@theme-hope/modules/blog/components/BlogHomePage";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";

const BlogHome: FunctionalComponent = () =>
  h(BlogWrapper, () => h(BlogHomePage));

BlogHome.displayName = "BlogHome";

export default BlogHome;
