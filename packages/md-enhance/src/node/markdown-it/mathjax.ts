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

import juice from "juice";
import { mathjax as MathJax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { CHTML } from "mathjax-full/js/output/chtml.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";
import { tex } from "./tex.js";

import type { PluginWithOptions } from "markdown-it";
import type { LiteElement } from "mathjax-full/js/adaptors/lite/Element.js";
import type { MathJaxOptions } from "../../shared/index.js";

interface DocumentOptions {
  InputJax: TeX<LiteElement, string, HTMLElement>;
  OutputJax:
    | CHTML<LiteElement, string, HTMLElement>
    | SVG<LiteElement, string, HTMLElement>;
}

const renderMath = (
  content: string,
  documentOptions: DocumentOptions,
  displayMode: boolean
): string => {
  const adaptor = liteAdaptor();

  RegisterHTMLHandler(adaptor);
  const mathDocument = MathJax.document(content, documentOptions);
  /* eslint-disable */
  const html = adaptor.outerHTML(
    mathDocument.convert(content, { display: displayMode })
  );
  const stylesheet = adaptor.outerHTML(
    documentOptions.OutputJax.styleSheet(mathDocument)
  );

  /* eslint-enable */
  return documentOptions.OutputJax instanceof SVG
    ? html
    : juice(html + stylesheet);
};

export const mathjax: PluginWithOptions<MathJaxOptions> = (
  md,
  options = {}
) => {
  const documentOptions = {
    InputJax: new TeX<LiteElement, string, HTMLElement>({
      packages: AllPackages,
      ...options.tex,
    }),
    OutputJax:
      options.output === "chtml"
        ? new CHTML<LiteElement, string, HTMLElement>({
            ...options.chtml,
          })
        : new SVG<LiteElement, string, HTMLElement>({
            fontCache: "none",
            ...options.svg,
          }),
  };

  md.use(tex, {
    render: (content, displayMode) =>
      renderMath(content, documentOptions, displayMode),
  });
};
