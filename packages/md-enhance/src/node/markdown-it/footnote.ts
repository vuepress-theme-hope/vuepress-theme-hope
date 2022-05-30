/**
 * Forked from https://github.com/markdown-it/markdown-it-footnote/blob/master/index.js
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

import { default as Token } from "markdown-it/lib/token";
import { default as parseLinkLabel } from "markdown-it/lib/helpers/parse_link_label";

import type { MarkdownEnv } from "@vuepress/markdown";
import type { default as Renderer } from "markdown-it/lib/renderer";
import type { default as StateBlock } from "markdown-it/lib/rules_block/state_block";
import type { default as StateCore } from "markdown-it/lib/rules_core/state_core";
import type { default as StateInline } from "markdown-it/lib/rules_inline/state_inline";
import type { PluginSimple } from "markdown-it";
import type { RuleBlock } from "markdown-it/lib/parser_block";
import type { RuleInline } from "markdown-it/lib/parser_inline";

interface FootNoteToken extends Token {
  meta: {
    id: number;
    subId: number;
    label: string;
  };
}

interface FootNoteEnv extends MarkdownEnv {
  docId?: string;
  footnotes: {
    label?: string;
    refs?: Record<string, number>;
    list?: {
      label?: string;
      count?: number;
      content?: string;
      tokens?: Token[] | null;
    }[];
  };
}

interface FootNoteStateBlock extends StateBlock {
  tokens: FootNoteToken[];
  env: FootNoteEnv;
}

interface FootNoteStateInline extends StateInline {
  tokens: FootNoteToken[];
  env: FootNoteEnv;
}

interface FootNoteStateCore extends StateCore {
  tokens: FootNoteToken[];
  env: FootNoteEnv;
}

const getIDSuffix = (tokens: FootNoteToken[], index: number): string =>
  // add suffix when multiple id was found
  tokens[index].meta.subId > 0 ? `:${tokens[index].meta.subId}` : "";

const renderFootnoteAnchorName: Renderer.RenderRule = (
  tokens: FootNoteToken[],
  index,
  _options,
  env: FootNoteEnv
): string =>
  `${
    // prefix
    typeof env.docId === "string" ? `-${env.docId}-` : ""
  }${
    // increasing id
    (tokens[index].meta.id + 1).toString()
  }`;

const renderFootnoteCaption: Renderer.RenderRule = (
  tokens: FootNoteToken[],
  index
): string =>
  `[${
    // number
    (tokens[index].meta.id + 1).toString()
  }${getIDSuffix(tokens, index)}]`;

const renderFootnoteRef: Renderer.RenderRule = (
  tokens: FootNoteToken[],
  index,
  options,
  env: FootNoteEnv,
  self
): string => {
  const id = self.rules["footnoteAnchorName"]!(
    tokens,
    index,
    options,
    env,
    self
  );
  const caption = self.rules["footnoteCaption"]!(
    tokens,
    index,
    options,
    env,
    self
  );

  return `<sup class="footnote-ref"><a href="#footnote${id}">${caption}</a><a class="footnote-anchor" id="footnote-ref${id}${getIDSuffix(
    tokens,
    index
  )}" /></sup>`;
};

const renderFootnoteBlockOpen: Renderer.RenderRule = (
  _tokens: FootNoteToken[],
  _index,
  options
): string =>
  `${
    options.xhtmlOut
      ? '<hr class="footnotes-sep" />\n'
      : '<hr class="footnotes-sep">\n'
  }<section class="footnotes">\n<ol class="footnotes-list">\n`;

const renderFootnoteBlockClose = (): string => "</ol>\n</section>\n";

const renderFootnoteOpen: Renderer.RenderRule = (
  tokens: FootNoteToken[],
  index,
  options,
  env: FootNoteEnv,
  self
): string =>
  `<li id="footnote${self.rules["footnoteAnchorName"]!(
    tokens,
    index,
    options,
    env,
    self
  )}${getIDSuffix(tokens, index)}" class="footnote-item">`;

const renderFootnoteClose = (): string => "</li>\n";

const renderFootnoteAnchor: Renderer.RenderRule = (
  tokens: FootNoteToken[],
  index,
  options,
  env: FootNoteEnv,
  self
): string => {
  return ` <a href="#footnote-ref${self.rules["footnoteAnchorName"]!(
    tokens,
    index,
    options,
    env,
    self
  )}${
    getIDSuffix(tokens, index)
    /* ↩ with escape code to prevent display as Apple Emoji on iOS */
  }" class="footnote-backref">\u21a9\uFE0E</a>`;
};

