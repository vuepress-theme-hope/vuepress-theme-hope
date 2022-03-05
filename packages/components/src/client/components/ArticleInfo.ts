import { defineComponent, resolveComponent, h } from "vue";
import AuthorInfo from "./AuthorInfo";
import CategoryInfo from "./CategoryInfo";
import DateInfo from "./DateInfo";
import PageViewInfo from "./PageViewInfo";
import ReadingTimeInfo from "./ReadingTimeInfo";
import TagInfo from "./TagInfo";
import OriginalInfo from "./OriginalMark";
import WordInfo from "./WordInfo";

import type {
  AuthorInfo as AuthorInfoType,
  DateInfo as DateInfoType,
} from "@mr-hope/vuepress-shared";
import type { PropType, VNode } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { ArticleInfo } from "../../shared";

import "balloon-css/balloon.css";
import "../styles/article-info.scss";

export default defineComponent({
  name: "ArticleInfo",

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
    config: {
      type: [Array, Boolean] as PropType<ArticleInfo[] | false>,
      default: (): ArticleInfo[] => [
        "Author",
        "Original",
        "PageView",
        "Date",
        "Category",
        "Tag",
        "ReadingTime",
      ],
    },

    hint: {
      type: Boolean,
      default: true,
    },

    author: {
      type: Array as PropType<AuthorInfoType[]>,
      default: () => [],
    },

    category: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    tag: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    date: {
      type: Object as PropType<DateInfoType | null>,
      default: null,
    },

    isOriginal: {
      type: Boolean,
      default: false,
    },

    pageview: {
      type: [Boolean, String],
      default: false,
    },

    readingTime: {
      type: Object as PropType<ReadingTime | null>,
      default: () => null,
    },

    color: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    return (): VNode | null =>
      props.config
        ? h(
            "div",
            { class: "article-info" },
            props.config.map((item) =>
              h(resolveComponent(`${item}Info`), props)
            )
          )
        : null;
  },
});
