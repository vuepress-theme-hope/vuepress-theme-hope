/* eslint-disable max-statements */

'use strict';

// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/gu;

module.exports = (code, name, markup) => (state, silent) => {
  const max = state.posMax;
  const start = state.pos;
  let found;
  let token;

  if (state.src.charCodeAt(start) !== code) return false;

  if (silent) return false; // don't run any pairs in validation mode
  if (start + 2 >= max) return false;

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === code) {
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

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/u)) {
    state.pos = start;

    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token = state.push(`${name}_open`, name, 1);
  token.markup = markup;

  token = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');

  token = state.push(`${name}_close`, name, -1);
  token.markup = markup;

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
};
