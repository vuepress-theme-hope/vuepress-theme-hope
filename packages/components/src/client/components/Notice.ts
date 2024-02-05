import { startsWith } from "@vuepress/helper/client";
import type { FunctionalComponent, PropType } from "vue";
import { h } from "vue";
import { usePageData } from "vuepress/client";

import NoticeItem from "./NoticeItem.js";
import type { NoticeItemOptions } from "../../shared/index.js";

import "../styles/notice.scss";

type NoticeClientOption = Omit<NoticeItemOptions, "key"> & {
  noticeKey?: string;
} & ({ path: string } | { match: string });

const Notice: FunctionalComponent<{
  config: NoticeClientOption[];
}> = ({ config }) => {
  const page = usePageData();

  const item = config.find((item) =>
    "match" in item
      ? new RegExp(item.match).test(page.value.path)
      : startsWith(page.value.path, item.path),
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
