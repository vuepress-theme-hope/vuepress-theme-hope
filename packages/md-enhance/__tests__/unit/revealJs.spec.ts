import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { revealJs } from "../../src/node/markdown-it/revealjs.js";

const demo = `
## Slide 1

A paragraph with some text and a [link](https://mister-hope.com)

---

## Slide 2

- Item 1
- Item 2

---

## Slide 3.1

\`\`\`js
const a = 1;
\`\`\`

--

## Slide 3.2

$$
J(\\theta_0,\\theta_1) = \\sum_{i=0}
$$
`;

describe("revealJs", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(revealJs);

  it("Should render", () => {
    const renderResult = markdownIt.render(`
@slidestart
${demo}
@slideend
`);

    expect(renderResult).toMatch(
      /<RevealJs id="revealjs-.*?" code=".*?" theme=".*?"><\/RevealJs>/,
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Should not render", () => {
    expect(
      markdownIt.render(`
${demo}
`),
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
@slidestar
${demo}
@slideend
`),
    ).toMatchSnapshot();
  });
});
