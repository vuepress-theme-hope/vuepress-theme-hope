import { describe, it, expect, vi } from "vitest";
import MarkdownIt from "markdown-it";
import { container } from "../../src/node/markdown-it/container";

describe("container", () => {
  it("renderer", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(container, {
      name: "spoiler",
      openRender: () => "<details><summary>click me</summary>\n",
      closeRender: () => "</details>\n",
    });

    expect(markdownIt.render("::: spoiler\n*content*\n:::\n")).toBe(
      "<details><summary>click me</summary>\n<p><em>content</em></p>\n</details>\n"
    );
  });

  it("2 char marker", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(container, {
      name: "spoiler",
      marker: "->",
    });

    expect(markdownIt.render("->->-> spoiler\n*content*\n->->->\n")).toBe(
      '<div class="spoiler">\n<p><em>content</em></p>\n</div>\n'
    );
  });

  it("marker should not collide with fence", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(container, {
      name: "spoiler",
      marker: "`",
    });

    expect(markdownIt.render("``` spoiler\n*content*\n```\n")).toBe(
      '<div class="spoiler">\n<p><em>content</em></p>\n</div>\n'
    );

    expect(markdownIt.render("\n``` not spoiler\n*content*\n```\n")).toBe(
      '<pre><code class="language-not">*content*\n</code></pre>\n'
    );
  });

  describe("validator", () => {
    it("should skip rule if return value is falsy", () => {
      const markdownIt = MarkdownIt({ linkify: true }).use(container, {
        name: "name",
        validate: () => false,
      });

      expect(markdownIt.render(":::foo\nbar\n:::\n")).toBe(
        "<p>:::foo\nbar\n:::</p>\n"
      );
    });

    it("should accept rule if return value is true", () => {
      const markdownIt = MarkdownIt({ linkify: true }).use(container, {
        name: "name",
        validate: () => true,
      });

      expect(markdownIt.render(":::foo\nbar\n:::\n")).toBe(
        '<div class="name">\n<p>bar</p>\n</div>\n'
      );
    });

    it("rule should call it", () => {
      const spy = vi.fn();
      const markdownIt = MarkdownIt({ linkify: true }).use(container, {
        name: "name",
        validate: spy,
      });

      markdownIt.parse(":\n::\n:::\n::::\n:::::\n", {});
      expect(spy).toBeCalledTimes(6);
    });

    it("should not trim params", () => {
      const markdownIt = MarkdownIt({ linkify: true }).use(container, {
        name: "name",
        validate: (params) => {
          expect(params).toBe(" \tname ");

          return true;
        },
      });

      markdownIt.parse("::: \tname \ncontent\n:::\n", {});
    });

    it("should allow analyze mark", () => {
      const markdownIt = MarkdownIt({ linkify: true }).use(container, {
        name: "name",
        validate: (_, mark) => {
          return mark.length >= 4;
        },
      });

      expect(markdownIt.render(":::\nfoo\n:::\n")).toBe(
        "<p>:::\nfoo\n:::</p>\n"
      );

      expect(markdownIt.render("::::\nfoo\n::::\n")).toBe(
        '<div class="name">\n<p>foo</p>\n</div>\n'
      );
    });
  });
});
