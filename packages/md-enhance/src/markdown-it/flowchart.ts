/* eslint-disable max-statements */
import hash = require("hash-sum");
import MarkdownIt = require("markdown-it");
import StateBlock = require("markdown-it/lib/rules_block/state_block");

const flowchart = (
  md: MarkdownIt & { $dataBlock: Record<string, string> }
): void => {
  const OPEN_MARKER = "@flowstart";
  const openChar = OPEN_MARKER.charCodeAt(0);
  const CLOSEMARKER = "@flowend";
  const closeChar = CLOSEMARKER.charCodeAt(0);

  const uml = (
    state: StateBlock,
    startLine: number,
    endLine: number,
    silent: boolean
  ): boolean => {
    let nextLine;
    let i;
    let autoClosed = false;
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    /*
     * Check out the first character quickly,
     * this should filter out most of non-uml blocks
     */
    if (openChar !== state.src.charCodeAt(start)) return false;

    // Check out the rest of the marker string
    for (i = 0; i < OPEN_MARKER.length; ++i)
      if (OPEN_MARKER[i] !== state.src[start + i]) return false;

    const markup = state.src.slice(start, start + i);
    const params = state.src.slice(start + i, max);

    // Since start is found, we can report success here in validation mode
    if (silent) return true;

    // Search for the end of the block
    for (nextLine = startLine; ; nextLine += 1) {
      if (nextLine >= endLine)
        /*
         * unclosed block should be autoclosed by end of document.
         * also block seems to be autoclosed by end of parent
         */
        break;

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
        // didn't find the closing fence
        closeChar === state.src.charCodeAt(start) &&
        // closing fence should not be indented with respect of opening fence
        state.sCount[nextLine] <= state.sCount[startLine]
      ) {
        let closeMarkerMatched = true;

        for (i = 0; i < CLOSEMARKER.length; ++i)
          if (CLOSEMARKER[i] !== state.src[start + i]) {
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
    }

    const contents = state.src
      .split("\n")
      .slice(startLine + 1, nextLine)
      .join("\n");

    const token = state.push("flowchart", "fence", 0);
    token.block = true;
    token.info = params;
    token.content = contents;
    token.map = [startLine, nextLine];
    token.markup = markup;

    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  md.block.ruler.before("fence", "flowchart", uml, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });

  md.renderer.rules.flowchart = (tokens, idx): string => {
    const token = tokens[idx];
    const key = `flowchart_${hash(idx)}`;
    const { content, info } = token;
    md.$dataBlock[key] = content;
    return `<FlowChart id="${key}" :code="$dataBlock.${key}" preset="${
      info.trim() || "vue"
    }"></FlowChart>`;
  };
};

export default flowchart;
