/**
 * Sort the given array randomly
 */
export const randomSortArray = <T = unknown>(
  array: T[],
  intensity = 2
): T[] => {
  const { length } = array;

  while (intensity-- > 0)
    array.forEach((item, index) => {
      // switch item with a randomIndex item
      const randomIndex = Math.floor(Math.random() * length);

      array[index] = array[randomIndex];
      array[randomIndex] = item;
    });

  return array;
};
