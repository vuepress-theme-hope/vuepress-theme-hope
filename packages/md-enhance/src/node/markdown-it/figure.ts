/**
 * Forked and modified from https://github.com/Antonio-Laguna/markdown-it-image-figures
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Antonio Laguna
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
import type Token from "markdown-it/lib/token.js";
import type { FigureOptions } from "../typings/index.js";

const removeAttribute = (token: Token, attribute: string) => {
  token.attrs = (token.attrs || []).filter(([key]) => key !== attribute);
};

const getCaption = (image: Token) => {
  const title = image.attrs?.find(([attr]) => attr === "title")?.[1];

  if (title) {
    removeAttribute(image, "title");

    return title;
  }

  return image.content;
};

export const figure: PluginWithOptions<FigureOptions> = (md, options = {}) => {
  md.core.ruler.before("linkify", "figure", (state) => {
    // do not process first and last token
    for (
      let index = 1, { length } = state.tokens;
      index < length - 1;
      index++
    ) {
      const token = state.tokens[index];

      if (token.type !== "inline") continue;

      // children: image alone, or link_open -> image -> link_close
      if (
        !token.children ||
        (token.children.length !== 1 && token.children.length !== 3)
      )
        continue;

      // one child, should be img
      if (token.children.length === 1 && token.children[0].type !== "image")
        continue;

      // three children, should be image enclosed in link
      if (token.children.length === 3) {
        const [childrenA, childrenB, childrenC] = token.children;
        const isEnclosed =
          childrenA.type !== "link_open" ||
          childrenB.type !== "image" ||
          childrenC.type !== "link_close";

        if (isEnclosed) continue;
      }

      // prev token is paragraph open
      if (index !== 0 && state.tokens[index - 1].type !== "paragraph_open")
        continue;

      // next token is paragraph close
      if (
        index !== length - 1 &&
        state.tokens[index + 1].type !== "paragraph_close"
      )
        continue;

      // We have inline token containing an image only.
      // Previous token is paragraph open.
      // Next token is paragraph close.
      // Lets replace the paragraph tokens with figure tokens.
      const figure = state.tokens[index - 1];

      figure.type = "figure_open";
      figure.tag = "figure";
      state.tokens[index + 1].type = "figure_close";
      state.tokens[index + 1].tag = "figure";

      // for linked images, image is one off
      const image =
        token.children.length === 1 ? token.children[0] : token.children[1];

      const figCaption = getCaption(image);
      const [captionContent] = md.parseInline(figCaption, state.env);

      token.children.push(new state.Token("figcaption_open", "figcaption", 1));
      token.children.push(...(captionContent.children || []));
      token.children.push(
        new state.Token("figcaption_close", "figcaption", -1)
      );

      if (options.focusable !== false) image.attrPush(["tabindex", "0"]);
    }
  });
};
