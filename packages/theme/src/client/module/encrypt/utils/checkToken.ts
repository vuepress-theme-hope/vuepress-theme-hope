import { compareSync } from "bcrypt-ts";

export const checkToken = (token = "", hash: string): boolean =>
  Boolean(token) && compareSync(token, hash);
