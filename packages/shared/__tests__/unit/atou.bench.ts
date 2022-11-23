import { bench } from "vitest";
import { atou, utoa } from "../../src/node/utils/props.js";
import { database } from "./__fixtures__/database.js";

const originalContent = atou(database);

[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((level) => {
  // @ts-ignore
  const result = utoa(originalContent, level);

  console.log(
    `level ${level}: ${(result.length / originalContent.length) * 100}%`
  );

  bench(`atou level ${level}`, () => {
    atou(result);
  });
});
