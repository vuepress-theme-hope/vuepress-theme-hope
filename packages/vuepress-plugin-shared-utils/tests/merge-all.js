const merge = require('../');
const test = require('tape');

test('throw error if first argument is not an array', tape => {
  tape.throws(merge.all.bind(null, { example: true }, { another: '2' }), Error);
  tape.end();
});

test('return an empty object if first argument is an array with no elements', tape => {
  tape.deepEqual(merge.all([]), {});
  tape.end();
});

test('Work just fine if first argument is an array with least than two elements', tape => {
  const actual = merge.all([{ example: true }]);
  const expected = { example: true };
  tape.deepEqual(actual, expected);
  tape.end();
});

test('execute correctly if options object were not passed', tape => {
  const arrayToMerge = [{ example: true }, { another: '123' }];
  tape.doesNotThrow(merge.all.bind(null, arrayToMerge));
  tape.end();
});

test('execute correctly if options object were passed', tape => {
  const arrayToMerge = [{ example: true }, { another: '123' }];
  tape.doesNotThrow(merge.all.bind(null, arrayToMerge, { clone: true }));
  tape.end();
});

test('invoke merge on every item in array should result with all props', tape => {
  const firstObject = { first: true };
  const secondObject = { second: false };
  const thirdObject = { third: 123 };
  const fourthObject = { fourth: 'some string' };

  const mergedObject = merge.all([firstObject, secondObject, thirdObject, fourthObject]);

  tape.ok(mergedObject.first === true);
  tape.ok(mergedObject.second === false);
  tape.ok(mergedObject.third === 123);
  tape.ok(mergedObject.fourth === 'some string');
  tape.end();
});

test('invoke merge on every item in array with clone should clone all elements', tape => {
  const firstObject = { a: { d: 123 } };
  const secondObject = { b: { e: true } };
  const thirdObject = { c: { f: 'string' } };

  const mergedWithClone = merge.all([firstObject, secondObject, thirdObject], { clone: true });

  tape.notEqual(mergedWithClone.a, firstObject.a);
  tape.notEqual(mergedWithClone.b, secondObject.b);
  tape.notEqual(mergedWithClone.c, thirdObject.c);

  tape.end();
});

test('invoke merge on every item in array clone=false should not clone all elements', tape => {
  const firstObject = { a: { d: 123 } };
  const secondObject = { b: { e: true } };
  const thirdObject = { c: { f: 'string' } };

  const mergedWithoutClone = merge.all([firstObject, secondObject, thirdObject], { clone: false });

  tape.equal(mergedWithoutClone.a, firstObject.a);
  tape.equal(mergedWithoutClone.b, secondObject.b);
  tape.equal(mergedWithoutClone.c, thirdObject.c);

  tape.end();
});

test('invoke merge on every item in array without clone should clone all elements', tape => {
  const firstObject = { a: { d: 123 } };
  const secondObject = { b: { e: true } };
  const thirdObject = { c: { f: 'string' } };

  const mergedWithoutClone = merge.all([firstObject, secondObject, thirdObject]);

  tape.notEqual(mergedWithoutClone.a, firstObject.a);
  tape.notEqual(mergedWithoutClone.b, secondObject.b);
  tape.notEqual(mergedWithoutClone.c, thirdObject.c);

  tape.end();
});
