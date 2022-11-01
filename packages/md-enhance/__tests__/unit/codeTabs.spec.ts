import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { codeTabs } from "../../src/node/markdown-it/index.js";

const markdownIt = MarkdownIt({ linkify: true }).use(codeTabs);

describe("code tabs", () => {
  it("Should render single block", () => {
    expect(
      markdownIt.render(`
::: code-tabs

@tab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
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
::: code-tabs

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
::: code-tabs
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

  it("Should support id", () => {
    expect(
      markdownIt.render(`
::: code-tabs#event

@tab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs#event-id
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs#id with space
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs # id starts and having space in the end
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
::: code-tabs

@tab:active js

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
@tab:active js
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs

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
::: code-tabs
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

  it("Should support value", () => {
    expect(
      markdownIt.render(`
::: code-tabs

@tab js#javascript

\`\`\`js
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
@tab:active js#javascript
\`\`\`js
const a = 1;
\`\`\`
:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs

@tab js#js

\`\`\`js
const a = 1;
\`\`\`

@tab:active ts #typescript

\`\`\`ts
const a = 1;
\`\`\`

:::
    `)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
::: code-tabs
@tab js # javascript
\`\`\`js
const a = 1;
\`\`\`
@tab:active ts #typescript
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
::: code-tabs
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
::: code-tabs

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
::: code-tabs
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
