import { describe, expect, it } from "vitest";

import { md2text } from "../../src/node/markdown/md2text.js";

describe("md2text", () => {
  it("Should remove code blocks", () => {
    expect(
      md2text(`\
\`\`\`js
const a = 1;
\`\`\`
`),
    ).toEqual("");

    expect(
      md2text(`\
\`\`\`js {1-3}
const a = 1;

console.log(a)
\`\`\`
`),
    ).toEqual("");

    expect(
      md2text(`\
\`\`\`
Plain text.
\`\`\`
`),
    ).toEqual("");

    expect(
      md2text(`\
\`\`\`\`md
\`\`\`js {1-3}
const a = 1;

console.log(a)
\`\`\`

\`\`\`
Plain text.
\`\`\`
\`\`\`\`
`),
    ).toEqual("");
  });

  it("Should remove custom container markers", () => {
    expect(
      md2text(`\
::: tip
This is a tip.
:::
`),
    ).toEqual("This is a tip.");

    expect(
      md2text(`\
::: tip A tip
This is a tip.
:::
`),
    ).toEqual(`\
A tip
This is a tip.\
`);

    expect(
      md2text(`\
:::: tip A tip
This is a tip.

::: info
Some information.
:::
::::
`),
    ).toEqual(`\
A tip
This is a tip.
Some information.\
`);
  });

  it("Should remove footnote reference", () => {
    expect(
      md2text(`\
This is a footnote reference,[^1] and another.[^long-note]
`),
    ).toEqual(`\
This is a footnote reference, and another.\
`);

    expect(
      md2text(`\
[^1]: Some footnote.
`),
    ).toEqual("");
  });

  it("Should remove strikethrough words", () => {
    expect(
      md2text(`\
This is a paragraph with ~ markers with ~~d~~ and ~~some words~~ deleted.
`),
    ).toEqual(`\
This is a paragraph with ~ markers with  and  deleted.\
`);

    expect(
      md2text(`\
[^1]: Some footnote.
`),
    ).toEqual("");
  });

  it("Should handle headings", () => {
    expect(md2text("# Hello World")).toEqual("Hello World");
    expect(md2text("## Hello World")).toEqual("Hello World");
    expect(md2text("### Hello World")).toEqual("Hello World");
    expect(md2text("#### Hello World")).toEqual("Hello World");
    expect(md2text("##### Hello World")).toEqual("Hello World");
    expect(md2text("###### Hello World")).toEqual("Hello World");
  });

  it("Should handle paragraphs", () => {
    expect(md2text("Hello World")).toEqual("Hello World");
    expect(
      md2text(`\
Hello World!

Greetings with everyone.\
`),
    ).toEqual(`\
Hello World!
Greetings with everyone.\
`);
  });

  it("Should handle unordered lists", () => {
    expect(
      md2text(`
- Item 1
- Item 2\
`),
    ).toEqual(`\
Item 1;
Item 2;\
`);

    expect(
      md2text(`
- Item 1

- Item 2\
`),
    ).toEqual(`\
Item 1;
Item 2;\
`);

    expect(
      md2text(`
- Item 1

- Item 2
  - subitem a
  - subitem b
\
`),
    ).toEqual(`\
Item 1;
Item 2;
subitem a;
subitem b;\
`);
  });

  it("Should preserve ordered lists", () => {
    expect(
      md2text(`
1. Item 1
2. Item 2
`),
    ).toEqual(`\
1. Item 1
2. Item 2\
`);

    expect(
      md2text(`
1. Item 1

2. Item 2
`),
    ).toEqual(`\
1. Item 1
2. Item 2\
`);
  });

  it("Should handle blockquotes", () => {
    expect(md2text("> Hello World")).toEqual("Hello World");
    expect(
      md2text(`\
> Hello World!
>
> > Greetings with everyone.\
`),
    ).toEqual(`\
Hello World!
Greetings with everyone.\
`);
  });

  it("Should convert images to alt text", () => {
    expect(
      md2text(`\
![alt text](https://example.com/image.png)\
`),
    ).toEqual("alt text");

    expect(
      md2text(`\
![](https://example.com/image.png)\
`),
    ).toEqual("");
  });

  it("Should convert bold and italics to raw text", () => {
    expect(
      md2text(`\
**Bold text**
__Bold text__
*Italic text*
_Italic text_
`),
    ).toEqual(`\
Bold text
Bold text
Italic text
Italic text\
`);
  });

  it("Should convert inline code to raw text", () => {
    expect(
      md2text(`\
\`Inline code\`
Text with \`inline code\` in it.
Text with advanced \`\` inline code marker \` \`\` in it.
`),
    ).toEqual(`\
Inline code
Text with inline code in it.
Text with advanced  inline code marker \`  in it.\
`);
  });

  it("Should convert link to text with link", () => {
    expect(
      md2text(`\
[Link text](https://example.com)
Some text with [link text](https://example.com) in it.
`),
    ).toEqual(`\
Link text (https://example.com)
Some text with link text (https://example.com) in it.\
`);
  });
});
