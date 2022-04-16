import { path } from "@vuepress/utils";
import MarkdownIt = require("markdown-it");
import MarkdownContainer = require("markdown-it-container");
import { mdImport } from "../../src/node/markdown-it/mdImport";

import type { MarkdownEnv } from "@vuepress/markdown";

const mdFixturePathRelative = "./__fixtures__/mdImport.md";
const mdFixturePath = path.resolve(__dirname, mdFixturePathRelative);

const md = MarkdownIt().use(mdImport).use(MarkdownContainer, "tip");

describe("mdImport", () => {
  it("should not be parsed as import markdown syntax", () => {
    const source = [
      "@[m",
      "@[md",
      "@[md]",
      "@[md](./foo.js",
      "@[md](/path/to/foo.js",
      "@[me](/path/to/foo.js",
      "@[md](./foo.md",
      "@[md](/path/to/foo.md",
      "@[me](/path/to/foo.md",
      "@[md](./foo.js",
    ];

    const env: MarkdownEnv = {
      filePath: __filename,
    };
    const rendered = md.render(source.join("\n\n"), env);

    expect(rendered).toEqual(
      source.map((item) => `<p>${item}</p>`).join("\n") + "\n"
    );
    expect(env.importedFiles).toBeUndefined();
  });

  describe("lines range", () => {
    it("should import all lines", () => {
      const source = `\
@[md](${mdFixturePathRelative})
`;

      const expected = `\
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const env: MarkdownEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.importedFiles).toEqual([mdFixturePath]);
    });

    it("should import partial lines", () => {
      const source = `\
@[md{5-9}](${mdFixturePathRelative})
@[md{-9}](${mdFixturePathRelative})
`;

      const expected = `\
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const env: MarkdownEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.importedFiles).toEqual([mdFixturePath, mdFixturePath]);
    });
  });

  describe("path resolving", () => {
    it("should resolve relative path according to filePath", () => {
      const source = `\
@[md](/foo.md)
@[md](./bar.md)
`;
      const expected = `\
<p>File not found</p>
<p>File not found</p>
`;

      const env: MarkdownEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.importedFiles).toEqual([
        "/foo.md",
        path.resolve(__dirname, "./bar.md"),
      ]);
    });

    it("should not resolve relative path if filePath is not provided", () => {
      const source = `\
@[md](/foo.md)
@[md](./bar.md)
`;
      const expected = `\
<p>File not found</p>
<p>Error when resolving path</p>
`;

      const env: MarkdownEnv = {
        filePath: null,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.importedFiles).toEqual(["/foo.md"]);
    });

    it("should handle import path correctly", () => {
      const source = `\
@[md](@fixtures/mdImport.md)
`;
      const expected = `\
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const mdWithOptions = MarkdownIt()
        .use(mdImport, (str: string): string =>
          str.replace(/^@fixtures/, path.resolve(__dirname, "./__fixtures__"))
        )
        .use(MarkdownContainer, "tip");
      const env: MarkdownEnv = {
        filePath: null,
      };
      const rendered = mdWithOptions.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.importedFiles).toEqual([mdFixturePath]);
    });
  });

  describe("compatibility with other markdown syntax", () => {
    it("should terminate paragraph", () => {
      const source = `\
foo
@[md](/path/to/foo.md)
`;
      const expected = `\
<p>foo</p>
<p>File not found</p>
`;

      const env: MarkdownEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.importedFiles).toEqual(["/path/to/foo.md"]);
    });

    it("should terminate blockquote", () => {
      const source = `\
> foo
@[md](/path/to/foo.md)
`;
      const expected = `\
<blockquote>
<p>foo</p>
</blockquote>
<p>File not found</p>
`;

      const env: MarkdownEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.importedFiles).toEqual(["/path/to/foo.md"]);
    });
  });
});
