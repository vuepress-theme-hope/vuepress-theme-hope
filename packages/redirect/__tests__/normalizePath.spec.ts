import { expect, it } from "vitest";

import { normalizePath } from "../src/node/utils/normalizePath.js";

it("Should normalize path", () => {
  const testCases = [
    ["/", "/index.html"],
    ["/index", "/index.html"],
    ["/index.md", "/index.html"],
    ["/index.html", "/index.html"],
    ["/foo/", "/foo/index.html"],
    ["/foo/bar/", "/foo/bar/index.html"],
    ["/foo/bar/index", "/foo/bar/index.html"],
    ["/foo/bar/index.md", "/foo/bar/index.html"],
    ["/foo/bar/index.html", "/foo/bar/index.html"],
    ["/foo", "/foo.html"],
    ["/foo.md", "/foo.html"],
    ["/foo.html", "/foo.html"],
    ["/foo/bar", "/foo/bar.html"],
    ["/foo/bar.md", "/foo/bar.html"],
    ["/foo/bar.html", "/foo/bar.html"],
    ["/foo/bar/baz", "/foo/bar/baz.html"],
    ["/foo/bar/baz.md", "/foo/bar/baz.html"],
    ["/foo/bar/baz.html", "/foo/bar/baz.html"],
    ["https://example.com/", "https://example.com/index.html"],
    ["https://example.com/index", "https://example.com/index.html"],
    ["https://example.com/index.md", "https://example.com/index.html"],
    ["https://example.com/index.html", "https://example.com/index.html"],
    ["https://example.com/foo/", "https://example.com/foo/index.html"],
    ["https://example.com/foo/bar/", "https://example.com/foo/bar/index.html"],
    [
      "https://example.com/foo/bar/index",
      "https://example.com/foo/bar/index.html",
    ],
    [
      "https://example.com/foo/bar/index.md",
      "https://example.com/foo/bar/index.html",
    ],
    [
      "https://example.com/foo/bar/index.html",
      "https://example.com/foo/bar/index.html",
    ],
    ["https://example.com/foo", "https://example.com/foo.html"],
    ["https://example.com/foo.md", "https://example.com/foo.html"],
    ["https://example.com/foo.html", "https://example.com/foo.html"],
    ["https://example.com/foo/bar", "https://example.com/foo/bar.html"],
    ["https://example.com/foo/bar.md", "https://example.com/foo/bar.html"],
    ["https://example.com/foo/bar.html", "https://example.com/foo/bar.html"],
    ["https://example.com/foo/bar/baz", "https://example.com/foo/bar/baz.html"],
    [
      "https://example.com/foo/bar/baz.md",
      "https://example.com/foo/bar/baz.html",
    ],
    [
      "https://example.com/foo/bar/baz.html",
      "https://example.com/foo/bar/baz.html",
    ],
  ];

  testCases.forEach(([input, output]) => {
    expect(normalizePath(input)).toBe(output);
  });
});
