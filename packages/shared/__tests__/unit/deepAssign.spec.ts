/* eslint-disable @typescript-eslint/naming-convention */
import { describe, expect, it } from "vitest";

import { deepAssign } from "../../src/shared/utils/deepAssign.js";

describe("deep merge", () => {
  it("simple merge", () => {
    const object1 = { a: 1 };
    const object2 = { b: 2 };

    const ans1 = deepAssign(object1, object2);

    expect(ans1).toEqual({ a: 1, b: 2 });

    const object3 = { a: "mister-hope" };
    const object4 = { "%": "special", b: false };

    const ans2 = deepAssign(object3, object4);

    expect(ans2).toEqual({
      a: "mister-hope",
      "%": "special",
      b: false,
    });
  });

  it("simple merge can cover value", () => {
    const object1 = { a: 1 };
    const object2 = { a: 2 };

    const ans1 = deepAssign(object1, object2);

    expect(ans1).toEqual({ a: 2 });

    const object3 = { "%": "mister-hope", b: true, c: 1 };
    const object4 = { "%": "special", b: false, d: "2" };

    const ans2 = deepAssign(object3, object4);

    expect(ans2).toEqual({
      "%": "special",
      b: false,
      c: 1,
      d: "2",
    });
  });

  it("merge array", () => {
    const object1 = { a: { a: 1 } };
    const object2 = { a: [] };

    const ans1 = deepAssign(object1, object2);

    expect(ans1).toEqual({ a: [] });

    const object3 = { a: [] };
    const object4 = { a: { a: 1 } };

    const ans2 = deepAssign(object3, object4);

    expect(ans2).toEqual({ a: { a: 1 } });
  });

  it("merge object", () => {
    const object1 = { a: { a: 1, b: 2 } };
    const object2 = { a: { b: 1, c: 2 } };

    const ans = deepAssign(object1, object2);

    expect(ans).toEqual({ a: { a: 1, b: 1, c: 2 } });
  });

  it("nest merge", () => {
    const object1 = { a: { a: 1 } };
    const object2 = { a: {} };

    const ans1 = deepAssign(object1, object2);

    expect(ans1).toEqual({ a: { a: 1 } });

    const object3 = { a: { a: 1, b: 2 }, b: 1 };
    const object4 = { a: { a: 2, c: 3 }, b: [], c: false };

    const ans2 = deepAssign(object3, object4);

    expect(ans2).toEqual({
      a: { a: 2, b: 2, c: 3 },
      b: [],
      c: false,
    });
  });

  it("merge multi object", () => {
    const object1 = { a: { a: 1, b: 2 } };
    const object2 = { a: { b: 1, c: 2 } };
    const object3 = { a: { b: 0 }, b: { a: 1 } };

    const ans = deepAssign<Record<string, any>>(object1, object2, object3);

    expect(ans).toEqual({ a: { a: 1, b: 0, c: 2 }, b: { a: 1 } });
  });
});