// Process footnote block definition
const footnoteDef: RuleBlock = (
  state: FootNoteStateBlock,
  startLine,
  endLine,
  silent
) => {
  let pos;
  let token;
  let offset;
  let ch;
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];

  // line should be at least 5 chars - "[^x]:"
  if (start + 4 > max) return false;

  if (state.src.charAt(start) !== "[") return false;

  if (state.src.charAt(start + 1) !== "^") return false;

  for (pos = start + 2; pos < max; pos++) {
    if (state.src.charAt(pos) === " ") return false;
    if (state.src.charAt(pos) === "]") break;
  }

  // no empty footnote labels
  if (pos === start + 2) return false;

  if (pos + 1 >= max || state.src.charAt(++pos) !== ":") return false;

  if (silent) return true;
  pos += 1;

  if (!state.env.footnotes) state.env.footnotes = {};
  if (!state.env.footnotes.refs) state.env.footnotes.refs = {};
  const label = state.src.slice(start + 2, pos - 2);

  state.env.footnotes.refs[`:${label}`] = -1;

  token = new Token("footnoteReferenceOpen", "", 1);
  token.meta = { label };
  token.level = state.level++;
  state.tokens.push(token);

  const oldBMark = state.bMarks[startLine];
  const oldTShift = state.tShift[startLine];
  const oldSCount = state.sCount[startLine];
  const oldParentType = state.parentType;
  const posAfterColon = pos;
  const initial =
    state.sCount[startLine] +
    pos -
    (state.bMarks[startLine] + state.tShift[startLine]);

  offset =
    state.sCount[startLine] +
    pos -
    (state.bMarks[startLine] + state.tShift[startLine]);

  while (pos < max) {
    ch = state.src.charAt(pos);

    if (ch === "\t") offset += 4 - (offset % 4);
    else if (ch === " ") offset += 1;
    else break;

    pos += 1;
  }

  state.tShift[startLine] = pos - posAfterColon;
  state.sCount[startLine] = offset - initial;

  state.bMarks[startLine] = posAfterColon;
  state.blkIndent += 4;
  state.parentType = "footnote" as unknown as StateBlock.ParentType;

  if (state.sCount[startLine] < state.blkIndent)
    state.sCount[startLine] += state.blkIndent;

  state.md.block.tokenize(state, startLine, endLine);

  state.parentType = oldParentType;
  state.blkIndent -= 4;
  state.tShift[startLine] = oldTShift;
  state.sCount[startLine] = oldSCount;
  state.bMarks[startLine] = oldBMark;

  token = new Token("footnoteReferenceClose", "", -1);
  token.level = --state.level;
  state.tokens.push(token);

  return true;
};

// Process inline footnotes (^[...])
const footnoteInline: RuleInline = (state: FootNoteStateInline, silent) => {
  let footnoteId;
  let token;
  let tokens: Token[];
  const max = state.posMax;
  const start = state.pos;

  if (start + 2 >= max) return false;
  if (state.src.charAt(start) !== "^") return false;

  if (state.src.charAt(start + 1) !== "[") return false;

  const labelStart = start + 2;
  const labelEnd = parseLinkLabel(state, start + 1);

  // parser failed to find ']', so it’s not a valid note
  if (labelEnd < 0) return false;

  /*
   * We found the end of the link, and know for a fact it’s a valid link;
   * so all that’s left to do is to call tokenizer.
   *
   */
  if (!silent) {
    if (!state.env.footnotes) state.env.footnotes = {};
    if (!state.env.footnotes.list) state.env.footnotes.list = [];
    footnoteId = state.env.footnotes.list.length;

    state.md.inline.parse(
      state.src.slice(labelStart, labelEnd),
      state.md,
      state.env,
      (tokens = [])
    );

    token = state.push("footnoteRef", "", 0);
    token.meta = { id: footnoteId };

    state.env.footnotes.list[footnoteId] = {
      content: state.src.slice(labelStart, labelEnd),
      tokens,
    };
  }

  state.pos = labelEnd + 1;
  state.posMax = max;

  return true;
};

