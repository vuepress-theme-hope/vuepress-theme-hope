import { bench } from "vitest";

import { database } from "./__fixtures__/database.js";
import { atou, utoa } from "../../src/node/utils/props.js";

const originalContent = atou(database);

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

levels.forEach((level) => {
  const result = utoa(originalContent, level);

  console.log(
    `level ${level}: ${(result.length / originalContent.length) * 100}%`,
  );

  bench(`atou level ${level}`, () => {
    atou(result);
  });
});
