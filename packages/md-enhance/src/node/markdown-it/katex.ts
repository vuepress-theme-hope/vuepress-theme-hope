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

import { createRequire } from "node:module";
import { default as Katex } from "katex";
import { tex } from "./tex.js";
import { escapeHtml } from "./utils.js";

import type { PluginWithOptions } from "markdown-it";
import type { KatexOptions as OriginalKatexOptions } from "katex";
import type { KatexOptions } from "../../shared/index.js";

const require = createRequire(import.meta.url);

const katexInline = (tex: string, options: OriginalKatexOptions): string => {
  try {
    return Katex.renderToString(tex, { ...options, displayMode: false });
  } catch (error) {
    if (options.throwOnError) console.warn(error);

    return `<span class='katex-error' title='${escapeHtml(
      (error as Error).toString()
    )}'>${escapeHtml(tex)}</span>`;
  }
};

const katexBlock = (tex: string, options: OriginalKatexOptions): string => {
  try {
    return `<p class='katex-block'>${Katex.renderToString(tex, {
      ...options,
      displayMode: true,
      strict: (errorCode: string): string =>
        errorCode === "newLineInDisplayMode" ? "ignore" : "warn",
    })}</p>\n`;
  } catch (error) {
    if (options.throwOnError) console.warn(error);

    return `<p class='katex-block katex-error' title='${escapeHtml(
      (error as Error).toString()
    )}'>${escapeHtml(tex)}</p>\n`;
  }
};

export const katex: PluginWithOptions<KatexOptions> = (md, options = {}) => {
  const { mhchem = false, ...userOptions } = options;

  if (mhchem) require("katex/contrib/mhchem");

  const katexOptions = {
    throwOnError: false,
    ...userOptions,
  };

  md.use(tex, {
    render: (content, displayMode) =>
      displayMode
        ? katexBlock(content, katexOptions)
        : katexInline(content, katexOptions),
  });
};
