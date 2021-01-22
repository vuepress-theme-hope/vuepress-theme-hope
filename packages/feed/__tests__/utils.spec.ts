import { encodeXML } from "../src/node/utils";

describe("Encode XML", () => {
  it("should encode", () => {
    expect("&amp;&lt;&gt;&apos;&quot;").toEqual(encodeXML("&<>'\""));
  });

  it("should handle multiple", () => {
    expect("https://test.com/?page=1&amp;size=3&amp;length=10").toEqual(
      encodeXML("https://test.com/?page=1&size=3&length=10")
    );
  });
});
