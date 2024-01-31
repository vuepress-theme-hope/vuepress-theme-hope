import { decodeData } from "@vuepress/helper";
import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { markmap } from "../../src/node/markdown-it/markmap.js";

const content = `\
---
markmap:
  colorFreezeLevel: 2
---

# markmap

## Links

- <https://markmap.js.org/>
- [GitHub](https://github.com/markmap/markmap)

## Features

- links
- **strong** ~~del~~ *italic* ==highlight==
- multiline
  text
- \`inline code\`
-
    \`\`\`js
    const a = 1;
    \`\`\`
- Katex
  - $x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$
- Now we can wrap very very very very long text based on \`maxWidth\` option
`;

describe("markmap plugin", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(markmap);

  it("Should render ```markmap", () => {
    const renderResult = markdownIt.render(`
\`\`\`\`markmap
${content}
\`\`\`\`
`);

    expect(renderResult).toMatch(
      /<MarkMap id="markmap-\d+" content=".*?"><\/MarkMap>/,
    );
    expect(
      decodeData(
        /<MarkMap id="markmap-\d+" content="(.*?)"><\/MarkMap>/.exec(
          renderResult,
        )?.[1] || "",
      ),
    ).toMatch(content);
    expect(renderResult).toMatchSnapshot();
  });

  it("Should not render", () => {
    expect(
      markdownIt.render(`
${content}
`),
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
\`\`\`md
${content}
\`\`\`
`),
    ).toMatchSnapshot();
  });
});
