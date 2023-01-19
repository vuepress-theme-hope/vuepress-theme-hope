import type { NoticeClientOptions, NoticeOptions } from "../../shared/index.js";

export const getNoticeOptions = (
  options: NoticeOptions[]
): NoticeClientOptions[] =>
  options
    .map(
      ({ key, ...item }) =>
        <NoticeClientOptions>{
          noticeKey: key,
          ...item,
          ...("match" in item ? { match: item.match.toString() } : {}),
        }
    )
    .sort((a, b) =>
      "match" in a
        ? "match" in b
          ? b.match.localeCompare(a.match)
          : -1
        : "match" in b
        ? 1
        : (b.path || "").localeCompare(a.path || "")
    );
