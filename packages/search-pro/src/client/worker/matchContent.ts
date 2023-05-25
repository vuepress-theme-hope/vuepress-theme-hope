import { type Word } from "../typings/index.js";

const MAX_LENGTH = 100;
const SUFFIX_LENGTH = 20;

export const getMatchedContent = (
  content: string,
  queryString: string
): Word[] | null => {
  const contentLowerCase = content.toLowerCase();
  const queryStringLowerCase = queryString.toLowerCase();
  const result: Word[] = [];

  let startIndex = 0;
  let contentLength = 0;

  const addResult = (content: string, isEnd = false): void => {
    let text = "";

    // a beginning of a long string
    if (contentLength === 0)
      text =
        content.length > SUFFIX_LENGTH
          ? `… ${content.slice(-SUFFIX_LENGTH)}`
          : content;
    // already the last text
    else if (isEnd)
      text =
        // if the string will be longer than maxLength
        content.length + contentLength > MAX_LENGTH
          ? `${content.slice(0, MAX_LENGTH - contentLength)}… `
          : content;
    // text is at the middle
    else
      text =
        content.length > SUFFIX_LENGTH
          ? `${content.slice(0, SUFFIX_LENGTH)} … ${content.slice(
              -SUFFIX_LENGTH
            )}`
          : content;

    if (text) result.push(text);
    contentLength += text.length;

    if (!isEnd) {
      result.push(["mark", queryString]);
      contentLength += queryString.length;

      if (contentLength >= MAX_LENGTH) result.push(" …");
    }
  };

  let matchIndex = contentLowerCase.indexOf(queryStringLowerCase, startIndex);

  if (matchIndex === -1) return null;

  while (matchIndex >= 0) {
    const endIndex = matchIndex + queryStringLowerCase.length;

    // append content before
    addResult(content.slice(startIndex, matchIndex));

    startIndex = endIndex;

    if (contentLength > MAX_LENGTH) break;

    matchIndex = contentLowerCase.indexOf(queryStringLowerCase, startIndex);
  }

  if (contentLength < MAX_LENGTH) addResult(content.slice(startIndex), true);

  return result;
};
