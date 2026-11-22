import { describe, expect, it } from "vitest";
import type { RouteLocationNormalizedLoaded } from "vuepress/client";

import { getHash, isActiveLink, normalizePath } from "../../src/client/utils/path.js";

const createRoute = (path: string, hash = ""): RouteLocationNormalizedLoaded =>
  ({ path, hash }) as unknown as RouteLocationNormalizedLoaded;

describe(getHash, () => {
  it("should return an empty string when the path has no hash", () => {
    expect(getHash("/foo/bar.html")).toBe("");
    expect(getHash("")).toBe("");
  });

  it("should return the hash including the leading `#`", () => {
    expect(getHash("/foo/bar.html#section")).toBe("#section");
    expect(getHash("#section")).toBe("#section");
  });

  it("should start at the first hash", () => {
    expect(getHash("/foo#a#b")).toBe("#a#b");
  });

  it("should return the hash of a path that also has a query", () => {
    expect(getHash("/foo?query=1#section")).toBe("#section");
  });

  it("should not take polynomial time on a long sequence of hashes", () => {
    const path = `${"#".repeat(50_000)}\nfoo`;

    expect(getHash(path)).toBe(path);
  });
});

describe(normalizePath, () => {
  it("should keep a plain path as is", () => {
    expect(normalizePath("/foo/bar")).toBe("/foo/bar");
  });

  it("should remove the hash", () => {
    expect(normalizePath("/foo/bar#section")).toBe("/foo/bar");
    expect(normalizePath("#section")).toBe("");
  });

  it("should decode the path", () => {
    expect(normalizePath("/foo%20bar")).toBe("/foo bar");
  });

  it("should compute the hash index on the decoded path", () => {
    expect(normalizePath("/foo%20bar#section")).toBe("/foo bar");
    expect(normalizePath("/foo%23bar")).toBe("/foo%23bar");
  });

  it("should normalize the index page", () => {
    expect(normalizePath("/foo/index.html")).toBe("/foo/");
    expect(normalizePath("/foo/README.md")).toBe("/foo/");
    expect(normalizePath("/foo/index.md")).toBe("/foo/");
    expect(normalizePath("/foo/index.html#section")).toBe("/foo/");
    expect(normalizePath("/foo/README.md#section")).toBe("/foo/");
  });

  it("should strip the html and md extension", () => {
    expect(normalizePath("/foo/bar.html")).toBe("/foo/bar");
    expect(normalizePath("/foo/bar.md")).toBe("/foo/bar");
  });

  it("should not take polynomial time on a long sequence of hashes", () => {
    expect(normalizePath(`${"#".repeat(50_000)}\nfoo`)).toBe("");
  });
});

describe(isActiveLink, () => {
  it("should return false when no link is provided", () => {
    expect(isActiveLink(createRoute("/foo"))).toBe(false);
  });

  it("should compare the normalized path when the link has no hash", () => {
    const route = createRoute("/foo");

    expect(isActiveLink(route, "/foo.html")).toBe(true);
    expect(isActiveLink(route, "/bar")).toBe(false);
  });

  it("should compare the hash as well when the link has one", () => {
    const route = createRoute("/foo", "#section");

    expect(isActiveLink(route, "/foo.html#section")).toBe(true);
    expect(isActiveLink(route, "/foo.html#other")).toBe(false);
    expect(isActiveLink(route, "/bar#section")).toBe(false);
  });

  it("should support a hash-only link", () => {
    expect(isActiveLink(createRoute("/foo", "#section"), "#section")).toBe(true);
    expect(isActiveLink(createRoute("/foo", "#other"), "#section")).toBe(false);
  });
});
