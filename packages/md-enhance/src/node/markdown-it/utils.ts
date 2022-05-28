import type { default as Token } from "markdown-it/lib/token";
import type { RuleBlock } from "markdown-it/lib/parser_block";

// https://spec.commonmark.org/0.29/#line-ending
export const NEWLINES_RE = /\r\n?|\n/g;

export const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/gu;

export const setTokenAttr = (
  token: Token,
  name: string,
  value: string
): void => {
  const index = token.attrIndex(name);
  const attr: [string, string] = [name, value];

  if (index < 0) token.attrPush(attr);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  else token.attrs![index] = attr;
};

export const getParentTokenIndex = (tokens: Token[], index: number): number => {
  const targetLevel = tokens[index].level - 1;

  for (let i = index - 1; i >= 0; i--)
    if (tokens[i].level === targetLevel) return i;

  return -1;
};

export const isInlineToken = (token: Token): boolean => token.type === "inline";

export const isParagraphToken = (token: Token): boolean =>
  token.type === "paragraph_open";

export const isListItemToken = (token: Token): boolean =>
  token.type === "list_item_open";

export const escapeHtml = (unsafeHTML: string): string =>
  unsafeHTML
    .replace(/&/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
    .replace(/"/gu, "&quot;")
    .replace(/'/gu, "&#039;");

export interface UMLOptions {
  name: string;
  open: string;
  close: string;
}

export const generateUML = (options: UMLOptions): RuleBlock => {
  const OPEN_MARKER = `@${options.open}`;
  const CLOSE_MARKER = `@${options.close}`;

  const umlRule: RuleBlock = (state, startLine, endLine, silent) => {
    let i;
    let autoClosed = false;
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    /*
     * Check out the first character quickly,
     * this should filter out most of non-uml blocks
     */
    if (state.src.charAt(start) !== "@") return false;

    // Check out the rest of the marker string
    for (i = 0; i < OPEN_MARKER.length; ++i)
      if (OPEN_MARKER[i] !== state.src[start + i]) return false;

    const markup = state.src.slice(start, start + i);
    const params = state.src.slice(start + i, max);

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    let nextLine = startLine;

    // Search for the end of the block
    while (
      /*
       * unclosed block should be autoclosed by end of document.
       * also block seems to be autoclosed by end of parent
       */
      nextLine < endLine
    ) {
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        /*
         * non-empty line with negative indent should stop the list:
         * - ```
         *  test
         */
        break;

      if (
        // didn’t find the closing fence
        state.src.charAt(start) === "@" &&
        // closing fence should not be indented with respect of opening fence
        state.sCount[nextLine] <= state.sCount[startLine]
      ) {
        let closeMarkerMatched = true;

        for (i = 0; i < CLOSE_MARKER.length; ++i)
          if (CLOSE_MARKER[i] !== state.src[start + i]) {
            closeMarkerMatched = false;
            break;
          }

        if (
          closeMarkerMatched &&
          // make sure tail has spaces only
          state.skipSpaces(start + i) >= max
        ) {
          // found!
          autoClosed = true;
          break;
        }
      }

      nextLine += 1;
    }

    const contents = state.src
      .split("\n")
      .slice(startLine + 1, nextLine)
      .join("\n");

    const token = state.push(options.name, "fence", 0);

    token.block = true;
    token.info = params;
    token.content = contents;
    token.map = [startLine, nextLine];
    token.markup = markup;

    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  return umlRule;
};
