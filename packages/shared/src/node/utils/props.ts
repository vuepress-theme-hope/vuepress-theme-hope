import type { DeflateOptions } from "fflate";
import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate/node";

export const utoa = (
  data: string,
  level: DeflateOptions["level"] = 6,
): string => {
  const buffer = strToU8(data);
  // zlib headers can be found at https://stackoverflow.com/a/54915442
  const zipped = zlibSync(buffer, { level });
  const binary = strFromU8(zipped, true);

  return Buffer.from(binary, "binary").toString("base64");
};

export const atou = (base64: string): string => {
  const binary = Buffer.from(base64, "base64").toString("binary");

  return strFromU8(unzlibSync(strToU8(binary, true)));
};
