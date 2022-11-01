import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { footnote } from "../../src/node/markdown-it/index.js";

describe("footnote", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(footnote);

  it("Pandoc example", () => {
    expect(
      markdownIt.render(
        `
Here is a footnote reference,[^1] and another.[^long-note]

[^1]: Here is the footnote.

[^long-note]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

        { some.code }

    The whole paragraph can be indented, or just the first
    line.  In this way, multi-paragraph footnotes work like
    multi-paragraph list items.

This paragraph won’t be part of the note, because it
isn’t indented.
`,
        {}
      )
    ).toMatchSnapshot();
  });

  it("Should terminate each other", () => {
    expect(
      markdownIt.render(`
[^1][^2][^3]

[^1]: foo
[^2]: bar
[^3]: baz
`)
    ).toMatchSnapshot();
  });

  it("Can inside blockquotes, and are lazy", () => {
    expect(
      markdownIt.render(`
[^foo]

> [^foo]: bar
baz
`)
    ).toMatchSnapshot();
  });

  it("Label cannot contain spaces or newlines", () => {
    expect(
      markdownIt.render(`
[^ foo]: bar baz

[^foo
]: bar baz
`)
    ).toMatchSnapshot();
  });

  it("Nested footnotes", () => {
    expect(
      markdownIt.render(`
foo[^1] bar[^2].

[^1]:[^2]: baz
`)
    ).toMatchSnapshot();
  });

  it("Should support inline note", () => {
    expect(
      markdownIt.render(`
Here is an inline note.^[Inline notes are easier to write, since
you don’t have to pick an identifier and move down to type the
note.]
`)
    ).toMatchSnapshot();
  });

  it("Can have arbitrary markup", () => {
    expect(markdownIt.render(`foo^[ *bar* ]`)).toMatchSnapshot();
  });

  it("Duplicate footnotes should have suffix", () => {
    expect(
      markdownIt.render(`
[^xxxxx] [^xxxxx]

[^xxxxx]: foo
`)
    ).toMatchSnapshot();
  });

  it("Indent", () => {
    expect(
      markdownIt.render(`
[^xxxxx] [^yyyyy]

[^xxxxx]: foo
    ---

[^yyyyy]: foo
    ---
`)
    ).toMatchSnapshot();
  });

  it("Indents for the first line", () => {
    expect(
      markdownIt.render(`
[^xxxxx] [^yyyyy]

[^xxxxx]:       foo

[^yyyyy]:        foo
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
[^xxxxx]

[^xxxxx]:		foo
`)
    ).toMatchSnapshot();
  });

  it("Should contain Security", () => {
    expect(
      markdownIt.render(`
[^__proto__]

[^__proto__]: blah
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
[^hasOwnProperty]

[^hasOwnProperty]: blah
`)
    ).toMatchSnapshot();
  });

  it("Should allow links in inline footnotes", () => {
    expect(
      markdownIt.render(`Example^[this is another example https://github.com]`)
    ).toMatchSnapshot();
  });

  it("custom docId in env", () => {
    expect(
      markdownIt.render(
        `
Here is a footnote reference,[^1] and another.[^long-note]

[^1]: Here is the footnote.

[^long-note]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

        { some.code }

    The whole paragraph can be indented, or just the first
    line.  In this way, multi-paragraph footnotes work like
    multi-paragraph list items.

This paragraph won’t be part of the note, because it
isn’t indented.
`,
        { docId: "test-doc-id" }
      )
    ).toMatchSnapshot();
  });
});
