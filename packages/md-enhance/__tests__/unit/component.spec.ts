import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { component } from "../../src/node/markdown-it/component.js";

describe("component", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(component);

  it("Should resolve component fence", () => {
    const result1 = markdownIt.render(
      `
\`\`\`component VPCard
title: A card
desc: A card desc
logo: https://example.com/logo.png
link: https://example.com
color: "#000"
\`\`\`
`,
      {},
    );

    const result2 = markdownIt.render(
      `
\`\`\`component VPCard
{
  "title": "A card",
  "desc": "A card desc",
  "logo": "https://example.com/logo.png",
  "link": "https://example.com",
  "color": "#000"
}
\`\`\`
`,
      {},
    );

    expect(result1).toContain("VPCard");
    expect(result1).toMatchSnapshot();
    expect(result2).toContain("VPCard");
    expect(result2).toMatchSnapshot();
  });

  it("Should not throw with invalid syntax", () => {
    const result1 = markdownIt.render(
      `
\`\`\`component VPCard
title: a
title: b
\`\`\`
`,
      {},
    );

    const result2 = markdownIt.render(
      `
\`\`\`component VPCard
title: a
title: b
\`\`\`
`,
      {},
    );

    expect(result1).toEqual("");
    expect(result2).toEqual("");
  });

  it("Should drop when receiving a invalid syntax", () => {
    const result = markdownIt.render(
      `
\`\`\`component VPCard
{a:1}
\`\`\`
`,
      {},
    );

    expect(result).toMatch("");
  });

  it("Should not break markdown fence", () => {
    const result = markdownIt.render(
      `
\`\`\`js
const a = 1;
\`\`\`
`,
      {},
    );

    expect(result).toMatch(/<pre.*>[\s\S]*<\/pre>/);
    expect(result).toMatchSnapshot();
  });
});
