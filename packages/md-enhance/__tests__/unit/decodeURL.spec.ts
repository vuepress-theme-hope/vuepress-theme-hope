import MarkdownIt = require("markdown-it");
import decodeURL from "../../src/node/markdown-it/decode-url";

describe("decode-url", () => {
  it("Should resolve all", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(decodeURL);

    expect(markdownIt.render("![image.png](example/image.png)")).toEqual(
      '<p><img src="./example/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](./example/image.png)")).toEqual(
      '<p><img src="./example/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/example/image.png)")).toEqual(
      '<p><img src="/example/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/example.ccc/image.png)")).toEqual(
      '<p><img src="/example.ccc/image.png" alt="image.png" /></p>\n'
    );

    expect(markdownIt.render("![image.png](图片/image.png)")).toEqual(
      '<p><img src="./图片/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](./图片/image.png)")).toEqual(
      '<p><img src="./图片/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/图片/image.png)")).toEqual(
      '<p><img src="/图片/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/图片.ccc/image.png)")).toEqual(
      '<p><img src="/图片.ccc/image.png" alt="image.png" /></p>\n'
    );

    expect(
      markdownIt.render("![image.png](http://a.b.c/图片/image.png)")
    ).toEqual(
      '<p><img src="http://a.b.c/图片/image.png" alt="image.png" /></p>\n'
    );

    expect(
      markdownIt.render("![image.png](https://a.b.c/图片/image.png)")
    ).toEqual(
      '<p><img src="https://a.b.c/图片/image.png" alt="image.png" /></p>\n'
    );

    expect(markdownIt.render("![image.png](./a.b.c/图片/image.png)")).toEqual(
      '<p><img src="./a.b.c/图片/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/a.b.c/图片/image.png)")).toEqual(
      '<p><img src="/a.b.c/图片/image.png" alt="image.png" /></p>\n'
    );
  });

  it("Should resolve relative links", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(decodeURL, "./");

    expect(markdownIt.render("![image.png](example/image.png)")).toEqual(
      '<p><img src="./example/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](./example/image.png)")).toEqual(
      '<p><img src="./example/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/example/image.png)")).toEqual(
      '<p><img src="/example/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/example.ccc/image.png)")).toEqual(
      '<p><img src="/example.ccc/image.png" alt="image.png" /></p>\n'
    );

    expect(markdownIt.render("![image.png](图片/image.png)")).toEqual(
      '<p><img src="./图片/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](./图片/image.png)")).toEqual(
      '<p><img src="./图片/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/图片/image.png)")).toEqual(
      '<p><img src="/%E5%9B%BE%E7%89%87/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/图片.ccc/image.png)")).toEqual(
      '<p><img src="/%E5%9B%BE%E7%89%87.ccc/image.png" alt="image.png" /></p>\n'
    );

    expect(
      markdownIt.render("![image.png](http://a.b.c/图片/image.png)")
    ).toEqual(
      '<p><img src="http://a.b.c/%E5%9B%BE%E7%89%87/image.png" alt="image.png" /></p>\n'
    );

    expect(
      markdownIt.render("![image.png](https://a.b.c/图片/image.png)")
    ).toEqual(
      '<p><img src="https://a.b.c/%E5%9B%BE%E7%89%87/image.png" alt="image.png" /></p>\n'
    );

    expect(markdownIt.render("![image.png](./a.b.c/图片/image.png)")).toEqual(
      '<p><img src="./a.b.c/图片/image.png" alt="image.png" /></p>\n'
    );
    expect(markdownIt.render("![image.png](/a.b.c/图片/image.png)")).toEqual(
      '<p><img src="/a.b.c/%E5%9B%BE%E7%89%87/image.png" alt="image.png" /></p>\n'
    );
  });
});
