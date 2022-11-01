import type { PluginWithOptions } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block.js";
import type { RenderRule } from "markdown-it/lib/renderer.js";

export interface MarkdownItUMLOptions {
  /** name */
  name: string;
  /** open marker */
  open: string;
  /** close marker */
  close: string;
  /** render function */
  render: RenderRule;
}

export const uml: PluginWithOptions<MarkdownItUMLOptions> = (
  md,
  { name, open, close, render } = {
    name: "uml",
    open: "start",
    close: "end",
    render: (tokens, index): string => {
      const token = tokens[index];
      const { content, info, type } = token;

      return `<div class="${type}" title="${info}">${content}</div>`;
    },
  }
) => {
  const OPEN_MARKER = `@${open}`;
  const CLOSE_MARKER = `@${close}`;

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
       * unclosed block should be auto closed by end of document.
       * also block seems to be auto closed by end of parent
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

    const token = state.push(name, "fence", 0);

    token.block = true;
    token.info = params;
    token.content = contents;
    token.map = [startLine, nextLine];
    token.markup = markup;

    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  md.block.ruler.before("fence", name, umlRule, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });

  md.renderer.rules[name] = render;
};