// Process footnote references ([^...])
const footnoteRef: RuleInline = (state: FootNoteStateInline, silent) => {
  let pos;
  let footnoteId;
  let footnoteSubId;
  let token;
  const max = state.posMax;
  const start = state.pos;

  // should be at least 4 chars - "[^x]"
  if (start + 3 > max) return false;

  if (!state.env.footnotes || !state.env.footnotes.refs) return false;
  if (state.src.charAt(start) !== "[") return false;

  if (state.src.charAt(start + 1) !== "^") return false;

  for (pos = start + 2; pos < max; pos++) {
    if (state.src.charAt(pos) === " ") return false;
    if (state.src.charAt(pos) === "\n") return false;
    if (state.src.charAt(pos) === "]") break;
  }

  if (pos === start + 2) return false; // no empty footnote labels
  if (pos >= max) return false;

  pos += 1;

  const label = state.src.slice(start + 2, pos - 1);

  if (typeof state.env.footnotes.refs[`:${label}`] === "undefined")
    return false;

  if (!silent) {
    if (!state.env.footnotes.list) state.env.footnotes.list = [];

    if (state.env.footnotes.refs[`:${label}`] < 0) {
      footnoteId = state.env.footnotes.list.length;
      state.env.footnotes.list[footnoteId] = { label, count: 0 };
      state.env.footnotes.refs[`:${label}`] = footnoteId;
    } else footnoteId = state.env.footnotes.refs[`:${label}`];

    footnoteSubId = state.env.footnotes.list[footnoteId].count as number;
    state.env.footnotes.list[footnoteId].count =
      (state.env.footnotes.list[footnoteId].count as number) + 1;

    token = state.push("footnoteRef", "", 0);
    token.meta = { id: footnoteId, subId: footnoteSubId, label };
  }

  state.pos = pos;
  state.posMax = max;

  return true;
};

// Glue footnote tokens to end of token stream
const footnoteTail = (state: FootNoteStateCore): boolean => {
  let lastParagraph: FootNoteToken | null;
  let token: Token;
  let tokens: Token[];
  let current: Token[];
  let currentLabel: string;
  let insideRef = false;
  const refTokens: Record<string, Token[]> = {};

  if (!state.env.footnotes) return false;

  state.tokens = state.tokens.filter((stateToken) => {
    if (stateToken.type === "footnoteReferenceOpen") {
      insideRef = true;
      current = [];
      currentLabel = stateToken.meta.label;

      return false;
    }
    if (stateToken.type === "footnoteReferenceClose") {
      insideRef = false;
      // prepend ':' to avoid conflict with Object.prototype members
      refTokens[`:${currentLabel}`] = current;

      return false;
    }
    if (insideRef) current.push(stateToken);

    return !insideRef;
  });

  if (!state.env.footnotes.list) return false;
  const { list } = state.env.footnotes;

  token = new Token("footnoteBlockOpen", "", 1);
  state.tokens.push(token);

  for (let i = 0, { length } = list; i < length; i++) {
    token = new Token("footnoteOpen", "", 1);
    token.meta = { id: i, label: list[i].label };
    state.tokens.push(token);

    if (list[i].tokens) {
      tokens = [];

      token = new Token("paragraph_open", "p", 1);
      token.block = true;
      tokens.push(token);

      token = new Token("inline", "", 0);
      token.children = list[i].tokens as Token[];
      token.content = list[i].content as string;
      tokens.push(token);

      token = new Token("paragraph_close", "p", -1);
      token.block = true;
      tokens.push(token);
    } else if (list[i].label) tokens = refTokens[`:${list[i].label as string}`];
    else tokens = [];

    if (tokens) state.tokens = state.tokens.concat(tokens);
    if (state.tokens[state.tokens.length - 1].type === "paragraph_close")
      lastParagraph = state.tokens.pop() || null;
    else lastParagraph = null;

    for (
      let j = 0;
      j < (Number(list[i].count) > 0 ? (list[i].count as number) : 1);
      j++
    ) {
      token = new Token("footnoteAnchor", "", 0);
      token.meta = { id: i, subId: j, label: list[i].label };
      state.tokens.push(token);
    }

    if (lastParagraph) state.tokens.push(lastParagraph);

    token = new Token("footnoteClose", "", -1);
    state.tokens.push(token);
  }

  token = new Token("footnoteBlockClose", "", -1);
  state.tokens.push(token);

  return true;
};

export const footnote: PluginSimple = (md) => {
  md.renderer.rules["footnoteRef"] = renderFootnoteRef;
  md.renderer.rules["footnoteBlockOpen"] = renderFootnoteBlockOpen;
  md.renderer.rules["footnoteBlockClose"] = renderFootnoteBlockClose;
  md.renderer.rules["footnoteOpen"] = renderFootnoteOpen;
  md.renderer.rules["footnoteClose"] = renderFootnoteClose;
  md.renderer.rules["footnoteAnchor"] = renderFootnoteAnchor;

  // helpers (only used in other rules, no tokens are attached to those)
  // helpers (only used in other rules, no tokens are attached to those)
  md.renderer.rules["footnoteCaption"] = renderFootnoteCaption;
  md.renderer.rules["footnoteAnchorName"] = renderFootnoteAnchorName;

  md.block.ruler.before("reference", "footnoteDef", footnoteDef, {
    alt: ["paragraph", "reference"],
  });
  md.inline.ruler.after("image", "footnoteInline", footnoteInline);
  md.inline.ruler.after("footnoteInline", "footnoteRef", footnoteRef);
  md.core.ruler.after("inline", "footnoteTail", footnoteTail);
};
