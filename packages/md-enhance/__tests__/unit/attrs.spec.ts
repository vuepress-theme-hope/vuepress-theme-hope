import { describe, it, expect, vi } from "vitest";
import { createMarkdown } from "@vuepress/markdown";
import MarkdownIt from "markdown-it";
import { attrs, getAttrs } from "../../src/node/markdown-it/attrs";

import type { AttrsOptions } from "../../src/shared";

const replaceDelimiters = (
  text: string,
  options: Required<AttrsOptions>
): string => text.replace(/{/g, options.left).replace(/}/g, options.right);

describe("markdown-it-attrs", () => {
  it("should not throw when getting only allowed option", () => {
    const markdownIt = MarkdownIt().use(attrs, {
      allowed: [/^(class|attr)$/],
    });

    expect(markdownIt.render("text {.someclass #someid attr=allowed}")).toBe(
      '<p class="someclass" attr="allowed">text</p>\n'
    );
  });
});

const describeTestsWithOptions = (
  options: Required<AttrsOptions>,
  postText: string
): void => {
  describe("markdown-it-attrs.utils" + postText, () => {
    it(
      replaceDelimiters(
        "should parse {.class ..css-module #id key=val .class.with.dot}",
        options
      ),
      () => {
        const src = "{.red ..mod #head key=val .class.with.dot}";
        const expected = [
          ["class", "red"],
          ["css-module", "mod"],
          ["id", "head"],
          ["key", "val"],
          ["class", "class.with.dot"],
        ];

        expect(getAttrs(replaceDelimiters(src, options), 0, options)).toEqual(
          expected
        );
      }
    );

    it(
      replaceDelimiters("should parse attributes with = {attr=/id=1}", options),
      () => {
        const src = "{link=/some/page/in/app/id=1}";
        const expected = [["link", "/some/page/in/app/id=1"]];

        expect(getAttrs(replaceDelimiters(src, options), 0, options)).toEqual(
          expected
        );
      }
    );
  });

  describe("markdown-it-attrs" + postText, () => {
    const markdownIt = MarkdownIt().use(attrs, options);

    it(
      replaceDelimiters(
        "should add attributes when {} in end of last inline",
        options
      ),
      () => {
        const src = "some text {with=attrs}";
        const expected = '<p with="attrs">some text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        "should not add attributes when it has too many delimiters {{}}",
        options
      ),
      () => {
        const src = "some text {{with=attrs}}";
        const expected = "<p>some text {{with=attrs}}</p>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          replaceDelimiters(expected, options)
        );
      }
    );

    it(
      replaceDelimiters("should add attributes when {} in last line", options),
      () => {
        const src = "some text\n{with=attrs}";
        const expected = '<p with="attrs">some text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        "should add classes with {.class} dot notation",
        options
      ),
      () => {
        const src = "some text {.green}";
        const expected = '<p class="green">some text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        "should add css-modules with {..css-module} double dot notation",
        options
      ),
      () => {
        const src = "some text {..green}";
        const expected = '<p css-module="green">some text</p>\n';

        expect(
          markdownIt.render(replaceDelimiters(src, options)),
          expected
        ).toBe(expected);
      }
    );

    it(
      replaceDelimiters(
        "should add identifiers with {#id} hashtag notation",
        options
      ),
      () => {
        const src = "some text {#section2}";
        const expected = '<p id="section2">some text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        "should support classes, css-modules, identifiers and attributes in same {}",
        options
      ),
      () => {
        const src = "some text {attr=lorem .class ..css-module #id}";
        const expected =
          '<p attr="lorem" class="class" css-module="css-module" id="id">some text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        'should support attributes inside " {attr="lorem ipsum"}',
        options
      ),
      () => {
        const src = 'some text {attr="lorem ipsum"}';
        const expected = '<p attr="lorem ipsum">some text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        'should add classes in same class attribute {.c1 .c2} -> class="c1 c2"',
        options
      ),
      () => {
        const src = "some text {.c1 .c2}";
        const expected = '<p class="c1 c2">some text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        'should add css-modules in same css-modules attribute {..c1 ..c2} -> css-module="c1 c2"',
        options
      ),
      () => {
        const src = "some text {..c1 ..c2}";
        const expected = '<p css-module="c1 c2">some text</p>\n';

        expect(
          markdownIt.render(replaceDelimiters(src, options)),
          expected
        ).toBe(expected);
      }
    );

    it(
      replaceDelimiters(
        'should add nested css-modules {..c1.c2} -> css-module="c1.c2"',
        options
      ),
      () => {
        const src = "some text {..c1.c2}";
        const expected = '<p css-module="c1.c2">some text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(replaceDelimiters("should support empty inline tokens", options), () => {
      const fn = vi.fn();
      const src = " 1 | 2 \n --|-- \n a | ";

      try {
        markdownIt.render(replaceDelimiters(src, options));
      } catch {
        fn();
      }

      expect(fn).toBeCalledTimes(0);
    });

    it(
      replaceDelimiters("should add classes to inline elements", options),
      () => {
        const src = "paragraph **bold**{.red} asdf";
        const expected =
          '<p>paragraph <strong class="red">bold</strong> asdf</p>\n';

        expect(
          markdownIt.render(replaceDelimiters(src, options)),
          expected
        ).toBe(expected);
      }
    );

    it(
      replaceDelimiters(
        "should not add classes to inline elements with too many {{}}",
        options
      ),
      () => {
        const src = "paragraph **bold**{{.red}} asdf";
        const expected =
          "<p>paragraph <strong>bold</strong>{{.red}} asdf</p>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          replaceDelimiters(expected, options)
        );
      }
    );

    it(replaceDelimiters("should only remove last {}", options), () => {
      const src = "{{.red}";
      const expected = replaceDelimiters('<p class="red">{</p>\n', options);

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(replaceDelimiters("should add classes for list items", options), () => {
      const src = "- item 1{.red}\n- item 2";

      let expected = "";

      expected += "<ul>\n";
      expected += '<li class="red">item 1</li>\n';
      expected += "<li>item 2</li>\n";
      expected += "</ul>\n";

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(replaceDelimiters("should add classes in nested lists", options), () => {
      let src = "";

      src += "- item 1{.a}\n";
      src += "  - nested item {.b}\n";
      src += "  {.c}\n";
      src += "    1. nested nested item {.d}\n";
      src += "    {.e}\n";

      let expected = "";

      expected += "<ul>\n";
      expected += '<li class="a">item 1\n';
      expected += '<ul class="c">\n';
      expected += '<li class="b">nested item\n';
      expected += '<ol class="e">\n';
      expected += '<li class="d">nested nested item</li>\n';
      expected += "</ol>\n";
      expected += "</li>\n";
      expected += "</ul>\n";
      expected += "</li>\n";
      expected += "</ul>\n";

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(
      replaceDelimiters("should work with nested inline elements", options),
      () => {
        const src = "- **bold *italics*{.blue}**{.green}";

        let expected = "";

        expected += "<ul>\n";
        expected +=
          '<li><strong class="green">bold <em class="blue">italics</em></strong></li>\n';
        expected += "</ul>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters("should add class to inline code block", options),
      () => {
        const src = "bla `click()`{.c}";
        const expected = '<p>bla <code class="c">click()</code></p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters("should not trim unrelated white space", options),
      () => {
        const src = "- **bold** text {.red}";

        let expected = "";

        expected += "<ul>\n";
        expected += '<li class="red"><strong>bold</strong> text</li>\n';
        expected += "</ul>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(replaceDelimiters("should not create empty attributes", options), () => {
      const src = "text { .red }";
      const expected = '<p class="red">text</p>\n';

      expect(markdownIt.render(replaceDelimiters(src, options)), expected).toBe(
        expected
      );
    });

    it(
      replaceDelimiters(
        "should add attributes to ul when below last bullet point",
        options
      ),
      () => {
        const src = "- item1\n- item2\n{.red}";
        const expected =
          '<ul class="red">\n<li>item1</li>\n<li>item2</li>\n</ul>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        "should add classes for both last list item and ul",
        options
      ),
      () => {
        const src = "- item{.red}\n{.blue}";

        let expected = "";

        expected += '<ul class="blue">\n';
        expected += '<li class="red">item</li>\n';
        expected += "</ul>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters('should add class ul after a "softbreak"', options),
      () => {
        const src = "- item\n{.blue}";

        let expected = "";

        expected += '<ul class="blue">\n';
        expected += "<li>item</li>\n";
        expected += "</ul>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters(
        'should ignore non-text "attr-like" text after a "softbreak"',
        options
      ),
      () => {
        const src = "- item\n*{.blue}*";

        let expected = "";

        expected += "<ul>\n";
        expected += "<li>item\n<em>{.blue}</em></li>\n";
        expected += "</ul>\n";

        expect(markdownIt.render(src)).toBe(expected);
      }
    );

    it(replaceDelimiters("should work with ordered lists", options), () => {
      const src = "1. item\n{.blue}";

      let expected = "";

      expected += '<ol class="blue">\n';
      expected += "<li>item</li>\n";
      expected += "</ol>\n";

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(
      replaceDelimiters("should work with typography enabled", options),
      () => {
        const src = 'text {key="val with spaces"}';
        const expected = '<p key="val with spaces">text</p>\n';

        expect(
          markdownIt
            .set({ typographer: true })
            .render(replaceDelimiters(src, options))
        ).toBe(expected);
      }
    );

    it(replaceDelimiters("should support code blocks", options), () => {
      const src = "```{.c a=1 #ii}\nfor i in range(10):\n```";
      const expected =
        '<pre><code class="c" a="1" id="ii">for i in range(10):\n</code></pre>\n';

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(
      replaceDelimiters(
        "should support code blocks with language defined",
        options
      ),
      () => {
        const src = "```python {.c a=1 #ii}\nfor i in range(10):\n```";
        const expected =
          '<pre><code class="c language-python" a="1" id="ii">for i in range(10):\n</code></pre>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(replaceDelimiters("should support blockquotes", options), () => {
      const src = "> quote\n{.c}";
      const expected = '<blockquote class="c">\n<p>quote</p>\n</blockquote>\n';

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(replaceDelimiters("should support tables", options), () => {
      let src = "";

      src += "| h1 | h2 |\n";
      src += "| -- | -- |\n";
      src += "| c1 | c1 |\n";
      src += "\n";
      src += "{.c}";

      let expected = "";

      expected += '<table class="c">\n';
      expected += "<thead>\n";
      expected += "<tr>\n";
      expected += "<th>h1</th>\n";
      expected += "<th>h2</th>\n";
      expected += "</tr>\n";
      expected += "</thead>\n";
      expected += "<tbody>\n";
      expected += "<tr>\n";
      expected += "<td>c1</td>\n";
      expected += "<td>c1</td>\n";
      expected += "</tr>\n";
      expected += "</tbody>\n";
      expected += "</table>\n";

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(replaceDelimiters("should support nested lists", options), () => {
      let src = "";

      src += "- item\n";
      src += "  - nested\n";
      src += "  {.red}\n";
      src += "\n";
      src += "{.blue}\n";

      let expected = "";

      expected += '<ul class="blue">\n';
      expected += "<li>item\n";
      expected += '<ul class="red">\n';
      expected += "<li>nested</li>\n";
      expected += "</ul>\n";
      expected += "</li>\n";
      expected += "</ul>\n";

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(replaceDelimiters("should support images", options), () => {
      const src = "![alt](img.png){.a}";
      const expected = '<p><img src="img.png" alt="alt" class="a"></p>\n';

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(
      replaceDelimiters("should not apply inside `code{.red}`", options),
      () => {
        const src = "paragraph `code{.red}`";
        const expected = "<p>paragraph <code>code{.red}</code></p>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          replaceDelimiters(expected, options)
        );
      }
    );

    it(
      replaceDelimiters(
        "should not apply inside item lists with trailing `code{.red}`",
        options
      ),
      () => {
        const src = "- item with trailing `code = {.red}`";
        const expected =
          "<ul>\n<li>item with trailing <code>code = {.red}</code></li>\n</ul>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          replaceDelimiters(expected, options)
        );
      }
    );

    it(
      replaceDelimiters(
        "should not apply inside item lists with trailing non-text, eg *{.red}*",
        options
      ),
      () => {
        const src = "- item with trailing *{.red}*";
        const expected =
          "<ul>\n<li>item with trailing <em>{.red}</em></li>\n</ul>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          replaceDelimiters(expected, options)
        );
      }
    );

    it(
      replaceDelimiters(
        "should work with multiple inline code blocks in same paragraph",
        options
      ),
      () => {
        const src = "bla `click()`{.c} blah `release()`{.cpp}";
        const expected =
          '<p>bla <code class="c">click()</code> blah <code class="cpp">release()</code></p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters("should support {} curlies with length == 3", options),
      () => {
        const src = "text {1}";
        const expected = '<p 1="">text</p>\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it(
      replaceDelimiters("should do nothing with empty classname {.}", options),
      () => {
        const src = "text {.}";
        const expected = "<p>text {.}</p>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          replaceDelimiters(expected, options)
        );
      }
    );

    it(
      replaceDelimiters("should do nothing with empty id {#}", options),
      () => {
        const src = "text {#}";
        const expected = "<p>text {#}</p>\n";

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          replaceDelimiters(expected, options)
        );
      }
    );

    it(
      replaceDelimiters("should support horizontal rules ---{#id}", options),
      () => {
        const src = "---{#id}";
        const expected = '<hr id="id">\n';

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );

    it("should restrict attributes by allowed (string)", () => {
      const markdownItWithOptions = MarkdownIt().use(attrs, {
        ...options,
        allowed: ["id", "class"],
      });

      const src = "text {.someclass #someid attr=notAllowed}";
      const expected = '<p class="someclass" id="someid">text</p>\n';

      expect(
        markdownItWithOptions.render(replaceDelimiters(src, options))
      ).toBe(expected);
    });

    it("should restrict attributes by allowed (regex)", () => {
      const markdownItWithOptions = MarkdownIt().use(attrs, {
        ...options,
        allowed: [/^(class|attr)$/],
      });

      const src = "text {.someclass #someid attr=allowed}";
      const expected = '<p class="someclass" attr="allowed">text</p>\n';

      expect(
        markdownItWithOptions.render(replaceDelimiters(src, options))
      ).toBe(expected);
    });

    it("should support multiple classes for <hr>", () => {
      const src = "--- {.a .b}";
      const expected = '<hr class="a b">\n';

      expect(markdownIt.render(replaceDelimiters(src, options))).toBe(expected);
    });

    it(
      replaceDelimiters(
        "should not crash on {#ids} in front of list items",
        options
      ),
      () => {
        const src = "- {#ids} [link](./link)";
        const expected = replaceDelimiters(
          '<ul>\n<li>{#ids} <a href="./link">link</a></li>\n</ul>\n',
          options
        );

        expect(markdownIt.render(replaceDelimiters(src, options))).toBe(
          expected
        );
      }
    );
  });
};

describeTestsWithOptions(
  {
    left: "{",
    right: "}",
    allowed: [],
  },
  ""
);

describeTestsWithOptions(
  {
    left: "[",
    right: "]",
    allowed: [],
  },
  " with [ ] delimiters"
);

describeTestsWithOptions(
  {
    left: "[[",
    right: "]]",
    allowed: [],
  },
  " with [[ ]] delimiters"
);

it("should not break code blocks line highlight", () => {
  const markdownIt = createMarkdown().use(attrs);
  const src = "```{1-3}\nfor i in range(10):\n```";

  expect(markdownIt.render(src)).not.toContain("1-3");
});
