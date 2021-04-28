import MarkdownIt = require("markdown-it");
import presentation from "../../src/node/markdown-it/presentation";

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
      /<Presentation id="presentation-.*?" data-code=".*?" theme=".*?"><\/Presentation>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Shoud not render", () => {
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
