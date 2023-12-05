import { expect, it } from "vitest";

import { isAbsoluteUrl, isUrl } from "../../src/shared/utils/url.js";

it("isUrl()", () => {
  expect(isUrl("https://mister-hope.com")).toEqual(true);
  expect(isUrl("http://mister-hope.com")).toEqual(true);
  expect(isUrl("https://localhost:8080")).toEqual(true);
  expect(isUrl("http://localhost:8080")).toEqual(true);
  expect(isUrl("ftp://mister-hope.com")).toEqual(true);
  expect(isUrl("sftp://mister-hope.com")).toEqual(true);
  expect(isUrl("mail://mister-hope@gmail.com")).toEqual(true);
  expect(isUrl("mister-hope.com")).toEqual(false);
  expect(isUrl("mrhope")).toEqual(false);
});

it("isAbsoluteUrl()", () => {
  expect(isAbsoluteUrl("/a/")).toEqual(true);
  expect(isAbsoluteUrl("/a.html")).toEqual(true);
  expect(isAbsoluteUrl("mister-hope.com")).toEqual(false);
  expect(isAbsoluteUrl("mrhope")).toEqual(false);
});
