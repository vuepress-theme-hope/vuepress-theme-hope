import MarkdownIt = require("markdown-it");
import katex from "../../src/node/markdown-it/katex";

const markdownIt = MarkdownIt({ linkify: true }).use(katex);
const markdownItWithError = MarkdownIt({ linkify: true }).use(katex, {
  throwOnError: true,
});

describe("inline katex", () => {
  it("Shoud render", () => {
    expect(markdownIt.render(`$a=1$`)).toMatchSnapshot();
  });

  it("Should not render when escape", () => {
    expect(markdownIt.render("$a = 1\\$")).toEqual("<p>$a = 1$</p>\n");
    expect(markdownIt.render("\\$a = 1$")).toEqual("<p>$a = 1$</p>\n");
  });

  it("Should not render when having spaces", () => {
    expect(markdownIt.render(`$ a = 1 $`)).toEqual("<p>$ a = 1 $</p>\n");
  });

  it("Should not render when the ending tag is followed by number", () => {
    expect(markdownIt.render(`Of course $1 = $1`)).toEqual(
      "<p>Of course $1 = $1</p>\n"
    );
  });

  it("Should render when the first one is after a charater", () => {
    expect(markdownIt.render(`The next$a = 1$ won't work`)).toMatchSnapshot();
  });

  it("Should not render error msg when content is wrong", () => {
    expect(markdownIt.render("$\\fra{a}{b}$")).toMatchSnapshot();
  });

  it("Should render error msg when content is wrong", () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalWarn = global.console.warn;
    global.console.warn = jest.fn();

    expect(markdownItWithError.render("$\\fra{a}{b}$")).toEqual(
      "<p><span class='katex-error' title='ParseError: KaTeX parse error: Undefined control sequence: \\fra at position 1: \\̲f̲r̲a̲{a}{b}'>\\fra{a}{b}</span></p>\n"
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.console.warn).toHaveBeenCalledTimes(1);
    global.console.warn = originalWarn;
  });
});

describe("block katex", () => {
  it("Shoud render", () => {
    expect(markdownIt.render(`$$a=1$$`)).toMatchSnapshot();
    expect(
      markdownIt.render(`
$$
a = 1
$$
`)
    ).toMatchSnapshot();
  });

  it("Should not render when escape", () => {
    expect(markdownIt.render("\\$\\$a = 1$$")).toEqual("<p>$$a = 1$$</p>\n");
    expect(
      markdownIt.render(`
\\$\\$
a = 1
\\$\\$
`)
    ).toEqual(`<p>$$
a = 1
$$</p>\n`);
  });

  it("Should render when having spaces", () => {
    expect(markdownIt.render(`$$ a = 1 $$`)).toMatchSnapshot();

    expect(markdownIt.render(`All $$ a = 1 $$ is true.`)).toEqual(
      "<p>All $$ a = 1 $$ is true.</p>\n"
    );
  });

  it("Should not render error msg when content is wrong", () => {
    expect(markdownIt.render("$$\\fra{a}{b}$$")).toMatchSnapshot();
    expect(
      markdownIt.render(`
$$
\\fra{a}{b}
$$
`)
    ).toMatchSnapshot();
  });

  it("Should render error msg when content is wrong", () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalWarn = global.console.warn;
    global.console.warn = jest.fn();
    expect(markdownItWithError.render("$$\\fra{a}{b}$$")).toMatch(
      /<p class='katex-block katex-error' title='[\s\S]*?'>[\s\S]*?<\/p>/
    );

    expect(
      markdownItWithError.render(`
$$
\\fra{a}{b}
$$
`)
    ).toMatch(
      /<p class='katex-block katex-error' title='[\s\S]*?'>[\s\S]*?<\/p>/
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.console.warn).toHaveBeenCalledTimes(2);
    global.console.warn = originalWarn;
  });
});
