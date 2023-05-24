import { expect, it } from "vitest";

import { isAbsoluteUrl, isUrl } from "../../src/shared/utils/url.js";

it("isUrl()", () => {
  expect(isUrl("https://mrhope.site")).toEqual(true);
  expect(isUrl("http://mrhope.site")).toEqual(true);
  expect(isUrl("https://localhost:8080")).toEqual(true);
  expect(isUrl("http://localhost:8080")).toEqual(true);
  expect(isUrl("ftp://mrhope.site")).toEqual(true);
  expect(isUrl("sftp://mrhope.site")).toEqual(true);
  expect(isUrl("mail://mister-hope@gmail.com")).toEqual(true);
  expect(isUrl("mrhope.site")).toEqual(false);
  expect(isUrl("mrhope")).toEqual(false);
});

it("isAbsoluteUrl()", () => {
  expect(isAbsoluteUrl("/a/")).toEqual(true);
  expect(isAbsoluteUrl("/a.html")).toEqual(true);
  expect(isAbsoluteUrl("mrhope.site")).toEqual(false);
  expect(isAbsoluteUrl("mrhope")).toEqual(false);
});
