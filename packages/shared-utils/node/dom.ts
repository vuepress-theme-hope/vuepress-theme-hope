/**
 * Change DOM classes
 *
 * @param domClass DOM classlist
 * @param insert class to insert
 * @param remove class to remove
 */
export const changeClass = (
  domClass: DOMTokenList,
  insert: string[],
  remove: string[]
): void => {
  const oldClasses: string[] = [];

  domClass.remove(...remove);
  domClass.forEach((classname) => {
    oldClasses.push(classname);
  });
  domClass.value = "";
  domClass.add(...insert, ...oldClasses);
};
