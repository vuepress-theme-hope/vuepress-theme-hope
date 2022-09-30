import { zlibSync, unzlibSync, strToU8, strFromU8 } from "fflate/browser";

export const utoa = (data: string): string => {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);

  return btoa(binary);
};

export const atou = (base64: string): string => {
  const binary = atob(base64);

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith("\x78\xDA"))
    return strFromU8(unzlibSync(strToU8(binary, true)));

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary));
};
