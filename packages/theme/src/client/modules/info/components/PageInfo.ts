import { defineComponent, resolveComponent, h } from "vue";

import { usePure } from "@theme-hope/composables/index.js";

import AuthorInfo from "@theme-hope/modules/info/components/AuthorInfo.js";
import CategoryInfo from "@theme-hope/modules/info/components/CategoryInfo.js";
import DateInfo from "@theme-hope/modules/info/components/DateInfo.js";
import PageViewInfo from "@theme-hope/modules/info/components/PageViewInfo.js";
import ReadingTimeInfo from "@theme-hope/modules/info/components/ReadingTimeInfo.js";
import TagInfo from "@theme-hope/modules/info/components/TagInfo.js";
import OriginalInfo from "@theme-hope/modules/info/components/OriginalMark.js";
import WordInfo from "@theme-hope/modules/info/components/WordInfo.js";

import type { PropType, VNode } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type {
  AuthorInfo as AuthorInfoType,
  DateInfo as DateInfoType,
} from "vuepress-shared";
import type {
  PageCategory,
  PageTag,
} from "@theme-hope/modules/info/utils/index.js";
import type { PageInfo } from "../../../../shared/index.js";

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
