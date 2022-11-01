import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { tasklist } from "../../src/node/markdown-it/index.js";

describe("Task list", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(tasklist);

  it("Should render", () => {
    expect(
      markdownIt.render(`
- [ ] unchecked item 1
- [ ] unchecked item 2
- [ ] unchecked item 3
- [x] checked item 4
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
-   [ ] unchecked todo item 1
-   [x] todo item 2
`)
    ).toMatchSnapshot();
  });

  it("Should render nested list", () => {
    expect(
      markdownIt.render(`
1. foo
   * [ ] nested unchecked item 1
   * not a todo item 2
   * not a todo item 3
   * [x] nested checked item 4
2. bar
3. spam
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
- foo
  - [ ] nested unchecked item 1
  - [ ] nested unchecked item 2
  - [x] nested checked item 3
  - [X] nested checked item 4
`)
    ).toMatchSnapshot();
  });

  it("Should render ordered list", () => {
    expect(
      markdownIt.render(`
1. [x] checked ordered 1
2. [ ] unchecked ordered 2
3. [x] checked ordered 3
4. [ ] unchecked ordered 4
`)
    ).toMatchSnapshot();
  });

  it("Should not render", () => {
    expect(
      markdownIt.render(`
- [ ]
- [  ] not a todo item 2
- [ x] not a todo item 3
- [x ] not a todo item 4
- [ x ] not a todo item 5
`)
    ).toMatchSnapshot();
  });

  it("Should not render label", () => {
    const markdownItWithOutLabel = MarkdownIt({ linkify: true }).use(tasklist, {
      label: false,
    });

    expect(
      markdownItWithOutLabel.render(`
- [ ] unchecked item 1
- [ ] unchecked item 2
- [ ] unchecked item 3
- [x] checked item 4
`)
    ).toMatchSnapshot();
  });

  it("Should increase id", () => {
    const markdownItWithOutLabel = MarkdownIt({ linkify: true }).use(tasklist, {
      label: false,
    });

    expect(
      markdownItWithOutLabel.render(`
- [ ] unchecked item 1
- [ ] unchecked item 2
- [ ] unchecked item 3
- [x] checked item 4

Some content

- [ ] unchecked item 1
- [ ] unchecked item 2
- [ ] unchecked item 3
- [x] checked item 4
  - [ ] unchecked item 1
  - [ ] unchecked item 2
  - [ ] unchecked item 3
  - [x] checked item 4
`)
    ).toMatchSnapshot();
  });

  it("Should render with items containing other markdown syntax", () => {
    const markdownItWithOutLabel = MarkdownIt({ linkify: true }).use(tasklist, {
      label: false,
    });

    expect(
      markdownItWithOutLabel.render(`
- [ ] unchecked [link](https://example.com)
- [ ] unchecked **item 2**
- [ ] _unchecked_ item 3
- [x] ~~checked item 4~~
`)
    ).toMatchSnapshot();
  });
});
