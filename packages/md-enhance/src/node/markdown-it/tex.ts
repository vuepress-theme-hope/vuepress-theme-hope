/**
 * Forked from https://github.com/waylonflinn/markdown-it-katex/blob/master/index.js
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Waylon Flinn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { default as StateInline } from "markdown-it/lib/rules_inline/state_inline.js";
import type { PluginWithOptions } from "markdown-it";
import type { RuleInline } from "markdown-it/lib/parser_inline.js";
import type { RuleBlock } from "markdown-it/lib/parser_block.js";

export interface TexOptions {
  render: (content: string, displayMode: boolean) => string;
}

/*
 * Test if potential opening or closing delimiter
 * Assumes that there is a "$" at state.src[pos]
 */
const isValidDelim = (
  state: StateInline,
  pos: number
): { canOpen: boolean; canClose: boolean } => {
  const prevChar = pos > 0 ? state.src.charAt(pos - 1) : "";
  const nextChar = pos + 1 <= state.posMax ? state.src.charAt(pos + 1) : "";

  return {
    canOpen: nextChar !== " " && nextChar !== "\t",

    /*
     * Check non-whitespace conditions for opening and closing, and
     * check that closing delimiter isn’t followed by a number
     */
    canClose: !(
      prevChar === " " ||
      prevChar === "\t" ||
      /[0-9]/u.exec(nextChar)
    ),
  };
};

const inlineTex: RuleInline = (state, silent) => {
  let match;
  let pos;
  let res;
  let token;

  if (state.src[state.pos] !== "$") return false;

  res = isValidDelim(state, state.pos);
  if (!res.canOpen) {
    if (!silent) state.pending += "$";

    state.pos += 1;

    return true;
  }

  /*
   * First check for and bypass all properly escaped delimiters
   * This loop will assume that the first leading backtick can not
   * be the first character in state.src, which is known since
   * we have found an opening delimiter already.
   */
  const start = state.pos + 1;

  match = start;
  while ((match = state.src.indexOf("$", match)) !== -1) {
    /*
     * Found potential $, look for escapes, pos will point to
     * first non escape when complete
     */
    pos = match - 1;
    while (state.src[pos] === "\\") pos -= 1;

    // Even number of escapes, potential closing delimiter found
    if ((match - pos) % 2 === 1) break;

    match += 1;
  }

  // No closing delimiter found.  Consume $ and continue.
  if (match === -1) {
    if (!silent) state.pending += "$";

    state.pos = start;

    return true;
  }

  // Check if we have empty content, ie: $$.  Do not parse.
  if (match - start === 0) {
    if (!silent) state.pending += "$$";

    state.pos = start + 1;

    return true;
  }

  // Check for valid closing delimiter
  res = isValidDelim(state, match);

  if (!res.canClose) {
    if (!silent) state.pending += "$";

    state.pos = start;

    return true;
  }

  if (!silent) {
    token = state.push("math_inline", "math", 0);
    token.markup = "$";
    token.content = state.src.slice(start, match);
  }

  state.pos = match + 1;

  return true;
};

const blockTex: RuleBlock = (state, start, end, silent) => {
  let firstLine;
  let lastLine;
  let next;
  let lastPos;
  let found = false;
  let pos = state.bMarks[start] + state.tShift[start];
  let max = state.eMarks[start];

  if (pos + 2 > max) return false;

  if (state.src.slice(pos, pos + 2) !== "$$") return false;

  pos += 2;
  firstLine = state.src.slice(pos, max);

  if (silent) return true;

  if (firstLine.trim().endsWith("$$")) {
    // Single line expression
    firstLine = firstLine.trim().slice(0, -2);
    found = true;
  }

  for (next = start; !found; ) {
    next += 1;

    if (next >= end) break;

    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];

    if (pos < max && state.tShift[next] < state.blkIndent)
      // non-empty line with negative indent should stop the list:
      break;

    if (state.src.slice(pos, max).trim().endsWith("$$")) {
      lastPos = state.src.slice(0, max).lastIndexOf("$$");
      lastLine = state.src.slice(pos, lastPos);
      found = true;
    }
  }

  state.line = next + 1;

  const token = state.push("math_block", "math", 0);

  token.block = true;
  token.content =
    (firstLine?.trim() ? `\n${firstLine}\n` : "\n") +
    state.getLines(start + 1, next, state.tShift[start], true) +
    (lastLine?.trim() ? lastLine : "");
  token.map = [start, state.line];
  token.markup = "$$";

  return true;
};

export const tex: PluginWithOptions<TexOptions> = (md, options) => {
  const { render } = options || {};

  if (typeof render !== "function")
    return console.error(
      'markdown-it tex: "render" option should be a function'
    );

  md.inline.ruler.after("escape", "math_inline", inlineTex);
  md.block.ruler.after("blockquote", "math_block", blockTex, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });

  md.renderer.rules["math_inline"] = (tokens, index): string =>
    render(tokens[index].content, false);
  md.renderer.rules["math_block"] = (tokens, index): string =>
    render(tokens[index].content, true);
};
