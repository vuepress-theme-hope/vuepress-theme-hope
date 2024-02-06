import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { hint } from "../../src/node/markdown-it/hint.js";

describe("hint", () => {
  describe("with options", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(hint, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "/": {
        info: "Info",
        note: "Note",
        tip: "Tips",
        warning: "Warning",
        caution: "Caution",
        details: "Details",
      },
    });

    it("should generate tip block", () => {
      expect(markdownIt.render("::: tip\n*content*\n:::\n")).toBe(
        '<div class="hint-container tip">\n<p class="hint-container-title">Tips</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: tip Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container tip">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate warning block", () => {
      expect(markdownIt.render("::: warning\n*content*\n:::\n")).toBe(
        '<div class="hint-container warning">\n<p class="hint-container-title">Warning</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: warning Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container warning">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate danger block", () => {
      expect(markdownIt.render("::: caution\n*content*\n:::\n")).toBe(
        '<div class="hint-container caution">\n<p class="hint-container-title">Caution</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: caution Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container caution">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate info block", () => {
      expect(markdownIt.render("::: info\n*content*\n:::\n")).toBe(
        '<div class="hint-container info">\n<p class="hint-container-title">Info</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: info Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container info">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate note block", () => {
      expect(markdownIt.render("::: note\n*content*\n:::\n")).toBe(
        '<div class="hint-container note">\n<p class="hint-container-title">Note</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: note Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container note">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate details block", () => {
      expect(markdownIt.render("::: details\n*content*\n:::\n")).toBe(
        '<details class="hint-container details"><summary>Details</summary>\n<p><em>content</em></p>\n</details>\n',
      );
    });
  });

  describe("without options", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(hint);

    it("should generate tip block", () => {
      expect(markdownIt.render("::: tip\n*content*\n:::\n")).toBe(
        '<div class="hint-container tip">\n<p class="hint-container-title">tip</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: tip Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container tip">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate warning block", () => {
      expect(markdownIt.render("::: warning\n*content*\n:::\n")).toBe(
        '<div class="hint-container warning">\n<p class="hint-container-title">warning</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: warning Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container warning">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate caution block", () => {
      expect(markdownIt.render("::: caution\n*content*\n:::\n")).toBe(
        '<div class="hint-container caution">\n<p class="hint-container-title">caution</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: caution Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container caution">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate info block", () => {
      expect(markdownIt.render("::: info\n*content*\n:::\n")).toBe(
        '<div class="hint-container info">\n<p class="hint-container-title">info</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: info Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container info">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate note block", () => {
      expect(markdownIt.render("::: note\n*content*\n:::\n")).toBe(
        '<div class="hint-container note">\n<p class="hint-container-title">note</p>\n<p><em>content</em></p>\n</div>\n',
      );

      expect(markdownIt.render("::: note Title\n*content*\n:::\n")).toBe(
        '<div class="hint-container note">\n<p class="hint-container-title">Title</p>\n<p><em>content</em></p>\n</div>\n',
      );
    });

    it("should generate details block without options", () => {
      expect(markdownIt.render("::: details\n*content*\n:::\n")).toBe(
        '<details class="hint-container details"><summary>Details</summary>\n<p><em>content</em></p>\n</details>\n',
      );
    });
  });
});
