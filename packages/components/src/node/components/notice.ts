import type { NoticeClientOptions, NoticeOptions } from "../../shared/index.js";

export const getNoticeOptions = (
  options: NoticeOptions[],
): NoticeClientOptions[] =>
  options
    .map(({ key, ...item }) => {
      if ("match" in item) {
        const stringRegExp = item.match.toString();

        return {
          noticeKey: key,
          ...item,
          match: stringRegExp.slice(1, stringRegExp.length - 1),
        } as NoticeClientOptions;
      }

      return {
        noticeKey: key,
        ...item,
      } as NoticeClientOptions;
    })
    .sort((a, b) =>
      "match" in a
        ? "match" in b
          ? b.match.localeCompare(a.match)
          : -1
        : "match" in b
          ? 1
          : (b.path || "").localeCompare(a.path || ""),
    );
