import { expect, it } from "vitest";

import { codeDecimal } from "../../src/node/utils.ts";

it("codeDecimal", () => {
  const testCases: [source: number, result: string][] = [
    [1, "a"],
    [50, "X"],
    [256, "dR"],
    [19491001, "bxVNM"],
  ];

  testCases.forEach(([source, result]) => {
    expect(codeDecimal(source)).toEqual(result);
  });
});
