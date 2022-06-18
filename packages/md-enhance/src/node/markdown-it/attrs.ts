/**
 * Forked and modified from https://github.com/arve0/markdown-it-attrs/
 * The MIT License (MIT)
 *
 * Copyright (c) Arve Seljebu <arve.seljebu@gmail.com> (arve0.github.io)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import type { PluginWithOptions } from "markdown-it";
import type Token from "markdown-it/lib/token";
import type { RuleCore } from "markdown-it/lib/parser_core";
import type { AttrsOptions } from "../../shared";

type Attr = [key: string, value: string];

// not tab, line feed, form feed, space, solidus, greater than sign, quotation mark, apostrophe and equals sign
const ALLOWED_KEY_CHARS = /[^\t\n\f />"'=]/;
const PAIR_SPERATOR = " ";
const KEY_SPERATOR = "=";
const CLASS_MARKER = ".";
const ID_MARKER = "#";

export const getAttrs = (
  str: string,
  start: number,
  { left, right, allowed }: Required<AttrsOptions>
): Attr[] => {
  let key = "";
  let value = "";
  let parsingKey = true;
  let valueInsideQuotes = false;

  const attrs: Attr[] = [];

  // read inside {}
  // start + left delimiter length to avoid beginning {
  // breaks when } is found or end of string
  for (let index = start + left.length; index < str.length; index++) {
    if (str.slice(index, index + right.length) === right) {
      if (key !== "") attrs.push([key, value]);
      break;
    }

    const char = str.charAt(index);

    // switch to reading value if equal sign
    if (char === KEY_SPERATOR && parsingKey) {
      parsingKey = false;
      continue;
    }

    // {.class} {..css-module}
    if (char === CLASS_MARKER && key === "") {
      if (str.charAt(index + 1) === CLASS_MARKER) {
        key = "css-module";
        index += 1;
      } else key = "class";

      parsingKey = false;
      continue;
    }

    // {#id}
    if (char === ID_MARKER && key === "") {
      key = "id";
      parsingKey = false;
      continue;
    }

    // {value="inside quotes"}
    if (char === '"' && value === "") {
      valueInsideQuotes = true;
      continue;
    }

    if (char === '"' && valueInsideQuotes) {
      valueInsideQuotes = false;
      continue;
    }

    // read next key/value pair
    if (char === PAIR_SPERATOR && !valueInsideQuotes) {
      if (key === "") {
        // beginning or ending space: { .red } vs {.red}
        continue;
      }

      attrs.push([key, value]);
      key = "";
      value = "";
      parsingKey = true;

      continue;
    }

    // continue if character not allowed
    if (parsingKey && char.search(ALLOWED_KEY_CHARS) === -1) continue;

    // no other conditions met; append to key/value
    if (parsingKey) {
      key += char;
      continue;
    }

    value += char;
  }

  return allowed.length
    ? attrs.filter(([attr]) =>
        allowed.some((item) =>
          item instanceof RegExp ? item.test(attr) : item === attr
        )
      )
    : attrs;
};

const addAttrs = (attrs: Attr[], token: Token | null): void => {
  if (token)
    attrs.forEach((attrItem) => {
      const [key, value] = attrItem;

      if (key === "class") token.attrJoin("class", value);
      else if (key === "css-module") token.attrJoin("css-module", value);
      else token.attrPush(attrItem);
    });
};

const hasDelimiters =
  (
    where: "start" | "end" | "only",
    { left, right }: Required<AttrsOptions>
  ): ((str: string) => boolean) =>
  (str: string): boolean => {
    const leftLength = left.length;
    const rightLength = right.length;
    // we need minimum three chars, for example {b}
    const minCurlyLength = leftLength + 1 + rightLength;

    if (!str || typeof str !== "string" || str.length < minCurlyLength)
      return false;

    const validCurlyLength = (curly: string): boolean => {
      const isClass = curly.charAt(leftLength) === ".";
      const isId = curly.charAt(leftLength) === "#";

      return isClass || isId
        ? curly.length >= minCurlyLength + 1
        : curly.length >= minCurlyLength;
    };

    let start, end, slice, nextChar;
    const rightDelimiterMinimumShift = minCurlyLength - rightLength;

    switch (where) {
      case "start":
        // first char should be {, } found in char 2 or more
        slice = str.slice(0, leftLength);
        start = slice === left ? 0 : -1;
        end =
          start === -1 ? -1 : str.indexOf(right, rightDelimiterMinimumShift);
        // check if next character is not one of the delimiters
        nextChar = str.charAt(end + rightLength);
        if (nextChar && right.indexOf(nextChar) !== -1) end = -1;
        break;

      case "end":
        // last char should be }
        start = str.lastIndexOf(left);
        end =
          start === -1
            ? -1
            : str.indexOf(right, start + rightDelimiterMinimumShift);
        end = end === str.length - rightLength ? end : -1;
        break;

      case "only":
        // '{.a}'
        slice = str.slice(0, leftLength);
        start = slice === left ? 0 : -1;
        slice = str.slice(str.length - rightLength);
        end = slice === right ? str.length - rightLength : -1;
        break;
    }

    return (
      start !== -1 &&
      end !== -1 &&
      validCurlyLength(str.substring(start, end + rightLength))
    );
  };

const removeDelimiter = (
  str: string,
  { left, right }: Required<AttrsOptions>
): string => {
  const start = escapeRegExp(left);
  const end = escapeRegExp(right);
  const pos = str.search(
    new RegExp(`[ \\n]?${start}[^${start}${end}]+${end}$`)
  );

  return pos !== -1 ? str.slice(0, pos) : str;
};

const getMatchingOpeningToken = (tokens: Token[], i: number): Token | null => {
  if (tokens[i].type === "softbreak") return null;

  // non closing blocks, example img
  if (tokens[i].nesting === 0) return tokens[i];

  const level = tokens[i].level;
  const type = tokens[i].type.replace("_close", "_open");

  for (; i >= 0; --i)
    if (tokens[i].type === type && tokens[i].level === level) return tokens[i];

  return null;
};

/**
 * Get n item of array. Supports negative n, where -1 is last
 * element in array.
 */
