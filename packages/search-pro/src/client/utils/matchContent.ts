export type Word = [tag: string, content: string] | string;

const maxLength = 100;
const suffixLength = 20;

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
        content.length > suffixLength
          ? `… ${content.slice(-suffixLength)}`
          : content;
    // already the last text
    else if (isEnd)
      text =
        // if the string will be longer than maxLength
        content.length + contentLength > maxLength
          ? `${content.slice(0, maxLength - contentLength)}… `
          : content;
    // text is at the middle
    else
      text =
        content.length > suffixLength
          ? `${content.slice(0, suffixLength)} … ${content.slice(
              -suffixLength
            )}`
          : content;

    if (text) result.push(text);
    contentLength += text.length;

    if (!isEnd) {
      result.push(["strong", queryString]);
      contentLength += queryString.length;

      if (contentLength >= maxLength) result.push(" …");
    }
  };

  let matchIndex = contentLowerCase.indexOf(queryStringLowerCase, startIndex);

  if (matchIndex === -1) return null;

  while (matchIndex >= 0) {
    const endIndex = matchIndex + queryStringLowerCase.length;

    // append content before
    addResult(content.slice(startIndex, matchIndex));

    startIndex = endIndex;

    if (contentLength > maxLength) break;

    matchIndex = contentLowerCase.indexOf(queryStringLowerCase, startIndex);
  }

  if (contentLength < maxLength) addResult(content.slice(startIndex), true);

  return result;
};
