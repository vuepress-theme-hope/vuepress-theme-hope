import { sampleFeed } from "./setup";

describe("Atom 1.0", () => {
  it("should generate a valid feed", () => {
    const actual = sampleFeed.atom();

    expect(actual).toMatchSnapshot();
  });
});
