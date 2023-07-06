import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

describe("autolink", () => {
  const markdownIt = MarkdownIt();

  markdownIt.options.linkify = true;

  it("Should resolve bare link", () => {
    expect(markdownIt.render(`https://example.com`)).toBe(
      '<p><a href="https://example.com">https://example.com</a></p>\n',
    );

    expect(markdownIt.render(`https://example.com/a/`)).toBe(
      '<p><a href="https://example.com/a/">https://example.com/a/</a></p>\n',
    );

    expect(markdownIt.render(`https://example.com/a/b.html`)).toBe(
      '<p><a href="https://example.com/a/b.html">https://example.com/a/b.html</a></p>\n',
    );

    expect(
      markdownIt.render(`
https://example.com
`),
    ).toBe('<p><a href="https://example.com">https://example.com</a></p>\n');

    expect(
      markdownIt.render(`
https://example.com/a/
`),
    ).toBe(
      '<p><a href="https://example.com/a/">https://example.com/a/</a></p>\n',
    );

    expect(
      markdownIt.render(`
https://example.com/a/b.html
`),
    ).toBe(
      '<p><a href="https://example.com/a/b.html">https://example.com/a/b.html</a></p>\n',
    );
  });

  it("Should resolve auto link", () => {
    expect(markdownIt.render(`<https://example.com>`)).toBe(
      '<p><a href="https://example.com">https://example.com</a></p>\n',
    );

    expect(markdownIt.render(`<https://example.com/a/>`)).toBe(
      '<p><a href="https://example.com/a/">https://example.com/a/</a></p>\n',
    );

    expect(markdownIt.render(`<https://example.com/a/b.html>`)).toBe(
      '<p><a href="https://example.com/a/b.html">https://example.com/a/b.html</a></p>\n',
    );

    expect(
      markdownIt.render(`
<https://example.com>
`),
    ).toBe('<p><a href="https://example.com">https://example.com</a></p>\n');

    expect(
      markdownIt.render(`
<https://example.com/a/>
`),
    ).toBe(
      '<p><a href="https://example.com/a/">https://example.com/a/</a></p>\n',
    );

    expect(
      markdownIt.render(`
<https://example.com/a/b.html>
`),
    ).toBe(
      '<p><a href="https://example.com/a/b.html">https://example.com/a/b.html</a></p>\n',
    );
  });

  it("Should resolve bare link in text", () => {
    expect(
      markdownIt.render(`Please open https://example.com for more details`),
    ).toBe(
      '<p>Please open <a href="https://example.com">https://example.com</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(`Please open https://example.com/a/ for more details`),
    ).toBe(
      '<p>Please open <a href="https://example.com/a/">https://example.com/a/</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(
        `Please open https://example.com/a/b.html for more details`,
      ),
    ).toBe(
      '<p>Please open <a href="https://example.com/a/b.html">https://example.com/a/b.html</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(`
Please open https://example.com for more details
`),
    ).toBe(
      '<p>Please open <a href="https://example.com">https://example.com</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(`
Please open https://example.com/a/ for more details
`),
    ).toBe(
      '<p>Please open <a href="https://example.com/a/">https://example.com/a/</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(
        `
Please open https://example.com/a/b.html for more details
`,
      ),
    ).toBe(
      '<p>Please open <a href="https://example.com/a/b.html">https://example.com/a/b.html</a> for more details</p>\n',
    );
  });

  it("Should resolve auto link in text", () => {
    expect(
      markdownIt.render(`Please open <https://example.com> for more details`),
    ).toBe(
      '<p>Please open <a href="https://example.com">https://example.com</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(
        `Please open <https://example.com/a/> for more details`,
      ),
    ).toBe(
      '<p>Please open <a href="https://example.com/a/">https://example.com/a/</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(
        `Please open <https://example.com/a/b.html> for more details`,
      ),
    ).toBe(
      '<p>Please open <a href="https://example.com/a/b.html">https://example.com/a/b.html</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(`
Please open <https://example.com> for more details
`),
    ).toBe(
      '<p>Please open <a href="https://example.com">https://example.com</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(`
Please open <https://example.com/a/> for more details
`),
    ).toBe(
      '<p>Please open <a href="https://example.com/a/">https://example.com/a/</a> for more details</p>\n',
    );

    expect(
      markdownIt.render(
        `
Please open <https://example.com/a/b.html> for more details
`,
      ),
    ).toBe(
      '<p>Please open <a href="https://example.com/a/b.html">https://example.com/a/b.html</a> for more details</p>\n',
    );
  });
});
