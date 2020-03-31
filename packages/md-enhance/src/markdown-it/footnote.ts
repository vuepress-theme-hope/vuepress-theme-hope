/* eslint-disable max-lines */
/* eslint-disable no-plusplus */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/camelcase */

import MarkdownIt from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import StateBlock from 'markdown-it/lib/rules_block/state_block';
import StateCore from 'markdown-it/lib/rules_core/state_core';
import StateInline from 'markdown-it/lib/rules_inline/state_inline';
import Token from 'markdown-it/lib/token';

const renderFootnoteAnchorName = (
  tokens: Token[],
  idx: number,
  _options: any,
  env: any
): string => {
  const num = Number(tokens[idx].meta.id + 1).toString();
  let prefix = '';

  if (typeof env.docId === 'string') prefix = `-${env.docId}-`;

  return prefix + num;
};

const renderFootnoteCaption = (tokens: Token[], idx: number): string => {
  let num = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) num += `:${tokens[idx].meta.subId}`;

  return `[${num}]`;
};

const renderFootnoteRef = (
  tokens: Token[],
  idx: number,
  options: any,
  env: any,
  slf: Renderer
): string => {
  const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
  let refid = id;

  if (tokens[idx].meta.subId > 0) refid += `:${tokens[idx].meta.subId}`;

  return `<sup class="footnote-ref"><a href="#fn${id}">${caption}</a><a class="footnote-anchor" id="fnref${refid}" /></sup>`;
};

const renderFootnoteBlockOpen = (
  _tokens: Token[],
  _idx: number,
  options: any
): string => {
  return `${
    options.xhtmlOut
      ? '<hr class="footnotes-sep" />\n'
      : '<hr class="footnotes-sep">\n'
  }<section class="footnotes">\n<ol class="footnotes-list">\n`;
};

const renderFootnoteBlockClose = (): string => '</ol>\n</section>\n';

const renderFootnoteOpen = (
  tokens: Token[],
  idx: number,
  options: any,
  env: any,
  slf: Renderer
): string => {
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

  if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`;

  return `<li id="fn${id}" class="footnote-item">`;
};

const renderFootnoteClose = (): string => '</li>\n';

const renderFootnoteAnchor = (
  tokens: Token[],
  idx: number,
  options: any,
  env: any,
  slf: Renderer
): string => {
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

  if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`;

  /* ↩ with escape code to prevent display as Apple Emoji on iOS */
  return ` <a href="#fnref${id}" class="footnote-backref">\u21a9\uFE0E</a>`;
};

