import { compareSync } from "bcrypt-ts/browser";

export const isTokenMatched = (token = "", hash: string): boolean =>
  Boolean(token) && compareSync(token, hash);
