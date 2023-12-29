import type { NoticeClientOptions, NoticeOptions } from "../../shared/index.js";

export const getNoticeOptions = (
  options: NoticeOptions[],
): NoticeClientOptions[] =>
  options
    .map(({ key, ...item }) => {
      if ("match" in item) {
        const stringRegExp = item.match.toString();

        return <NoticeClientOptions>{
          noticeKey: key,
          ...item,
          match: stringRegExp.slice(1, stringRegExp.length - 1),
        };
      }

      return <NoticeClientOptions>{
        noticeKey: key,
        ...item,
      };
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
