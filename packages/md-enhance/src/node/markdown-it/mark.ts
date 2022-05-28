/**
 * Forked from https://github.com/markdown-it/markdown-it-mark/blob/master/index.js
 *
 * Copyright (c) 2014-2015 Vitaly Puzrin, Alex Kocharin.
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

import type { PluginSimple } from "markdown-it";
import type { RuleInline } from "markdown-it/lib/parser_inline";
import type { default as StateInline } from "markdown-it/lib/rules_inline/state_inline";

/*
 * Insert each marker as a separate text token, and add it to delimiter list
 *
 */
const tokenize: RuleInline = (state, silent) => {
  const start = state.pos;
  const marker = state.src.charAt(start);

  if (silent || marker !== "=") return false;

  const scanned = state.scanDelims(state.pos, true);
  let { length } = scanned;

  if (length < 2) return false;
  let token;

  if (length % 2) {
    token = state.push("text", "", 0);
    token.content = marker;
    length -= 1;
  }

  for (let i = 0; i < length; i += 2) {
    token = state.push("text", "", 0);
    token.content = `${marker}${marker}`;

    if (scanned.can_open || scanned.can_close)
      state.delimiters.push({
        marker: 0x3d,
        length: 0, // disable "rule of 3" length checks meant for emphasis
        jump: i / 2, // 1 delimiter = 2 characters
        token: state.tokens.length - 1,
        end: -1,
        open: scanned.can_open,
        close: scanned.can_close,
      });
  }

  state.pos += scanned.length;

  return true;
};

/*
 * Walk through delimiter list and replace text tokens with tags
 *
 */
const postProcess = (
  state: StateInline,
  delimiters: StateInline.Delimiter[]
): void => {
  let token;
  const loneMarkers = [];
  const max = delimiters.length;

  for (let i = 0; i < max; i++) {
    const startDelim = delimiters[i];

    if (startDelim.marker === 0x3d /* = */ && startDelim.end !== -1) {
      const endDelim = delimiters[startDelim.end];

      token = state.tokens[startDelim.token];
      token.type = "mark_open";
      token.tag = "mark";
      token.nesting = 1;
      token.markup = "==";
      token.content = "";

      token = state.tokens[endDelim.token];
      token.type = "mark_close";
      token.tag = "mark";
      token.nesting = -1;
      token.markup = "==";
      token.content = "";

      if (
        state.tokens[endDelim.token - 1].type === "text" &&
        state.tokens[endDelim.token - 1].content === "="
      )
        loneMarkers.push(endDelim.token - 1);
    }
  }

  /*
   * If a marker sequence has an odd number of characters, it’s splitted
   * like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
   * start of the sequence.
   *
   * So, we have to move all those markers after subsequent s_close tags.
   *
   */
  while (loneMarkers.length) {
    const i = loneMarkers.pop() as number;
    let j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === "mark_close")
      j += 1;

    j -= 1;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
};

export const mark: PluginSimple = (md) => {
  md.inline.ruler.before("emphasis", "mark", tokenize);
  md.inline.ruler2.before("emphasis", "mark", (state) => {
    const tokensMeta = state.tokens_meta || [];

    postProcess(state, state.delimiters);

    for (let curr = 0; curr < tokensMeta.length; curr++) {
      const tokenMeta = tokensMeta[curr];

      if (tokenMeta?.delimiters) postProcess(state, tokenMeta.delimiters);
    }

    return true;
  });
};
