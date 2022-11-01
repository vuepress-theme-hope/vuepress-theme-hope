import type { MarkdownEnv } from "@vuepress/markdown";
import type { PluginSimple } from "markdown-it";
import type { RuleInline } from "markdown-it/lib/parser_inline.js";
import type { default as Token } from "markdown-it/lib/token.js";

interface MarkdownReference {
  href: string;
  title?: string;
}

export interface ImageEnv extends MarkdownEnv {
  references?: Record<string, MarkdownReference>;
}

// Parse image size
//
const parseNextNumber = (
  str: string,
  pos: number,
  max: number
): { ok: boolean; pos: number; value: string } => {
  let code;
  const start = pos;
  const result = {
    ok: false,
    pos: pos,
    value: "",
  };

  code = str.charCodeAt(pos);

  while (
    (pos < max && code >= 0x30 /* 0 */ && code <= 0x39) /* 9 */ ||
    code === 0x25 /* % */
  ) {
    code = str.charCodeAt(++pos);
  }

  result.ok = true;
  result.pos = pos;
  result.value = str.slice(start, pos);

  return result;
};

const parseImageSize = (
  str: string,
  pos: number,
  max: number
): { ok: boolean; pos: number; width: string; height: string } => {
  const result = {
    ok: false,
    pos: 0,
    width: "",
    height: "",
  };

  if (pos >= max) return result;

  if (str.charAt(pos) !== "=") return result;

  pos += 1;

  // size must follow = without any white spaces as follows
  // (1) =300x200
  // (2) =300x
  // (3) =x200
  const code = str.charCodeAt(pos);

  if (code !== 0x78 /* x */ && (code < 0x30 || code > 0x39) /* [0-9] */)
    return result;

  // parse width
  const width = parseNextNumber(str, pos, max);

  pos = width.pos;

  // next character must be 'x'
  if (str.charAt(pos) !== "x") return result;

  pos += 1;

  // parse height
  const height = parseNextNumber(str, pos, max);

  pos = height.pos;

  result.width = width.value;
  result.height = height.value;
  result.pos = pos;
  result.ok = true;

  return result;
};

const imageSizeRule: RuleInline = (state, silent) => {
  const env = <ImageEnv>state.env;
  const oldPos = state.pos;
  const max = state.posMax;

  if (state.src.charAt(state.pos) !== "!") return false;
  if (state.src.charAt(state.pos + 1) !== "[") return false;

  const labelStart = state.pos + 2;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) return false;

  let pos = labelEnd + 1;
  let code: number;

  let href = "";
  let title = "";
  let width = "";
  let height = "";

  if (pos < max && state.src.charAt(pos) === "(") {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos += 1;

    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!state.md.utils.isSpace(code) && code !== 0x0a) break;
    }

    if (pos >= max) return false;

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    let res;

    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);

    if (res.ok) {
      href = state.md.normalizeLink(res.str);

      if (state.md.validateLink(href)) pos = res.pos;
      else href = "";
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    const start = pos;

    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!state.md.utils.isSpace(code) && code !== 0x0a) break;
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);

    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!state.md.utils.isSpace(code) && code !== 0x0a) break;
      }
    } else title = "";

    // [link](  <href>  "title" =WxH  )
    //                          ^^^^ parsing image size
    if (pos - 1 >= 0) {
      code = state.src.charCodeAt(pos - 1);

      // there must be at least one white spaces
      // between previous field and the size
      if (code === 0x20) {
        res = parseImageSize(state.src, pos, state.posMax);
        if (res.ok) {
          width = res.width;
          height = res.height;
          pos = res.pos;

          // [link](  <href>  "title" =WxH  )
          //                              ^^ skipping these spaces
          for (; pos < max; pos++) {
            code = state.src.charCodeAt(pos);
            if (code !== 0x20 && code !== 0x0a) break;
          }
        }
      }
    }

    if (pos >= max || state.src.charAt(pos) !== ")") {
      state.pos = oldPos;

      return false;
    }
    pos += 1;
  } else {
    let label = "";

    //
    // Link reference
    //
    if (typeof env.references === "undefined") return false;

    if (pos < max && state.src.charAt(pos) === "[") {
      const start = pos + 1;

      pos = state.md.helpers.parseLinkLabel(state, pos);

      if (pos >= 0) label = state.src.slice(start, pos++);
      else pos = labelEnd + 1;
    } else pos = labelEnd + 1;

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) label = state.src.slice(labelStart, labelEnd);

    const ref = env.references[state.md.utils.normalizeReference(label)];

    if (!ref) {
      state.pos = oldPos;

      return false;
    }

    href = ref.href;
    title = ref.title || "";
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    const content = state.src.slice(labelStart, labelEnd);
    const tokens: Token[] = [];

    state.md.inline.parse(content, state.md, state.env, tokens);

    const token = state.push("image", "img", 0);

    token.attrs = <[string, string][]>[
      ["src", href],
      ["alt", ""],
    ];
    if (title) token.attrs.push(["title", title]);
    if (width !== "") token.attrs.push(["width", width]);
    if (height !== "") token.attrs.push(["height", height]);

    token.children = tokens;
    token.content = content;
  }

  state.pos = pos;
  state.posMax = max;

  return true;
};

export const imageSize: PluginSimple = (md) => {
  md.inline.ruler.before("emphasis", "image", imageSizeRule);
};
