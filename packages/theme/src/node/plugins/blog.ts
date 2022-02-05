import type { BlogOptions } from "vuepress-plugin-blog2";
import type { HopeThemeConfig } from "../../shared";

export const resolveBlogOptions = (
  themeConfig: HopeThemeConfig
): BlogOptions | false => {
  if (themeConfig.enableBlog === false) return false;

  return {
    metaScope: "",
    filter: ({ routeMeta }) => routeMeta.type !== "page",
    category: [
      {
        key: "category",
        getter: ({ routeMeta }) => routeMeta.category || [],
        layout: "Layout",
        itemLayout: "Layout",
      },
      {
        key: "tag",
        getter: ({ routeMeta }) => routeMeta.tag || [],
        layout: "Layout",
        itemLayout: "Layout",
      },
    ],
    type: [
      {
        key: "slide",
        filter: ({ routeMeta }) => routeMeta.type === "slide",
      },
      {
        key: "encrypted",
        filter: ({ routeMeta }) => routeMeta.isEncrypted,
      },
    ],
  } as BlogOptions;
};
