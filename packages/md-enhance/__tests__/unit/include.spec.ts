import { describe, it, expect } from "vitest";
import { path } from "@vuepress/utils";
import MarkdownIt from "markdown-it";
import MarkdownContainer from "markdown-it-container";
import { include } from "../../src/node/markdown-it/include";

import type { MarkdownEnv } from "@vuepress/markdown";

interface IncludeEnv extends MarkdownEnv {
  includedFiles?: string[];
}

const mdFixturePathRelative = "./__fixtures__/include.md";
const mdFixturePath = path.resolve(__dirname, mdFixturePathRelative);
const mdFixtureDeepIncludeRelative = "./__fixtures__/deepInclude.md";
const mdFixtureDeepIncludePath = path.resolve(
  __dirname,
  mdFixtureDeepIncludeRelative
);

const md = MarkdownIt().use(include).use(MarkdownContainer, "tip");

describe("include", () => {
  it("should not be parsed as import markdown syntax", () => {
    const source = [
      "@inc",
      "@include(",
      "@include",
      "@include(./foo.js",
      "@include(/path/to/foo.js",
      "@inlude(/path/to/foo.js)",
      "@include(./foo.md",
      "@include(/path/to/foo.md",
      "@include(/path/to/foo.md",
      "@include(./foo.js",
    ];

    const env: IncludeEnv = {
      filePath: __filename,
    };
    const rendered = md.render(source.join("\n\n"), env);

    expect(rendered).toEqual(
      source.map((item) => `<p>${item}</p>`).join("\n") + "\n"
    );
    expect(env.includedFiles).toEqual([]);
  });

  describe("lines range", () => {
    it("should import all lines", () => {
      const source = `\
@include(${mdFixturePathRelative})
`;

      const expected = `\
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const env: IncludeEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual([mdFixturePath]);
    });

    it("should import partial lines", () => {
      const source = `\
@include(${mdFixturePathRelative}{5-9})
@include(${mdFixturePathRelative}{-9})
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

      const env: IncludeEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual([mdFixturePath, mdFixturePath]);
    });
  });

  describe("path resolving", () => {
    it("should resolve relative path according to filePath", () => {
      const source = `\
@include(/foo.md)
@include(./bar.md)
`;
      const expected = `\
<p>File not found</p>
<p>File not found</p>
`;

      const env: IncludeEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual([
        "/foo.md",
        path.resolve(__dirname, "./bar.md"),
      ]);
    });

    it("should resolve absolute path ", () => {
      const source = `\
@include(/foo.md)
@include(${mdFixturePath})
`;
      const expected = `\
<p>File not found</p>
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const env: IncludeEnv = {
        filePath: null,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual(["/foo.md", mdFixturePath]);
    });

    it("should not resolve relative path if filePath is not provided", () => {
      const source = `\
@include(./bar.md)
`;
      const expected = `\
<p>Error when resolving path</p>
`;

      const env: IncludeEnv = {
        filePath: null,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual([]);
    });

    it("should handle import path correctly", () => {
      const source = `\
@include(@fixtures/include.md)
`;
      const expected = `\
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const mdWithOptions = MarkdownIt()
        .use(include, {
          getPath: (str: string): string =>
            str.replace(
              /^@fixtures/,
              path.resolve(__dirname, "./__fixtures__")
            ),
        })
        .use(MarkdownContainer, "tip");
      const env: IncludeEnv = {
        filePath: null,
      };
      const rendered = mdWithOptions.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual([mdFixturePath]);
    });
  });

  describe("compatibility with other markdown syntax", () => {
    it("should terminate paragraph", () => {
      const source = `\
foo
@include(/path/to/foo.md)
`;
      const expected = `\
<p>foo</p>
<p>File not found</p>
`;

      const env: IncludeEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual(["/path/to/foo.md"]);
    });

    it("should terminate blockquote", () => {
      const source = `\
> foo
@include(/path/to/foo.md)
`;
      const expected = `\
<blockquote>
<p>foo</p>
</blockquote>
<p>File not found</p>
`;

      const env: IncludeEnv = {
        filePath: __filename,
      };
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual(["/path/to/foo.md"]);
    });

    it("should support deep import", () => {
      const source1 = `\
@include(${mdFixtureDeepIncludeRelative})
`;
      const expected1 = `\
<h3>Heading 3</h3>
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const source2 = `\
@include(${mdFixtureDeepIncludePath})
`;
      const expected2 = `\
<h3>Heading 3</h3>
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const mdWithOptions = MarkdownIt()
        .use(include, { deep: true })
        .use(MarkdownContainer, "tip");
      const env1: IncludeEnv = {
        filePath: __filename,
      };
      const env2: IncludeEnv = {
        filePath: __filename,
      };

      expect(mdWithOptions.render(source1, env1)).toEqual(expected1);
      expect(env1.includedFiles).toEqual([
        mdFixtureDeepIncludePath,
        mdFixturePath,
      ]);
      expect(mdWithOptions.render(source2, env2)).toEqual(expected2);
      expect(env2.includedFiles).toEqual([
        mdFixtureDeepIncludePath,
        mdFixturePath,
      ]);
    });
  });
});
