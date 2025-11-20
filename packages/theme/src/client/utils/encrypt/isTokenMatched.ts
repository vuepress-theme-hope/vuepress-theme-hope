import { compareSync } from "bcrypt-ts/browser";

export const isTokenMatched = (hash: string, token: string): boolean =>
  Boolean(token) && compareSync(token, hash);
