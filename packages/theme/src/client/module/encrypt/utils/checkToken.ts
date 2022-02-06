import { compareSync } from "bcryptjs";

export const checkToken = (token = "", hash: string): boolean =>
  Boolean(token) && compareSync(token, hash);
