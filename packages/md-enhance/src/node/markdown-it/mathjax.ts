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
import type { MathJaxOptions } from "../typings/index.js";
import type { App } from "@vuepress/core";

interface DocumentOptions {
  InputJax: TeX<LiteElement, string, HTMLElement>;
  OutputJax:
    | CHTML<LiteElement, string, HTMLElement>
    | SVG<LiteElement, string, HTMLElement>;
}

export const isImportGlobal = (options: MathJaxOptions | boolean): boolean => {
  return !(
    typeof options === "object" &&
    options.output === "chtml" &&
    options.chtml?.adaptiveCSS === true
  );
};

const renderMath = (
  content: string,
  documentOptions: DocumentOptions,
  displayMode: boolean,
  isImportGlobal: boolean
): string => {
  const adaptor = liteAdaptor();

  RegisterHTMLHandler(adaptor);
  const mathDocument = MathJax.document(content, documentOptions);
  /* eslint-disable */
  const html = adaptor.outerHTML(
    mathDocument.convert(content, { display: displayMode })
  );
  if (isImportGlobal) return html;
  const stylesheet = adaptor.innerHTML(
    documentOptions.OutputJax.styleSheet(mathDocument)
  );
  return `${html}<component is="style" from="mathjax">${stylesheet}</component>`;
};

const getDocumentOptions = (options: MathJaxOptions): DocumentOptions => {
  return {
    InputJax: new TeX<LiteElement, string, HTMLElement>({
      packages: AllPackages,
      ...options.tex,
    }),
    OutputJax:
      options.output === "chtml"
        ? new CHTML<LiteElement, string, HTMLElement>({
            // fontURL: createRequire(import.meta.url).resolve("mathjax-full"),
            fontURL:
              "http://fastly.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
            adaptiveCSS: false,
            ...options.chtml,
          })
        : new SVG<LiteElement, string, HTMLElement>({
            fontCache: "none",
            ...options.svg,
          }),
  };
};

export const getMathjaxStyle = (options: MathJaxOptions): string => {
  const adaptor = liteAdaptor();
  const documentOptions = getDocumentOptions(options);
  const html = MathJax.document("", documentOptions);
  return adaptor.innerHTML(documentOptions.OutputJax.styleSheet(html));
};

export const minifyMathJaxCssAfterPrepare = (app: App) => {
  const minifyCss = (content: string): string => {
    const stylesheets = content.match(
      /(?<=<component is="style" from="mathjax">).*?(?=<\/component>)/gms
    );
    if (stylesheets?.length) {
      const allStyles = stylesheets
        .map((e) => e.split("\n\n"))
        .flat()
        .map((e) => e.replace(/\n/g, ""));
      const styles = Array.from(new Set(allStyles));
      return (
        content.replace(
          /<component is="style" from="mathjax">.*?<\/component>/gms,
          ""
        ) + `<component is="style">${styles.join("")}</component>`
      );
    }
    return content;
  };

  const pagesWithMathJaxChtml = app.pages.filter((page) =>
    page.contentRendered.includes(`<component is="style" from="mathjax">`)
  );
  return Promise.all(
    pagesWithMathJaxChtml.map((page) => {
      page.contentRendered = minifyCss(page.contentRendered);
      return app.writeTemp(
        page.componentFilePath,
        `<template><div>${page.contentRendered}</div></template>`
      );
    })
  );
};

export const mathjax: PluginWithOptions<MathJaxOptions> = (
  md,
  options = {}
) => {
  md.use(tex, {
    render: (content, displayMode) =>
      renderMath(
        content,
        getDocumentOptions(options),
        displayMode,
        isImportGlobal(options)
      ),
  });
};
