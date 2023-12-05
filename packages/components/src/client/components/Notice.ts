import type { FunctionalComponent, PropType } from "vue";
import { h } from "vue";
import { useRoute } from "vue-router";
import { startsWith } from "vuepress-shared/client";

import NoticeItem from "./NoticeItem.js";
import type { NoticeItemOptions } from "../../shared/index.js";

import "../styles/notice.scss";

type NoticeClientOption = Omit<NoticeItemOptions, "key"> & {
  noticeKey?: string;
} & ({ path: string } | { match: string });

const Notice: FunctionalComponent<{
  config: NoticeClientOption[];
}> = ({ config }) => {
  const route = useRoute();

  const item = config.find((item) =>
    "match" in item
      ? new RegExp(item.match).test(route.path)
      : startsWith(route.path, item.path),
  );

  return item ? h(NoticeItem, item) : null;
};

Notice.displayName = "Notice";
Notice.props = {
  /**
   * Notice locales settings
   *
   * 通知的多语言设置
   */
  config: {
    type: Array as PropType<NoticeClientOption[]>,
    required: true,
  },
};

export default Notice;
