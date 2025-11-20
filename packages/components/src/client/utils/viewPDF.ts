/**
 * Fork and edited from https://github.com/pipwerks/PDFObject/blob/master/pdfobject.js
 *
 * The MIT License (MIT)
 * Copyright © 2021 Philip Hutchison
 * https://pipwerks.mit-license.org/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  ensureEndingSlash,
  entries,
  isDef,
  isLinkHttp,
  isMobile,
  isSafari,
  isiPad,
} from "@vuepress/helper/client";
import { withBase } from "vuepress/client";

declare const PDFJS_URL: string | null;

const logError = (msg: string): void => {
  // eslint-disable-next-line no-console
  console.error(`[PDF]: ${msg}`);
};

const emptyNodeContents = (node: HTMLElement): void => {
  while (node.firstChild) node.firstChild.remove();
};

const getTargetElement = (
  targetSelector: string | HTMLElement | null,
): HTMLElement | null =>
  targetSelector instanceof HTMLElement
    ? targetSelector
    : targetSelector === "string"
      ? document.querySelector(targetSelector)
      : document.body;

// Create a fragment identifier for using PDF Open parameters when embedding PDF
const buildURLFragmentString = (
  options: Record<string, string | number | boolean>,
): string => {
  let url = entries(options)
    .map(([key, value]) =>
      key === "noToolbar"
        ? `toolbar=${value ? "0" : "1"}`
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  /*
   * The string will be empty if no PDF Params found
   * Remove last ampersand
   */
  if (url) url = `#${url.slice(0, -1)}`;

  return url;
};

export interface AddPDFViewerOptions {
  /**
   * URL of pdf
   */
  url: string;

  /**
   * Type of embed element
   */
  embedType: "iframe" | "embed" | "pdfjs";

  /**
   * Title of pdf
   */
  title?: string;

  /**
   * Options than will be appended to pdf url as fragment identifier
   */
  options?: Record<string, string | number | boolean>;
}

const addPDFViewer = (
  target: HTMLElement,
  {
    embedType,
    url,
    options = {},
    title = /\/([^/]+).pdf/.exec(url)?.[1] ?? "PDF Viewer",
  }: AddPDFViewerOptions,
): HTMLElement => {
  // Ensure target element is empty first
  emptyNodeContents(target);

  const source = `${
    embedType === "pdfjs"
      ? `${ensureEndingSlash(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          withBase(PDFJS_URL!),
        )}web/viewer.html?file=${encodeURIComponent(url)}`
      : url
  }${buildURLFragmentString(options)}`;

  const elementType =
    embedType === "pdfjs" || embedType === "iframe" ? "iframe" : "embed";
  const el = document.createElement(elementType);

  el.className = "pdf-viewer";
  // @ts-expect-error: Force override iframe type
  el.type = "application/pdf";
  el.title = title;
  el.src = source;

  if (el instanceof HTMLIFrameElement) el.allow = "fullscreen";

  target.classList.add("pdf-viewer-container");
  target.append(el);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return target.querySelector(elementType)!;
};

export interface ViewPDFOptions extends Omit<AddPDFViewerOptions, "embedType"> {
  /**
   * Force using PDFJS
   */
  pdfjs?: boolean;

  /**
   * Hint message when PDF cannot be displayed
   */
  hint?: string;
}

const DEFAULT_PDF_JS_HINT = "pdfjs url is not defined";

export const viewPDF = (
  targetSelector: string | HTMLElement | null,
  {
    url,
    title,
    hint = DEFAULT_PDF_JS_HINT,
    options = {},
    pdfjs,
  }: ViewPDFOptions,
): HTMLElement | null => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!isDef(window) || !window.navigator?.userAgent) return null;

  const { navigator } = window;
  const { userAgent } = navigator;

  // Time to jump through hoops -- browser vendors do not make it easy to detect PDF support.

  // Quick test for mobile devices.
  const isMobileDevice = isiPad() || isMobile();

  // Safari desktop requires special handling
  const isSafariDesktop = !isMobileDevice && isSafari();

  // Firefox started shipping PDF.js in Firefox 19. If this is Firefox 19 or greater, assume PDF.js is available
  const isFirefoxWithPDFJS =
    !isMobileDevice &&
    /firefox/iu.test(userAgent) &&
    userAgent.split("rv:").length > 1
      ? parseInt(userAgent.split("rv:")[1].split(".")[0], 10) > 18
      : false;

  // Determines whether PDF support is available
  const supportsPDFs = navigator.pdfViewerEnabled || isFirefoxWithPDFJS;

  const targetNode = getTargetElement(targetSelector);

  if (!targetNode) {
    logError("Target element cannot be determined");

    return null;
  }

  const fullLink = isLinkHttp(url)
    ? url
    : __VUEPRESS_DEV__
      ? null
      : `${window.origin}${url}`;

  if (pdfjs) {
    if (!fullLink) {
      logError("PDF link is not accessible via internet.");

      return null;
    }

    if (!PDFJS_URL) {
      targetNode.innerHTML = hint.replaceAll(String.raw`\[url\]`, fullLink);
      logError(DEFAULT_PDF_JS_HINT);

      return null;
    }

    return addPDFViewer(targetNode, {
      embedType: "pdfjs",
      url: fullLink,
      options,
      title,
    });
  }

  if (supportsPDFs || !isMobileDevice) {
    /*
     * There is an edge case where Safari does not respect 302 redirect requests for PDF files when using <embed> element.
     * Redirect appears to work fine when using <iframe> instead of <embed> (Addresses issue #210)
     * Forcing Safari desktop to use iframe due to freezing bug in macOS 11 (Big Sur)
     */
    const embedType = isSafariDesktop ? "iframe" : "embed";

    return addPDFViewer(targetNode, {
      embedType,
      url,
      options,
      title,
    });
  }

  if (PDFJS_URL && fullLink)
    return addPDFViewer(targetNode, {
      embedType: "pdfjs",
      url: fullLink,
      options,
      title,
    });

  targetNode.innerHTML = hint.replaceAll(String.raw`\[url\]`, url);

  logError("This browser does not support embedded PDFs");

  return null;
};
