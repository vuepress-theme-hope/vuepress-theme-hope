/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";
import { path } from "vuepress/utils";

import { getDirContents } from "../../src/node/utils/dir.js";

it("should list dir correctly", () => {
  expect(
    getDirContents(path.resolve(__dirname, "./__fixtures__")),
  ).toMatchSnapshot();
});
