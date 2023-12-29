import { describe, expect, it } from "vitest";

import { checkInstalled } from "../../src/node/utils/checkInstalled.js";

describe("checkInstalled", () => {
  it("should return true with deps", () => {
    expect(checkInstalled("vue", import.meta.url)).toEqual(true);
  });

  it("should return true with built-in", () => {
    expect(checkInstalled("path", import.meta.url)).toEqual(true);
    expect(checkInstalled("node:path", import.meta.url)).toEqual(true);
  });

  it("should return true with built-in", () => {
    expect(checkInstalled("path", import.meta.url)).toEqual(true);
    expect(checkInstalled("node:path", import.meta.url)).toEqual(true);
  });

  it("should return false with not existed", () => {
    expect(checkInstalled("not-existed", import.meta.url)).toEqual(false);
  });
});
