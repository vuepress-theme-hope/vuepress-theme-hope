import { describe, it, expect } from "vitest";
import MarkdownIt = require("markdown-it");
import { tabs } from "../../src/node/markdown-it/tabs";

const markdownIt = MarkdownIt({ linkify: true }).use(tabs);

describe("tabs", () => {
  it("shoud render single block", () => {
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

  it("shoud render mutiple block", () => {
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

  it("shoud support id", () => {
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

  it("shoud support active", () => {
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

    expect(
      markdownIt.render(`
::: tabs

@tab js

A text

\`\`\`js
const a = 1;
\`\`\`

Another text

@tab:active ts

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
::: tabs
@tab js
A text
\`\`\`js
const a = 1;
\`\`\`
Another text
@tab:active ts
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
