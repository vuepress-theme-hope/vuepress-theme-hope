import { describe, it } from "mocha";
import { defaultTransformer } from "../node/time";
import { expect } from "chai";

describe("Last update test", () => {
  it("Can transform time", () => {
    expect(
      defaultTransformer(1604735743827, "zh", "Asia/Shanghai")
    ).to.be.equal("2020年11月7日 15:55");
    expect(
      defaultTransformer(1604735743827, "en", "America/New_York")
    ).to.be.equal("November 7, 2020 02:55");
    expect(
      defaultTransformer(1604735743827, "zh", "Europe/London")
    ).to.be.equal("2020年11月7日 07:55");
  });
});
