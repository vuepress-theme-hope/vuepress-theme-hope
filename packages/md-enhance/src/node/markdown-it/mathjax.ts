/**
 * Forked from https://github.com/tani/markdown-it-mathjax3/blob/master/index.ts
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

// import { createRequire } from "node:module";
// import { resolve } from "node:path";
// import juice from "juice";
import { mathjax as MathJax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { CHTML } from "mathjax-full/js/output/chtml.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { AssistiveMmlHandler } from "mathjax-full/js/a11y/assistive-mml.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";
import { tex } from "./tex.js";

import type { PluginWithOptions } from "markdown-it";
import type { LiteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import type { LiteElement } from "mathjax-full/js/adaptors/lite/Element.js";
import type { MathJaxOptions } from "../typings/index.js";

export { mathjax as MathJax } from "mathjax-full/js/mathjax.js";
export { TeX } from "mathjax-full/js/input/tex.js";
export { CHTML } from "mathjax-full/js/output/chtml.js";
export { SVG } from "mathjax-full/js/output/svg.js";

export interface DocumentOptions {
  InputJax: TeX<LiteElement, string, HTMLElement>;
  OutputJax:
    | CHTML<LiteElement, string, HTMLElement>
    | SVG<LiteElement, string, HTMLElement>;
}

export const getDocumentOptions = (
  options: MathJaxOptions
): DocumentOptions => ({
  InputJax: new TeX<LiteElement, string, HTMLElement>({
    packages: AllPackages,
    ...options.tex,
  }),
  OutputJax:
    options.output === "chtml"
      ? new CHTML<LiteElement, string, HTMLElement>({
          // fontURL: "~mathjax-full/es5/output/chtml/fonts/woff-v2",
          // fontURL: `file:///${resolve(
          //   createRequire(import.meta.url).resolve("mathjax-full"),
          //   "es5/output/chtml/fonts/woff-v2"
          // )}`,
          // fontURL: `file:///${resolve(
          //   createRequire(import.meta.url).resolve("mathjax-full"),
          //   "es5/output/chtml/fonts/woff-v2"
          // )}`,
          fontURL:
            "http://fastly.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
          adaptiveCSS: true,
          ...options.chtml,
        })
      : new SVG<LiteElement, string, HTMLElement>({
          fontCache: "none",
          ...options.svg,
        }),
});

export interface MathJaxUtils {
  adaptor: LiteAdaptor;
  documentOptions: DocumentOptions;
}

export const initMathjax = (
  options?: MathJaxOptions | boolean
): MathJaxUtils | null => {
  if (!options) return null;

  const mathjaxOptions = typeof options === "object" ? options : {};
  const documentOptions = getDocumentOptions(mathjaxOptions);
  const adaptor = liteAdaptor();

  const handler = RegisterHTMLHandler(adaptor);

  if (mathjaxOptions.a11y !== false) AssistiveMmlHandler(handler);

  return {
    adaptor,
    documentOptions,
  };
};

export const mathjax: PluginWithOptions<MathJaxUtils> = (md, options) => {
  const { adaptor, documentOptions } = options!;

  md.use(tex, {
    render: (content, displayMode) => {
      /* eslint-disable */
      const mathDocument = MathJax.document(content, documentOptions).convert(
        content,
        { display: displayMode }
      );
      return adaptor.outerHTML(mathDocument);
    },
  });
};
