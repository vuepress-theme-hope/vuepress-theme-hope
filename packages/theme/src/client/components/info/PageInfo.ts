import noopComponent from "@vuepress/helper/noopComponent";
import { isSupported } from "@vuepress/plugin-comment/pageview";
import type {
  ReadingTime,
  ReadingTimeLocale,
} from "@vuepress/plugin-reading-time/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";

import AuthorInfo from "@theme-hope/components/info/AuthorInfo";
import CategoryInfo from "@theme-hope/components/info/CategoryInfo";
import DateInfo from "@theme-hope/components/info/DateInfo";
import OriginalInfo from "@theme-hope/components/info/OriginalInfo";
import PageViewInfo from "@theme-hope/components/info/PageViewInfo";
import ReadingTimeInfo from "@theme-hope/components/info/ReadingTimeInfo";
import TagInfo from "@theme-hope/components/info/TagInfo";
import WordInfo from "@theme-hope/components/info/WordInfo";
import { usePure } from "@theme-hope/composables/usePure";
import type { PageCategory, PageTag } from "@theme-hope/utils/info/typings";

import type {
  AuthorInfo as AuthorInfoType,
  PageInfoType,
} from "../../../shared/index.js";

import "balloon-css/balloon.css";
import "../../styles/info/page-info.scss";

declare const __VP_READING_TIME__: boolean;

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
    PageViewInfo: isSupported ? PageViewInfo : noopComponent,
    ReadingTimeInfo: __VP_READING_TIME__ ? ReadingTimeInfo : noopComponent,
    TagInfo,
    WordInfo: __VP_READING_TIME__ ? WordInfo : noopComponent,
  },

  props: {
    /**
     * Article information to display
     *
     * 待展示的文章信息
     */
    items: [Boolean, Array] as PropType<
      PageInfoType[] | false | undefined | null
    >,

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
    const isPure = usePure();

    return (): VNode | null => {
      const items = props.items ?? [
        "Author",
        "Original",
        "Date",
        "PageView",
        "ReadingTime",
        "Category",
        "Tag",
      ];

      return items
        ? h(
            "div",
            { class: "page-info" },
            items.map((item) =>
              h(resolveComponent(`${item}Info`), {
                ...props.info,
                isPure: isPure.value,
              }),
            ),
          )
        : null;
    };
  },
});
