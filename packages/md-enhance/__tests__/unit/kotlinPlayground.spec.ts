/* eslint-disable @typescript-eslint/naming-convention */
import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";
import { atou } from "vuepress-shared";

import { kotlinPlayground } from "../../src/node/markdown-it/kotlinPlayground.js";

const decodeFiles = (content: string): string[] =>
  JSON.parse(atou(content)) as string[];

const getFiles = (renderResult: string): string[] | null => {
  const result = renderResult.match(/files="(.*?)"/s);

  if (!result) return null;

  return decodeFiles(result[1]);
};

const getSettings = (renderResult: string): Record<string, unknown> | null => {
  const result = renderResult.match(/settings="(.*?)"/s);

  if (!result) return null;

  return JSON.parse(decodeURIComponent(result[1])) as Record<string, unknown>;
};

describe("Kotlin Playground", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(kotlinPlayground);

  it("Should resolve playground info", () => {
    const result = markdownIt.render(
      `
::: kotlin-playground Playground title

@file main.kt

\`\`\`kotlin
class Contact(val id: Int, var email: String)

fun main(args: Array<String>) {
    val contact = Contact(1, "mary@gmail.com")
    println(contact.id)
}
\`\`\`

:::

`,
      {},
    );

    expect(result).toMatchSnapshot();

    const files = getFiles(result);
    const settings = getSettings(result);

    expect(files).toEqual([
      `\
class Contact(val id: Int, var email: String)

fun main(args: Array<String>) {
    val contact = Contact(1, "mary@gmail.com")
    println(contact.id)
}
`,
    ]);
    expect(settings).toEqual({});
  });

  it("Should resolve playground info with settings", () => {
    const result = markdownIt.render(
      `
::: kotlin-playground Readonly Playground

@file main.kt

\`\`\`kotlin
import cat.Cat

fun main(args: Array<String>) {
//sampleStart
    val cat = Cat("Kitty")
    println(cat.name)
//sampleEnd
}
\`\`\`

@file cat.kt

\`\`\`kotlin
package cat
class Cat(val name: String)
\`\`\`


@settings

\`\`\`json
{
  "data-highlight-only": ""
}
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatchSnapshot();

    const file = getFiles(result);
    const settings = getSettings(result);

    expect(file).toEqual([
      `\
import cat.Cat

fun main(args: Array<String>) {
//sampleStart
    val cat = Cat("Kitty")
    println(cat.name)
//sampleEnd
}
`,
      `\
package cat
class Cat(val name: String)
`,
    ]);
    expect(settings).toEqual({
      "data-highlight-only": "",
    });
  });
});
