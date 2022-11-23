export type Word = [tag: string, content: string] | string;

export const getMatchedContent = (
  content: string,
  queryString: string
): Word[] | null => {
  const result: Word[] = [];
  let start = 0;
  let totalLength = 0;

  const contentLowerCase = content.toLowerCase();
  const queryStringLowerCase = queryString.toLowerCase();

  let matchIndex = contentLowerCase.indexOf(queryStringLowerCase, start);

  const append = (content: string, matched: boolean): void => {
    let appendContent = content;
    let needEllipsis = false;

    // a beginning of a long string
    if (!matched && appendContent.length > 100 && totalLength === 0)
      appendContent = `… ${appendContent.slice(-10)}`;

    // if the string will be longer than 100
    if (totalLength + appendContent.length > 100) {
      // already found something matches
      if (result.some((word) => word[0] === "strong")) return;

      // cut the string
      appendContent = appendContent.slice(0, Math.max(100 - totalLength, 1));
      needEllipsis = true;
    }

    // add str
    if (appendContent.length) {
      result.push(matched ? ["strong", appendContent] : appendContent);
      totalLength += appendContent.length;
    }

    if (needEllipsis) {
      result.push("…");
      totalLength += 2;
    }
  };

  if (matchIndex < 0) return null;

  while (matchIndex >= 0) {
    const end = matchIndex + queryStringLowerCase.length;

    append(content.slice(start, matchIndex), false);
    append(content.slice(matchIndex, end), true);

    start = end;
    matchIndex = contentLowerCase.indexOf(queryStringLowerCase, start);
    if (totalLength > 100) break;
  }

  append(content.slice(start), false);

  return result;
};
