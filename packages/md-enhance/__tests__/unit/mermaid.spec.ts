import MarkdownIt = require("markdown-it");
import mermaid from "../../src/node/markdown-it/mermaid";

const demo = `flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one --> two
    three --> two
    two --> c2`;

describe("mermaid", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(mermaid);

  it("Should render ```mermaid", () => {
    const renderResult = markdownIt.render(`
\`\`\`mermaid
${demo}
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code=".*?"><\/Mermaid>/
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
\`\`\`md
${demo}
\`\`\`
`)
    ).toMatchSnapshot();
  });
});
