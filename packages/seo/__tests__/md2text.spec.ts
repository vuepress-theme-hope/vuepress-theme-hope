import { md2text } from "../src/node/utils";

it("should recognize headings", () => {
  const content = `# Heading1

## Heading2 🤡

###### heading6 with words
`;
  expect(md2text(content)).toEqual(`Heading1 Heading2 🤡 heading6 with words`);
});

it("should recognize lists", () => {
  const content = `
- [link1](https://example.com)
- [link2](https://example.com)

* Text 1
* Text 2

0. apple
0. apple
0. apple

1. apple
2. apple
3. apple
`;
  expect(md2text(content)).toEqual(
    `link1; link2; Text 1; Text 2; 0. apple 0. apple 0. apple 1. apple 2. apple 3. apple`
  );
});

it("should recognize links", () => {
  const content = `A text with [link](https://example.com) in it.

- [link1](https://example.com)
- [link2](https://example.com)
`;
  expect(md2text(content)).toEqual(`A text with link in it. link1; link2;`);
});

it("should remove images", () => {
  const content = `A text with ![image](https://example.com) in it.

![image](https://example.com)
`;
  expect(md2text(content)).toEqual(`A text with in it.`);
});

it("should resolve inline symbols", () => {
  const content = `A text with **bold**, _italic_, \`code block\` and ~~delete line~~ in it.`;
  expect(md2text(content)).toEqual(
    `A text with bold, italic, code block and in it.`
  );
});
