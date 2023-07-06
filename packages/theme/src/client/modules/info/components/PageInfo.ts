import type { PropType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import type {
  ReadingTime,
  ReadingTimeLocale,
} from "vuepress-plugin-reading-time2/client";
import type { AuthorInfo as AuthorInfoType } from "vuepress-shared/client";

import { usePure } from "@theme-hope/composables/index";
import AuthorInfo from "@theme-hope/modules/info/components/AuthorInfo";
import CategoryInfo from "@theme-hope/modules/info/components/CategoryInfo";
import DateInfo from "@theme-hope/modules/info/components/DateInfo";
import OriginalInfo from "@theme-hope/modules/info/components/OriginalInfo";
import PageViewInfo from "@theme-hope/modules/info/components/PageViewInfo";
import ReadingTimeInfo from "@theme-hope/modules/info/components/ReadingTimeInfo";
import TagInfo from "@theme-hope/modules/info/components/TagInfo";
import WordInfo from "@theme-hope/modules/info/components/WordInfo";
import type {
  PageCategory,
  PageTag,
} from "@theme-hope/modules/info/utils/index";

import type { PageInfo } from "../../../../shared/index.js";

import "balloon-css/balloon.css";
import "../styles/page-info.scss";

declare const ENABLE_READING_TIME: boolean;
declare const SUPPORT_PAGEVIEW: boolean;

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
  date?: Date | null;

  /**
   * Writing Date
   *
   * 写作日期
   */
  localizedDate?: string | null;

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

  /**
   * ReadingTime Locales
   *
   * 阅读时间多语言
   */
  readingTimeLocale?: ReadingTimeLocale | null;
}

export default defineComponent({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    OriginalInfo,
    PageViewInfo: SUPPORT_PAGEVIEW ? PageViewInfo : (): null => null,
    ReadingTimeInfo: ENABLE_READING_TIME ? ReadingTimeInfo : (): null => null,
    TagInfo,
    WordInfo,
  },

  props: {
    /**
     * Article information to display
     *
     * 待展示的文章信息
     */
    items: {
      type: [Array, Boolean] as PropType<PageInfo[] | false>,
      default: (): PageInfo[] => [
        "Author",
        "Original",
        "Date",
        "PageView",
        "ReadingTime",
        "Category",
        "Tag",
      ],
    },

    /**
     * Article information
     *
     * 文章信息配置
     */
    info: {
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
                ...props.info,
                pure: pure.value,
              }),
            ),
          )
        : null;
  },
});
