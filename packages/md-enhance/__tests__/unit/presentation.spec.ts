import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { presentation } from "../../src/node/markdown-it/index.js";

const demo = `
## Slide 1

A paragraph with some text and a [link](https://mrhope.site)

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

describe("presentation", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(presentation);

  it("Should render", () => {
    const renderResult = markdownIt.render(`
@slidestart
${demo}
@slideend
`);

    expect(renderResult).toMatch(
      /<Presentation id="presentation-.*?" code=".*?" theme=".*?"><\/Presentation>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Should not render", () => {
    expect(
      markdownIt.render(`
${demo}
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
@slidestar
${demo}
@slideend
`)
    ).toMatchSnapshot();
  });
});
