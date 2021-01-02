import { compareSync, hashSync } from "bcryptjs";

describe("bcrypt test", () => {
  it("should match", () => {
    const hash1 = hashSync("abcdefghi", 10);
    expect(compareSync("abcdefghi", hash1)).toEqual(true);
  });
});
