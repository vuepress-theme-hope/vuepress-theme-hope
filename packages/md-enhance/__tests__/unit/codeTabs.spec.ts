import { describe, it, expect } from "vitest";
import MarkdownIt = require("markdown-it");
import { codeTabs } from "../../src/node/markdown-it/codeTabs";

const markdownIt = MarkdownIt({ linkify: true }).use(codeTabs);

describe("code tabs", () => {
  it("shoud render single block", () => {
    expect(
      markdownIt.render(`
::: code-tabs

@codetab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
@codetab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();
  });

  it("shoud render mutiple block", () => {
    expect(
      markdownIt.render(`
::: code-tabs

@codetab js

\`\`\`js
const a = 1;
\`\`\`

@codetab ts

\`\`\`ts
const a = 1;
\`\`\`

:::
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
@codetab js
\`\`\`js
const a = 1;
\`\`\`
@codetab ts
\`\`\`ts
const a = 1;
\`\`\`
:::
`)
    ).toMatchSnapshot();
  });

  it("shoud support active", () => {
    expect(
      markdownIt.render(`
::: code-tabs

@codetab:active js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
@codetab:active js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs

@codetab js

\`\`\`js
const a = 1;
\`\`\`

@codetab:active ts

\`\`\`ts
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
@codetab js
\`\`\`js
const a = 1;
\`\`\`
@codetab:active ts
\`\`\`ts
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();
  });

  it("should ignore other items", () => {
    expect(
      markdownIt.render(`
::: code-tabs

\`\`\`coffee
const a = 1;
\`\`\`

@codetab:active js

\`\`\`js
const a = 1;
\`\`\`

\`\`\`ts
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
\`\`\`coffee
const a = 1;
\`\`\`
@codetab:active js
\`\`\`js
const a = 1;
\`\`\`
\`\`\`ts
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs

@codetab js

A text

\`\`\`js
const a = 1;
\`\`\`

Another text

@codetab:active ts

Another text again

\`\`\`ts
const a = 1;
\`\`\`

Another text again

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
@codetab js
A text
\`\`\`js
const a = 1;
\`\`\`
Another text
@codetab:active ts
Another text again
\`\`\`ts
const a = 1;
\`\`\`
Another text again
:::
    `)
    ).toMatchSnapshot();
  });
});
