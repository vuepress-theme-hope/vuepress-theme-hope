import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { card } from "../../src/node/markdown-it/card.js";

describe("card", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(card);

  it("Should resolve card fence", () => {
    const result = markdownIt.render(
      `
\`\`\`card
title: A card
desc: A card desc
logo: https://example.com/logo.png
link: https://example.com
color: "#000"
\`\`\`
`,
      {},
    );

    expect(result).toContain("VPCard");
    expect(result).toMatchSnapshot();
  });

  it("Should resolve card:yaml fence", () => {
    const result = markdownIt.render(
      `
\`\`\`card:yaml
title: A card
desc: A card desc
logo: https://example.com/logo.png
link: https://example.com
color: "#000"
\`\`\`
`,
      {},
    );

    expect(result).toContain("VPCard");
    expect(result).toMatchSnapshot();
  });

  it("Should resolve card:yml fence", () => {
    const result = markdownIt.render(
      `
\`\`\`card:yml
title: A card
desc: A card desc
logo: https://example.com/logo.png
link: https://example.com
color: "#000"
\`\`\`
`,
      {},
    );

    expect(result).toContain("VPCard");
    expect(result).toMatchSnapshot();
  });

  it("Should resolve card:json fence", () => {
    const result = markdownIt.render(
      `
\`\`\`card:json
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

    expect(result).toContain("VPCard");
    expect(result).toMatchSnapshot();
  });

  it("Should drop unknown keys", () => {
    const result = markdownIt.render(
      `
\`\`\`card:json
{
  "title": "A card",
  "desc": "A card desc",
  "logo": "https://example.com/logo.png",
  "link": "https://example.com",
  "color": "#000",
  "unknown": "value"
}
\`\`\`
`,
      {},
    );

    expect(result).toContain("VPCard");
    expect(result).not.toContain("unknown");
    expect(result).not.toContain("value");
    expect(result).toMatchSnapshot();
  });

  it("Should drop invalid keys", () => {
    const result = markdownIt.render(
      `
\`\`\`card:json
{
  "title": "A card",
  "desc": "A card desc",
  "logo": 1
}
\`\`\`
`,
      {},
    );

    expect(result).toContain("VPCard");
    expect(result).not.toContain("logo");
    expect(result).toMatchSnapshot();
  });

  it("Should not throw with invalid syntax", () => {
    const result1 = markdownIt.render(
      `
\`\`\`card
title: a
title: b
\`\`\`
`,
      {},
    );

    const result2 = markdownIt.render(
      `
\`\`\`card:json
title: a
title: b
\`\`\`
`,
      {},
    );

    expect(result1).toEqual("");
    expect(result2).toEqual("");
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
