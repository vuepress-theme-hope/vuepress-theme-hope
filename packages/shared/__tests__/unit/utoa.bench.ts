import { bench } from "vitest";

import { database } from "./__fixtures__/database.js";
import { atou, utoa } from "../../src/node/utils/props.js";

const originalContent = atou(database);

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

levels.forEach((level) => {
  bench(`utoa level ${level}`, () => {
    utoa(originalContent, level);
  });
});
