import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { tabs } from "../../src/node/markdown-it/index.js";

const markdownIt = MarkdownIt({ linkify: true }).use(tabs);

describe("tabs", () => {
  it("Should render single block", () => {
    expect(
      markdownIt.render(`
::: tabs

@tab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: tabs
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();
  });

  it("Should render multiple block", () => {
    expect(
      markdownIt.render(`
::: tabs

@tab js

\`\`\`js
const a = 1;
\`\`\`

@tab ts

\`\`\`ts
const a = 1;
\`\`\`

:::
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: tabs
@tab js
\`\`\`js
const a = 1;
\`\`\`
@tab ts
\`\`\`ts
const a = 1;
\`\`\`
:::
`)
    ).toMatchSnapshot();
  });

  it("Should support tabs id", () => {
    expect(
      markdownIt.render(`
::: tabs#event

@tab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: tabs#event-id
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: tabs#id with space
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: tabs # id starts and having space in the end
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();
  });

  it("Should support active", () => {
    expect(
      markdownIt.render(`
::: tabs

@tab:active js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: tabs
@tab:active js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: tabs

@tab js

\`\`\`js
const a = 1;
\`\`\`

@tab:active ts

\`\`\`ts
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: tabs
@tab js
\`\`\`js
const a = 1;
\`\`\`
@tab:active ts
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
::: tabs

\`\`\`coffee
const a = 1;
\`\`\`

@tab:active js

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
::: tabs
\`\`\`coffee
const a = 1;
\`\`\`
@tab:active js
\`\`\`js
const a = 1;
\`\`\`
\`\`\`ts
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();
  });
});
