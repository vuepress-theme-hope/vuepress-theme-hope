import { sampleFeed } from "./setup";

describe("JSON 1.1", () => {
  it("should generate a valid feed", () => {
    const actual = sampleFeed.json();

    expect(actual).toMatchSnapshot();
  });
});
