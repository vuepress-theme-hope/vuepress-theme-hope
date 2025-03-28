import { compareSync } from "bcrypt-ts";
import { describe, expect, it } from "vitest";

import { getEncryptConfig } from "../../src/node/config/getEncryptConfig.js";

const adminSinglePassword = "1234";
const adminMultiplePassword = ["1234", "abcd"];

const userSinglePassword = "5678";
const userMultiplePassword = ["5678", "apple"];

describe("Should resolve encrypt option correctly", () => {
  it("should encrypt admin password", () => {
    const result1 = getEncryptConfig({ admin: adminSinglePassword });

    expect(Object.keys(result1)).toEqual(["admin"]);

    expect(result1.admin!.tokens.length).toEqual(1);

    expect(
      compareSync(adminSinglePassword, result1.admin!.tokens.pop()!),
    ).toBeTruthy();

    const result2 = getEncryptConfig({ admin: adminMultiplePassword });

    expect(Object.keys(result2)).toEqual(["admin"]);

    expect(
      adminMultiplePassword.every((token, index) =>
        compareSync(token, result2.admin!.tokens[index]),
      ),
    ).toBeTruthy();
  });

  it("should encrypt config password", () => {
    const result1 = getEncryptConfig({ config: { "/": userSinglePassword } });

    expect(Object.keys(result1)).toEqual(["config"]);
    expect(Object.keys(result1.config!)).toEqual(["/"]);

    expect(result1.config!["/"].tokens.length).toEqual(1);

    expect(
      compareSync(userSinglePassword, result1.config!["/"].tokens.pop()!),
    ).toBeTruthy();

    const result2 = getEncryptConfig({ config: { "/": userMultiplePassword } });

    expect(Object.keys(result2)).toEqual(["config"]);
    expect(Object.keys(result2.config!)).toEqual(["/"]);

    expect(
      userMultiplePassword.every((token, index) =>
        compareSync(token, result2.config!["/"].tokens[index]),
      ),
    ).toBeTruthy();
  });

  it("should remove incorrect password", () => {
    // @ts-expect-error: number password is not typed
    expect(getEncryptConfig({ admin: 1234 })).toEqual({});

    // @ts-expect-error: number password is not typed
    const result2 = getEncryptConfig({ admin: ["1234", 1234] });

    expect(result2.admin!.tokens.length).toEqual(1);

    // @ts-expect-error: number password is not typed
    const result3 = getEncryptConfig({ config: { "/": 1234, "/zh/": "1234" } });

    expect(Object.keys(result3.config!)).toEqual(["/zh/"]);

    // @ts-expect-error: number password is not typed
    const result4 = getEncryptConfig({ config: { "/": [1234, "1234"] } });

    expect(result4.config!["/"].tokens.length).toEqual(1);
  });
});
