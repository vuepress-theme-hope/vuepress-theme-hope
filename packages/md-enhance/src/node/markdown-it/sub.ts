/**
 * Forked from https://github.com/markdown-it/markdown-it-sub/blob/master/index.js
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

import { UNESCAPE_RE } from "./utils";

import type { PluginSimple } from "markdown-it";
import type { RuleInline } from "markdown-it/lib/parser_inline";

const subscriptRender: RuleInline = (state, silent) => {
  let found;
  let token;
  const max = state.posMax;
  const start = state.pos;

  if (state.src.charAt(start) !== "~") return false;

  if (silent) return false; // don’t run any pairs in validation mode
  if (start + 2 >= max) return false;

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charAt(state.pos) === "~") {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;

    return false;
  }

  const content = state.src.slice(start + 1, state.pos);

  // don’t allow unescaped spaces/newlines inside
  if (/(^|[^\\])(\\\\)*\s/u.exec(content)) {
    state.pos = start;

    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token = state.push("sub_open", "sub", 1);
  token.markup = "~";

  token = state.push("text", "", 0);
  token.content = content.replace(UNESCAPE_RE, "$1");

  token = state.push("sub_close", "sub", -1);
  token.markup = "~";

  state.pos = state.posMax + 1;
  state.posMax = max;

  return true;
};

export const sub: PluginSimple = (md) => {
  md.inline.ruler.after("emphasis", "sub", subscriptRender);
};