const getElement = <T>(arr: T[], n: number): T =>
  n >= 0 ? arr[n] : arr[arr.length + n];

const isArrayOfObjects = (arr: unknown): arr is object[] =>
  Array.isArray(arr) &&
  Boolean(arr.length) &&
  arr.every((item) => typeof item === "object");

// eslint-disable-next-line @typescript-eslint/ban-types
const isArrayOfFunctions = (arr: unknown): arr is Function[] =>
  Array.isArray(arr) &&
  Boolean(arr.length) &&
  arr.every((item) => typeof item === "function");

/**
 * Escapes special characters in string s such that the string
 * can be used in `new RegExp`. For example "[" becomes "\\[".
 */
const escapeRegExp = (regexp: string): string =>
  regexp.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

interface RuleSet {
  position?: number;
  shift?: number;
  type?: string | ((type: string) => boolean);
  block?: boolean;
  info?: boolean | ((info: string) => boolean);
  content?: boolean | ((content: string) => boolean);
  nesting?: 0 | 1 | -1;
  children?: RuleSet[] | ((children: unknown[]) => boolean);
}

interface Rule {
  name: string;
  tests: RuleSet[];
  transform: (tokens: Token[], index: number, subIndex: number) => void;
}

const patternsConfig = (options: Required<AttrsOptions>): Rule[] => [
  /**
   * ```python {.cls}
   * for i in range(10):
   *     print(i)
   * ```
   */
  {
    name: "fenced code blocks",
    tests: [
      {
        shift: 0,
        block: true,
        info: hasDelimiters("end", options),
      },
    ],
    transform: (tokens, index): void => {
      const token = tokens[index];
      let lineNumber = "";

      const results = token.info.match(/{(?:[\d,-]+)}/);

      if (results) {
        token.info = token.info.replace(results[0], "");
        lineNumber = results[0];
      }

      const start = token.info.lastIndexOf(options.left);
      const attrs = getAttrs(token.info, start, options);

      addAttrs(attrs, token);
      token.info = `${lineNumber} ${removeDelimiter(token.info, options)}`;
    },
  },

  /**
   * bla `click()`{.c} ![](img.png){.d}
   *
   * differs from 'inline attributes' as it does
   * not have a closing tag (nesting: -1)
   */
  {
    name: "inline nesting 0",
    tests: [
      {
        shift: 0,
        type: "inline",
        children: [
          {
            shift: -1,
            type: (str) => str === "image" || str === "code_inline",
          },
          {
            shift: 0,
            type: "text",
            content: hasDelimiters("start", options),
          },
        ],
      },
    ],
    transform: (tokens, index, childIndex): void => {
      const token = tokens[index].children![childIndex];

      const endChar = token.content.indexOf(options.right);
      const attrToken = tokens[index].children![childIndex - 1];
      const attrs = getAttrs(token.content, 0, options);

      addAttrs(attrs, attrToken);
      if (token.content.length === endChar + options.right.length)
        tokens[index].children!.splice(childIndex, 1);
      else token.content = token.content.slice(endChar + options.right.length);
    },
  },

  /**
   * | h1 |
   * | -- |
   * | c1 |
   *
   * {.c}
   */
  {
    name: "tables",
    tests: [
      {
        // let this token be i, such that for-loop continues at
        // next token after tokens.splice
        shift: 0,
        type: "table_close",
      },
      {
        shift: 1,
        type: "paragraph_open",
      },
      {
        shift: 2,
        type: "inline",
        content: hasDelimiters("only", options),
      },
    ],
    transform: (tokens, index): void => {
      const token = tokens[index + 2];
      const tableOpen = getMatchingOpeningToken(tokens, index);
      const attrs = getAttrs(token.content, 0, options);

      // add attributes
      addAttrs(attrs, tableOpen);
      // remove <p>{.c}</p>
      tokens.splice(index + 1, 3);
    },
  },

  /**
   * *emphasis*{.with attrs=1}
   */
  {
    name: "inline attributes",
    tests: [
      {
        shift: 0,
        type: "inline",
        children: [
          {
            shift: -1,
            nesting: -1, // closing inline tag, </em>{.a}
          },
          {
            shift: 0,
            type: "text",
            content: hasDelimiters("start", options),
          },
        ],
      },
    ],
    transform: (tokens, index, childIndex): void => {
      const token = tokens[index].children![childIndex];
      const { content } = token;
      const attrs = getAttrs(content, 0, options);
      const openingToken = getMatchingOpeningToken(
        tokens[index].children!,
        childIndex - 1
      );

      addAttrs(attrs, openingToken);
      token.content = content.slice(
        content.indexOf(options.right) + options.right.length
      );
    },
  },

  /**
   * - item
   * {.a}
   */
  {
    name: "list softbreak",
    tests: [
      {
        shift: -2,
        type: "list_item_open",
      },
      {
        shift: 0,
        type: "inline",
        children: [
          {
            position: -2,
            type: "softbreak",
          },
          {
            position: -1,
            type: "text",
            content: hasDelimiters("only", options),
          },
        ],
      },
    ],
    transform: (tokens, indx, childIndex): void => {
      const token = tokens[indx].children![childIndex];
      const attrs = getAttrs(token.content, 0, options);
      let ii = indx - 2;

      while (
        tokens[ii - 1] &&
        tokens[ii - 1].type !== "ordered_list_open" &&
        tokens[ii - 1].type !== "bullet_list_open"
      ) {
        ii--;
      }
      addAttrs(attrs, tokens[ii - 1]);
      tokens[indx].children = tokens[indx].children!.slice(0, -2);
    },
  },

  /**
   * - nested list
   *   - with double \n
   *   {.a} <-- apply to nested ul
   *
   * {.b} <-- apply to root <ul>
   */
  {
    name: "list double softbreak",
    tests: [
      {
        // let this token be i = 0 so that we can erase
        // the <p>{.a}</p> tokens below
        shift: 0,
        type: (type) =>
          type === "bullet_list_close" || type === "ordered_list_close",
      },
      {
        shift: 1,
        type: "paragraph_open",
      },
      {
        shift: 2,
        type: "inline",
        content: hasDelimiters("only", options),
        children: (children) => children.length === 1,
      },
      {
        shift: 3,
        type: "paragraph_close",
      },
    ],
    transform: (tokens, index): void => {
      const token = tokens[index + 2];
      const attrs = getAttrs(token.content, 0, options);
      const openingToken = getMatchingOpeningToken(tokens, index);

      addAttrs(attrs, openingToken);
      tokens.splice(index + 1, 3);
    },
  },

  /**
   * - end of {.list-item}
   */
  {
    name: "list item end",
    tests: [
      {
        shift: -2,
        type: "list_item_open",
      },
      {
        shift: 0,
        type: "inline",
        children: [
          {
            position: -1,
            type: "text",
            content: hasDelimiters("end", options),
          },
        ],
      },
    ],
    transform: (tokens, index, childIndex): void => {
      const token = tokens[index].children![childIndex];
      const { content } = token;
      const attrs = getAttrs(
        content,
        content.lastIndexOf(options.left),
        options
      );

      addAttrs(attrs, tokens[index - 2]);

      const trimmed = content.slice(0, content.lastIndexOf(options.left));

      token.content =
        trimmed[trimmed.length - 1] === " " ? trimmed.slice(0, -1) : trimmed;
    },
  },

  /**
   * something with softbreak
   * {.cls}
   */
  {
    name: "\n{.a} softbreak then curly in start",
    tests: [
      {
        shift: 0,
        type: "inline",
        children: [
          {
            position: -2,
            type: "softbreak",
          },
          {
            position: -1,
            type: "text",
            content: hasDelimiters("only", options),
          },
        ],
      },
    ],
    transform: (tokens, index, childIndex): void => {
      const token = tokens[index].children![childIndex];
      const attrs = getAttrs(token.content, 0, options);

      // find last closing tag
      let ii = index + 1;

      while (tokens[ii + 1] && tokens[ii + 1].nesting === -1) ii++;

      const openingToken = getMatchingOpeningToken(tokens, ii);

      addAttrs(attrs, openingToken);
      tokens[index].children = tokens[index].children!.slice(0, -2);
    },
  },

  /**
   * horizontal rule --- {#id}
   */
  {
    name: "horizontal rule",
    tests: [
      {
        shift: 0,
        type: "paragraph_open",
      },
      {
        shift: 1,
        type: "inline",
        children: (children) => children.length === 1,
        content: (content) =>
          content.match(
            new RegExp(
              `^ {0,3}[-*_]{3,} ?${escapeRegExp(options.left)}[^${escapeRegExp(
                options.right
              )}]`
            )
          ) !== null,
      },
      {
        shift: 2,
        type: "paragraph_close",
      },
    ],
    transform: (tokens, index): void => {
      const token = tokens[index];

      token.type = "hr";
      token.tag = "hr";
      token.nesting = 0;

      const { content } = tokens[index + 1];
      const start = content.lastIndexOf(options.left);
      const attrs = getAttrs(content, start, options);

      addAttrs(attrs, token);
      token.markup = content;
      tokens.splice(index + 1, 2);
    },
  },

  /**
   * end of {.block}
   */
  {
    name: "end of block",
    tests: [
      {
        shift: 0,
        type: "inline",
        children: [
          {
            position: -1,
            content: hasDelimiters("end", options),
            type: (type) => type !== "code_inline" && type !== "math_inline",
          },
        ],
      },
    ],
    transform: (tokens, indx, childIndex): void => {
      const token = tokens[indx].children![childIndex];
      const { content } = token;
      const attrs = getAttrs(
        content,
        content.lastIndexOf(options.left),
        options
      );
      let ii = indx + 1;

      while (tokens[ii + 1] && tokens[ii + 1].nesting === -1) ii++;

      const openingToken = getMatchingOpeningToken(tokens, ii);

      addAttrs(attrs, openingToken);

      const trimmed = content.slice(0, content.lastIndexOf(options.left));

      token.content =
        trimmed[trimmed.length - 1] === " " ? trimmed.slice(0, -1) : trimmed;
    },
  },
];

