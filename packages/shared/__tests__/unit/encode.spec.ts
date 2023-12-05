import { expect, it } from "vitest";

import { encodeCDATA, encodeXMLContent } from "../../src/node/utils/encode.js";

it("Should encode CDATA", () => {
  expect(encodeCDATA("Certain tokens like ]]> can be difficult")).toBe(
    "Certain tokens like ]]]]><![CDATA[> can be difficult",
  );
});

it("Should encore XMLContent", () => {
  const content = '"1 > 2"';

  expect(encodeXMLContent(content)).toBe("&quot;1 &gt; 2&quot;");
});