const footnote = (md: MarkdownIt): void => {
  const { parseLinkLabel } = md.helpers;
  const { isSpace } = md.utils;

  md.renderer.rules.footnote_ref = renderFootnoteRef;
  md.renderer.rules.footnote_block_open = renderFootnoteBlockOpen;
  md.renderer.rules.footnote_block_close = renderFootnoteBlockClose;
  md.renderer.rules.footnote_open = renderFootnoteOpen;
  md.renderer.rules.footnote_close = renderFootnoteClose;
  md.renderer.rules.footnote_anchor = renderFootnoteAnchor;

  // helpers (only used in other rules, no tokens are attached to those)
  md.renderer.rules.footnote_caption = renderFootnoteCaption;
  md.renderer.rules.footnote_anchor_name = renderFootnoteAnchorName;

  // Process footnote block definition
  const footnoteDef = (
    state: StateBlock,
    startLine: number,
    endLine: number,
    silent: boolean
  ): boolean => {
    let pos;
    let token;
    let offset;
    let ch;
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // line should be at least 5 chars - "[^x]:"
    if (start + 4 > max) return false;

    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false;

    if (state.src.charCodeAt(start + 1) !== 0x5e /* ^ */) return false;

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) return false;
      if (state.src.charCodeAt(pos) === 0x5d /* ] */) break;
    }

    if (pos === start + 2) return false; // no empty footnote labels
    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3a /* : */)
      return false;

    if (silent) return true;
    pos += 1;

    if (!state.env.footnotes) state.env.footnotes = {};
    if (!state.env.footnotes.refs) state.env.footnotes.refs = {};
    const label = state.src.slice(start + 2, pos - 2);
    state.env.footnotes.refs[`:${label}`] = -1;

    token = new state.Token('footnote_reference_open', '', 1);
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
      ch = state.src.charCodeAt(pos);

      if (isSpace(ch))
        if (ch === 0x09) {
          offset += 4 - (offset % 4);
        } else {
          offset += 1;
        }
      else break;

      pos += 1;
    }

    state.tShift[startLine] = pos - posAfterColon;
    state.sCount[startLine] = offset - initial;

    state.bMarks[startLine] = posAfterColon;
    state.blkIndent += 4;
    state.parentType = 'footnote' as any;

    if (state.sCount[startLine] < state.blkIndent)
      state.sCount[startLine] += state.blkIndent;

    (state.md.block as any).tokenize(state, startLine, endLine, true);

    state.parentType = oldParentType;
    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.bMarks[startLine] = oldBMark;

    token = new state.Token('footnote_reference_close', '', -1);
    token.level = --state.level;
    state.tokens.push(token);

    return true;
  };

  // Process inline footnotes (^[...])
  const footnoteInline = (state: StateInline, silent?: boolean): boolean => {
    let footnoteId;
    let token;
    let tokens: any[];
    const max = state.posMax;
    const start = state.pos;

    if (start + 2 >= max) return false;
    if (state.src.charCodeAt(start) !== 0x5e /* ^ */) return false;

    if (state.src.charCodeAt(start + 1) !== 0x5b /* [ */) return false;

    const labelStart = start + 2;
    const labelEnd = parseLinkLabel(state, start + 1);

    // parser failed to find ']', so it's not a valid note
    if (labelEnd < 0) return false;

    /*
     * We found the end of the link, and know for a fact it's a valid link;
     * so all that's left to do is to call tokenizer.
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

      token = state.push('footnote_ref', '', 0);
      token.meta = { id: footnoteId };

      state.env.footnotes.list[footnoteId] = {
        content: state.src.slice(labelStart, labelEnd),
        tokens
      };
    }

    state.pos = labelEnd + 1;
    state.posMax = max;
    return true;
  };

  // Process footnote references ([^...])
  const footnoteRef = (state: StateInline, silent?: boolean): boolean => {
    let pos;
    let footnoteId;
    let footnoteSubId;
    let token;
    const max = state.posMax;
    const start = state.pos;

    // should be at least 4 chars - "[^x]"
    if (start + 3 > max) return false;

    if (!state.env.footnotes || !state.env.footnotes.refs) return false;
    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false;

    if (state.src.charCodeAt(start + 1) !== 0x5e /* ^ */) return false;

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) return false;
      if (state.src.charCodeAt(pos) === 0x0a) return false;

      if (state.src.charCodeAt(pos) === 0x5d /* ] */) break;
    }

    if (pos === start + 2) return false; // no empty footnote labels
    if (pos >= max) return false;
    pos += 1;

    const label = state.src.slice(start + 2, pos - 1);
    if (typeof state.env.footnotes.refs[`:${label}`] === 'undefined')
      return false;

    if (!silent) {
      if (!state.env.footnotes.list) state.env.footnotes.list = [];

      if (state.env.footnotes.refs[`:${label}`] < 0) {
        footnoteId = state.env.footnotes.list.length;
        state.env.footnotes.list[footnoteId] = { label, count: 0 };
        state.env.footnotes.refs[`:${label}`] = footnoteId;
      } else footnoteId = state.env.footnotes.refs[`:${label}`];

      footnoteSubId = state.env.footnotes.list[footnoteId].count;
      state.env.footnotes.list[footnoteId].count += 1;

      token = state.push('footnote_ref', '', 0);
      token.meta = { id: footnoteId, subId: footnoteSubId, label };
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  };

  // Glue footnote tokens to end of token stream
  const footnoteTail = (state: StateCore): void => {
    let lastParagraph;
    let token;
    let tokens;
    let current: any[];
    let currentLabel: string;
    let insideRef = false;
    const refTokens: any = {};

    if (!state.env.footnotes) return;

    state.tokens = state.tokens.filter((tok: any) => {
      if (tok.type === 'footnote_reference_open') {
        insideRef = true;
        current = [];
        currentLabel = tok.meta.label;
        return false;
      }
      if (tok.type === 'footnote_reference_close') {
        insideRef = false;
        // prepend ':' to avoid conflict with Object.prototype members
        refTokens[`:${currentLabel}`] = current;
        return false;
      }
      if (insideRef) current.push(tok);
      return !insideRef;
    });

    if (!state.env.footnotes.list) return;
    const { list } = state.env.footnotes;

    token = new state.Token('footnote_block_open', '', 1);
    state.tokens.push(token);

    for (let i = 0, { length } = list; i < length; i++) {
      token = new state.Token('footnote_open', '', 1);
      token.meta = { id: i, label: list[i].label };
      state.tokens.push(token);

      if (list[i].tokens) {
        tokens = [];

        token = new state.Token('paragraph_open', 'p', 1);
        token.block = true;
        tokens.push(token);

        token = new state.Token('inline', '', 0);
        token.children = list[i].tokens;
        token.content = list[i].content;
        tokens.push(token);

        token = new state.Token('paragraph_close', 'p', -1);
        token.block = true;
        tokens.push(token);
      } else if (list[i].label) tokens = refTokens[`:${list[i].label}`];

      state.tokens = state.tokens.concat(tokens);
      if (state.tokens[state.tokens.length - 1].type === 'paragraph_close')
        lastParagraph = state.tokens.pop();
      else lastParagraph = null;

      for (let x = 0; x < (list[i].count > 0 ? list[i].count : 1); x++) {
        token = new state.Token('footnote_anchor', '', 0);
        token.meta = { id: i, subId: x, label: list[i].label };
        state.tokens.push(token);
      }

      if (lastParagraph) state.tokens.push(lastParagraph);

      token = new state.Token('footnote_close', '', -1);
      state.tokens.push(token);
    }

    token = new state.Token('footnote_block_close', '', -1);
    state.tokens.push(token);
  };

  // eslint-disable-next-line object-curly-newline
  md.block.ruler.before('reference', 'footnote_def', footnoteDef as any, {
    // eslint-disable-next-line object-curly-newline
    alt: ['paragraph', 'reference']
  });
  md.inline.ruler.after('image', 'footnote_inline', footnoteInline);
  md.inline.ruler.after('footnote_inline', 'footnote_ref', footnoteRef);
  md.core.ruler.after('inline', 'footnote_tail', footnoteTail);
};

export default footnote;