/**
 * Test if rule matches token stream.
 *
 * @param {array} tokens
 * @param {number} index
 * @param {object} rule Test to match.
 * @return {object} { match: true|false, j: null|number }
 */
const test = (
  tokens: Token[],
  index: number,
  rule: RuleSet
): { match: boolean; pos: null | number } => {
  const res = {
    match: false,
    pos: null as number | null, // position of child
  };

  const ii =
    rule.shift !== undefined ? index + rule.shift : (rule.position as number);

  // we should never shift to negative indexes (rolling around to back of array)
  if (rule.shift !== undefined && ii < 0) return res;

  // supports negative ii
  const token = getElement(tokens, ii);

  if (token === undefined) return res;

  for (const key of Object.keys(rule) as (keyof typeof rule)[]) {
    if (key === "shift" || key === "position") continue;

    if (token[key as keyof Token] === undefined) return res;

    if (key === "children" && isArrayOfObjects(rule.children)) {
      if (token.children?.length === 0) return res;

      let match;
      const childTests = rule.children;
      const children = token.children!;

      if (childTests?.every((tt) => tt.position !== undefined)) {
        // positions instead of shifts, do not loop all children
        match = childTests.every(
          (tt) => test(children, tt.position!, tt).match
        );

        if (match) {
          // we may need position of child in transform
          const j = childTests[childTests.length - 1]?.position || 0;

          res.pos = j >= 0 ? j : children.length + j;
        }
      } else {
        for (let j = 0; j < children.length; j++) {
          match = childTests.every((tt) => test(children, j, tt).match);

          if (match) {
            res.pos = j;
            // all tests true, continue with next key of pattern t
            break;
          }
        }
      }

      if (match === false) return res;

      continue;
    }

    const ruleDetail = rule[key];

    switch (typeof ruleDetail) {
      case "boolean":
      case "number":
      case "string":
        if (token[key] !== ruleDetail) return res;

        break;

      case "function":
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!ruleDetail(token[key])) return res;

        break;

      case "object":
        if (isArrayOfFunctions(ruleDetail)) {
          const r = ruleDetail.every((tt) =>
            (tt as (key: unknown) => boolean)(token[key])
          );

          if (r === false) return res;

          break;
        }

        continue;

      // fall through for objects !== arrays of functions
      default:
        throw new Error(
          `Unknown type of pattern test (key: ${key}). Test should be of type boolean, number, string, function or array of functions.`
        );
    }
  }

  // no tests returned false -> all tests returns true
  res.match = true;

  return res;
};

export const attrs: PluginWithOptions<AttrsOptions> = (
  md,
  { left = "{", right = "}", allowed = [] } = {}
) => {
  const patterns = patternsConfig({
    left,
    right,
    allowed,
  });

  const curlyAttrs: RuleCore = (state) => {
    const tokens = state.tokens;

    for (let index = 0; index < tokens.length; index++) {
      for (
        let patternIndex = 0;
        patternIndex < patterns.length;
        patternIndex++
      ) {
        const pattern = patterns[patternIndex];
        // position of child with offset 0
        let pos: null | number = null;

        const match = pattern.tests.every((t) => {
          const res = test(tokens, index, t);

          if (res.pos !== null) pos = res.pos;

          return res.match;
        });

        if (match) {
          pattern.transform(tokens, index, pos!);

          if (
            pattern.name === "inline attributes" ||
            pattern.name === "inline nesting 0"
          ) {
            // retry, may be several inline attributes
            patternIndex--;
          }
        }
      }
    }
  };

  md.core.ruler.before("linkify", "curly_attributes", curlyAttrs);
};
