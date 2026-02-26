export const cyrb53 = (content: string, seed = 0): number => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;

  for (let i = 0; i < content.length; i++) {
    // oxlint-disable-next-line unicorn/prefer-code-point
    const charCode = content.charCodeAt(i);

    h1 = Math.imul(h1 ^ charCode, 2654435761);
    h2 = Math.imul(h2 ^ charCode, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  // oxlint-disable-next-line unicorn/prefer-math-trunc: we are converting to uint32
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const generateIndexFromHash = (content: string, total: number): number =>
  cyrb53(content) % total;
