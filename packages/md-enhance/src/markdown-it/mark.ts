/* eslint-disable max-statements */
import MarkdownIt = require("markdown-it");
import StateInline = require("markdown-it/lib/rules_inline/state_inline");

/*
 * Insert each marker as a separate text token, and add it to delimiter list
 *
 */
const tokenize = (state: StateInline, silent: boolean): boolean => {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);

  if (silent) return false;

  if (marker !== 0x3d /* = */) return false;

  const char = String.fromCharCode(marker);
  const scanned = state.scanDelims(state.pos, true);
  let { length } = scanned;

  if (length < 2) return false;
  let token;

  if (length % 2) {
    token = state.push("text", "", 0);
    token.content = char;
    length -= 1;
  }

  for (let i = 0; i < length; i += 2) {
    token = state.push("text", "", 0);
    token.content = `${char}${char}`;

    if (scanned.can_open || scanned.can_close)
      state.delimiters.push({
        marker,
        length: 0, // disable "rule of 3" length checks meant for emphasis
        jump: i,
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
  let i;
  let j;
  let startDelim;
  let endDelim;
  let token;
  const loneMarkers = [];
  const max = delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker === 0x3d /* = */ && startDelim.end !== -1) {
      endDelim = delimiters[startDelim.end];

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
   * If a marker sequence has an odd number of characters, it's splitted
   * like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
   * start of the sequence.
   *
   * So, we have to move all those markers after subsequent s_close tags.
   *
   */
  while (loneMarkers.length) {
    i = loneMarkers.pop() as number;
    j = i + 1;

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

const mark = (md: MarkdownIt): void => {
  md.inline.ruler.before("emphasis", "mark", tokenize);
  md.inline.ruler2.before("emphasis", "mark", (state) => {
    let curr;
    const tokensMeta = state.tokens_meta;
    const max = (tokensMeta || []).length;

    postProcess(state, state.delimiters);

    for (curr = 0; curr < max; curr++)
      if (tokensMeta[curr] && tokensMeta[curr].delimiters)
        postProcess(state, tokensMeta[curr].delimiters);

    return true;
  });
};

export default mark;
