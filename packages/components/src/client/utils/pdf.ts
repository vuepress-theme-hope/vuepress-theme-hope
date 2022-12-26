import { withBase } from "@vuepress/client";
import { checkIsMobile, checkIsSafari } from "vuepress-shared/client";

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

const PDFJS_URL = "/assets/lib/pdfjs/web/viewer.html";

export interface Options {
  title: string;
  options: Record<string, string | number | boolean> | undefined;
}

const logError = (msg: string): void => {
  console.error("[PDF]: " + msg);
};

const emptyNodeContents = (node: HTMLElement): void => {
  while (node.firstChild) node.removeChild(node.firstChild);
};

const getTargetElement = (
  targetSelector: string | HTMLElement | null
): HTMLElement | null =>
  targetSelector === "string"
    ? document.querySelector(targetSelector)
    : targetSelector instanceof HTMLElement
    ? targetSelector
    : document.body;

// Create a fragment identifier for using PDF Open parameters when embedding PDF
const buildURLFragmentString = (
  options: Record<string, string | number | boolean>
): string => {
  let url = "";

  if (options) {
    url += Object.entries(options)
      .map(([key, value]) =>
        key === "noToolbar"
          ? `toolbar=${value ? 0 : 1}`
          : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    // The string will be empty if no PDF Params found
    if (url) {
      url = "#" + url;

      // Remove last ampersand
      url = url.slice(0, url.length - 1);
    }
  }

  return url;
};

const addPDFViewer = (
  embedType: "iframe" | "embed" | "pdfjs",
  targetNode: HTMLElement,
  url: string,
  options: Record<string, string | number | boolean>,
  title: string
): HTMLElement => {
  // Ensure target element is empty first
  emptyNodeContents(targetNode);

  let source = url;

  if (embedType === "pdfjs") {
    source =
      withBase(PDFJS_URL) +
      "?" +
      "file=" +
      encodeURIComponent(url) + // Stringify optional Adobe params for opening document (as fragment identifier)
      buildURLFragmentString(options);
  }

  const elementType =
    embedType === "pdfjs" || embedType === "iframe" ? "iframe" : "embed";
  const el = document.createElement(elementType);

  el.className = "pdf-viewer";
  // @ts-ignore
  el.type = "application/pdf";
  el.title = title;
  el.src = source;

  if (el instanceof HTMLIFrameElement) el.allow = "fullscreen";

  targetNode.classList.add("pdf-viewer-container");
  targetNode.appendChild(el);

  return targetNode.getElementsByTagName(elementType)[0];
};

export const viewPDF = (
  url: string,
  targetSelector: string | HTMLElement | null = null,
  { title, options = {} }: Options
): HTMLElement | null => {
  if (
    typeof window === "undefined" ||
    window.navigator === undefined ||
    window.navigator.userAgent === undefined ||
    window.navigator.mimeTypes === undefined
  )
    return null;

  const nav = window.navigator;
  const ua = window.navigator.userAgent;

  // Time to jump through hoops -- browser vendors do not make it easy to detect PDF support.

  /*
   * There is a coincidental correlation between implementation of window.promises and native PDF support in desktop browsers
   * We use this to assume if the browser supports promises it supports embedded PDFs
   * Is this fragile? Sort of. But browser vendors removed mimetype detection, so we're left to improvise
   */
  const isModernBrowser = window.Promise !== undefined;

  // Safari on iPadOS doesn't report as 'mobile' when requesting desktop site, yet still fails to embed PDFs
  const isSafariIOSDesktopMode =
    nav.platform !== undefined &&
    nav.platform === "MacIntel" &&
    nav.maxTouchPoints !== undefined &&
    nav.maxTouchPoints > 1;

  // Quick test for mobile devices.
  const isMobileDevice = isSafariIOSDesktopMode || checkIsMobile(ua);

  // Safari desktop requires special handling
  const isSafariDesktop = !isMobileDevice && checkIsSafari(ua);

  // Firefox started shipping PDF.js in Firefox 19. If this is Firefox 19 or greater, assume PDF.js is available
  const isFirefoxWithPDFJS =
    !isMobileDevice && /irefox/.test(ua) && ua.split("rv:").length > 1
      ? parseInt(ua.split("rv:")[1].split(".")[0], 10) > 18
      : false;

  // Determines whether PDF support is available
  const supportsPDFs =
    // As of Sept 2020 no mobile browsers properly support PDF embeds
    !isMobileDevice &&
    // We're moving into the age of MIME-less browsers. They mostly all support PDF rendering without plugins.
    (isModernBrowser ||
      // Modern versions of Firefox come bundled with PDFJS
      isFirefoxWithPDFJS);

  if (typeof url !== "string") {
    logError("URL is not valid");

    return null;
  }

  const targetNode = getTargetElement(targetSelector);

  if (!targetNode) {
    logError("Target element cannot be determined");

    return null;
  }

  const pdfTitle = title || /\/([^/]+).pdf/.exec(url)?.[1] || "PDF Viewer";

  if (supportsPDFs || !isMobileDevice) {
    // There is an edge case where Safari does not respect 302 redirect requests for PDF files when using <embed> element.
    // Redirect appears to work fine when using <iframe> instead of <embed> (Addresses issue #210)
    // Forcing Safari desktop to use iframe due to freezing bug in macOS 11 (Big Sur)
    const embedType = isSafariDesktop ? "iframe" : "embed";

    return addPDFViewer(embedType, targetNode, url, options, pdfTitle);
  }

  return addPDFViewer("pdfjs", targetNode, url, options, pdfTitle);
};
