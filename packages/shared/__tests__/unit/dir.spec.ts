/* eslint-disable @typescript-eslint/naming-convention */
import { path } from "@vuepress/utils";
import { expect, it } from "vitest";

import { getDirContents } from "../../src/node/utils/dir.js";

it("should list dir correctly", () => {
  expect(
    getDirContents(path.resolve(__dirname, "./__fixtures__")),
  ).toMatchSnapshot();
});
