import { defaultTransformer } from "../src/node/time";

describe("Time transformer test", () => {
  it("Can transform time", () => {
    expect(defaultTransformer(1604735743827, "zh", "Asia/Shanghai")).toEqual(
      "2020年11月7日 15:55"
    );
    expect(defaultTransformer(1604735743827, "en", "America/New_York")).toEqual(
      "November 7, 2020 02:55"
    );
    expect(defaultTransformer(1604735743827, "zh", "Europe/London")).toEqual(
      "2020年11月7日 07:55"
    );
  });
});
