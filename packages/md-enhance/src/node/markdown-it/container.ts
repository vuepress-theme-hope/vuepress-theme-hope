/**
 * Forked and modified from https://github.com/markdown-it/markdown-it-container/blob/master/index.js
 *
 * Copyright (c) 2015 Vitaly Puzrin, Alex Kocharin.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import type { MarkdownEnv } from "@vuepress/markdown";
import type { Options, PluginWithOptions } from "markdown-it";
import type { default as Token } from "markdown-it/lib/token.js";
import type {
  default as Renderer,
  RenderRule,
} from "markdown-it/lib/renderer.js";
import type { RuleBlock } from "markdown-it/lib/parser_block.js";

export interface MarkdownItContainerOptions {
  /** container name */
  name: string;
  /** container marker */
  marker?: string;
  /** validate whether this should be regarded as a container */
  validate?: (params: string, markup: string) => boolean;
  /** open tag render function */
  openRender?: RenderRule;
  /** close tag render function */
  closeRender?: RenderRule;
}

export const container: PluginWithOptions<MarkdownItContainerOptions> = (
  md,
  {
    name,
    marker = ":",
    validate = (params: string): boolean =>
      params.trim().split(" ", 2)[0] === name,
    openRender = (
      tokens: Token[],
      index: number,
      options: Options,
      _env: MarkdownEnv,
      slf: Renderer
    ): string => {
      // add a class to the opening tag
      tokens[index].attrJoin("class", name);

      return slf.renderToken(tokens, index, options);
    },
    closeRender = (
      tokens: Token[],
      index: number,
      options: Options,
      _env: MarkdownEnv,
      slf: Renderer
    ): string => slf.renderToken(tokens, index, options),
  } = { name: "" }
) => {
  const MIN_MARKER_NUM = 3;
  const markerStart = marker[0];
  const markerLength = marker.length;

  const container: RuleBlock = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    // Check out the first character quickly,
    // this should filter out most of non-containers
    //
    if (markerStart !== state.src[start]) return false;

    let pos = start + 1;

    // Check out the rest of the marker string
    while (pos <= max) {
      if (marker[(pos - start) % markerLength] !== state.src[pos]) break;
      pos += 1;
    }

    const markerCount = Math.floor((pos - start) / markerLength);

    if (markerCount < MIN_MARKER_NUM) return false;

    pos -= (pos - start) % markerLength;

    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max);

    if (!validate(params, markup)) return false;

    // Since start is found, we can report success here in validation mode

    if (silent) return true;

    let nextLine = startLine;
    let autoClosed = false;

    // Search for the end of the block
    while (
      // unclosed block should be auto closed by end of document.
      // also block seems to be auto closed by end of parent
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent)
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;

      if (
        // match start
        markerStart === state.src[start] &&
        // closing fence should be indented less than 4 spaces
        state.sCount[nextLine] - state.blkIndent < 4
      ) {
        // check rest of marker
        for (pos = start + 1; pos <= max; pos++)
          if (marker[(pos - start) % markerLength] !== state.src[pos]) break;

        // closing code fence must be at least as long as the opening one
        if (Math.floor((pos - start) / markerLength) >= markerCount) {
          // make sure tail has spaces only
          pos -= (pos - start) % markerLength;
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            // found!
            autoClosed = true;
            break;
          }
        }
      }
    }

    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    state.parentType = "container";

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine;

    const openToken = state.push(`container_${name}_open`, "div", 1);

    openToken.markup = markup;
    openToken.block = true;
    openToken.info = params;
    openToken.map = [startLine, nextLine];

    state.md.block.tokenize(state, startLine + 1, nextLine);

    const closeToken = state.push(`container_${name}_close`, "div", -1);

    closeToken.markup = state.src.slice(start, pos);
    closeToken.block = true;

    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);

    return true;
  };

  md.block.ruler.before("fence", `container_${name}`, container, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });
  md.renderer.rules[`container_${name}_open`] = openRender;
  md.renderer.rules[`container_${name}_close`] = closeRender;
};
