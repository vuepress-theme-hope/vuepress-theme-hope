import { createRequire } from "node:module";

export const checkInstalled = (pkg: string, currentUrl: string): boolean => {
  try {
    pkg && createRequire(currentUrl).resolve(pkg);

    return true;
  } catch (error) {
    return false;
  }
};
