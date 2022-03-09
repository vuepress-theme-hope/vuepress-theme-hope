export const generateIndexfromHash = (
  content: string,
  total: number
): number => {
  let hash = 1;

  for (let i = 0; i < content.length; i++) {
    // Jenkins one-at-a-time
    hash += content.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >> 6;
  }

  hash += hash << 3;
  hash ^= hash >> 11;

  return hash % total;
};
