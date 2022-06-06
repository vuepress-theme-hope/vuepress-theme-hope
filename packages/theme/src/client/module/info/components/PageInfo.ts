import { defineComponent, resolveComponent, h } from "vue";

import { usePure } from "@theme-hope/composables";

import AuthorInfo from "@theme-hope/module/info/components/AuthorInfo";
import CategoryInfo from "@theme-hope/module/info/components/CategoryInfo";
import DateInfo from "@theme-hope/module/info/components/DateInfo";
import PageViewInfo from "@theme-hope/module/info/components/PageViewInfo";
import ReadingTimeInfo from "@theme-hope/module/info/components/ReadingTimeInfo";
import TagInfo from "@theme-hope/module/info/components/TagInfo";
import OriginalInfo from "@theme-hope/module/info/components/OriginalMark";
import WordInfo from "@theme-hope/module/info/components/WordInfo";

import type { PropType, VNode } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type {
  AuthorInfo as AuthorInfoType,
  DateInfo as DateInfoType,
} from "vuepress-shared";
import type { PageCategory, PageTag } from "@theme-hope/module/info/utils";
import type { PageInfo } from "../../../../shared";

import "balloon-css/balloon.css";
import "../styles/page-info.scss";

export interface PageInfoProps {
  /**
   * Authors of article
   *
   * 文章作者
   */
  author?: AuthorInfoType[];

  /**
   * Categories of article
   *
   * 文章分类
   */
  category?: PageCategory[];

  /**
   * Tags of article
   *
   * 文章标签
   */
  tag?: PageTag[];

  /**
   * Writing Date
   *
   * 写作日期
   */
  date?: DateInfoType | null;

  /**
   * Writing Date
   *
   * 写作日期
   */
  localizedDate?: string;

  /**
   * Whether the article is original
   *
   * 文章是否原创
   */
  isOriginal?: boolean;

  /**
   * Whether enable pageview
   *
   * If the value is a string, it will use as search id
   *
   * 是否启用访问量
   *
   * 如果值为字符串，会用做查询 id
   */
  pageview?: string | boolean;

  /**
   * ReadingTime info
   *
   * 阅读时间
   */
  readingTime?: ReadingTime | null;
}

export default defineComponent({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    OriginalInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo,
  },

  props: {
    items: {
      type: [Array, Boolean] as PropType<PageInfo[] | false>,
      default: (): PageInfo[] => [
        "Author",
        "Original",
        "Date",
        "Category",
        "Tag",
        "ReadingTime",
      ],
    },

    config: {
      type: Object as PropType<PageInfoProps>,
      required: true,
    },
  },

  setup(props) {
    const pure = usePure();

    return (): VNode | null =>
      props.items
        ? h(
            "div",
            { class: "page-info" },
            props.items.map((item) =>
              h(resolveComponent(`${item}Info`), {
                ...props.config,
                pure: pure.value,
              })
            )
          )
        : null;
  },
});
