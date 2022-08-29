import { compareSync } from "bcrypt-ts/browser";

export const checkToken = (token = "", hash: string): boolean =>
  Boolean(token) && compareSync(token, hash);
