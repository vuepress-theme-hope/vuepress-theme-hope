import { describe, expect, it, vi } from "vitest";

import {
  atou as clientAtou,
  utoa as clientUtoa,
} from "../../src/client/utils/props.js";
import {
  atou as nodeAtou,
  utoa as nodeUtoa,
} from "../../src/node/utils/props.js";

// mock define value
vi.stubGlobal("__VUEPRESS_SSR__", false);

const words = [
  "Hello world.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quasi consequatur sed accusamus repellendus mollitia dolore facilis perferendis provident, sint a tempora quos eveniet temporibus? Ipsum quasi adipisci voluptatibus fuga?",
  "中国制造",
  "昔人已乘黄鹤去⑵，此地空余黄鹤楼。黄鹤一去不复返，白云千载空悠悠⑶。晴川历历汉阳树⑷，芳草萋萋鹦鹉洲⑸。日暮乡关何处是⑹？烟波江上使人愁⑺",
];

const compressed = [
  "eNrzSM3JyVcozy/KSdEDAB0WBGs=",
  "eNoljkGOAyEMBL/SD1jtF3LJJVI+4UBPZAkwwWbeHybcSlZZXU8brNDusyJbsQHXgFQGkjVnCsYckKxdXZO2N1g0/nG/ZDo+U1y3u/BynRmS0nSp0zHYWQpbXlytrF+VvUQckrSoo3McHMu5eNipmS3+VklbKQjWbkPWkjl4sumK20d9Tb/h8avfITs0KU4rs4fEpeCYb7l9ATPWWYk=",
  "eNp7smPt09l7n3Zse9mwAAA6rwiz",
  "eNolj9sKgkAURX+9iwVWRgNFGoUVFvTQVUtndPBfpnOOM0/+QieE9bBh7/WwKVyCUpi/QIau9JxMcF4a8W6rGV0T3D6aiwIddRWdqm9v0GUoeryEIsAksPWS902kQQkMhlZrtmiwZ4z4sEJRhvkO52OGnr4LU9oLI3K27CS1gW8XU8bJs5M+ZS8jir+1PtHmBvKAoxT0ChOPwrsRsq3iZhhTeqRnDMUEdM0XyOsboX7tYJUm",
];

const browserUtoaResults = words.map((word) => clientUtoa(word));
const browserAtouResults = compressed.map((word) => clientAtou(word));

const nodeUtoaResults = words.map((word) => nodeUtoa(word));
const nodeAutoResults = compressed.map((word) => nodeAtou(word));

describe("props", () => {
  it("utoa should return same result", () => {
    expect(browserUtoaResults).toEqual(nodeUtoaResults);
  });

  it("atou should return same result", () => {
    expect(browserAtouResults).toEqual(nodeAutoResults);
  });

  it("transform should return itself", () => {
    expect(browserUtoaResults.map((word) => nodeAtou(word))).toEqual(words);
    expect(nodeUtoaResults.map((word) => nodeAtou(word))).toEqual(words);
  });
});
