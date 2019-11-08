const merge = require('../deepmerge');
const test = require('tape');

test('custom merge array', tape => {
  let mergeFunctionCalled = false;
  const overwriteMerge = (target, source, options) => {
    mergeFunctionCalled = true;
    tape.equal(options.arrayMerge, overwriteMerge);

    return source;
  };
  const destination = {
    someArray: [1, 2],
    someObject: { what: 'yes' }
  };
  const source = {
    someArray: [1, 2, 3]
  };

  const actual = merge(destination, source, { arrayMerge: overwriteMerge });
  const expected = {
    someArray: [1, 2, 3],
    someObject: { what: 'yes' }
  };

  tape.ok(mergeFunctionCalled);
  tape.deepEqual(actual, expected);
  tape.end();
});

test('merge top-level arrays', tape => {
  const overwriteMerge = (a, b) => b;
  const actual = merge([1, 2], [1, 2], { arrayMerge: overwriteMerge });
  const expected = [1, 2];

  tape.deepEqual(actual, expected);
  tape.end();
});

test('cloner function is available for merge functions to use', tape => {
  let customMergeWasCalled = false;
  const cloneMerge = (target, source, options) => {
    customMergeWasCalled = true;
    tape.ok(
      options.cloneUnlessOtherwiseSpecified,
      'cloner function is available'
    );
    return target
      .concat(source)
      .map(element => options.cloneUnlessOtherwiseSpecified(element, options));
  };

  const src = {
    key1: ['one', 'three'],
    key2: ['four']
  };
  const target = {
    key1: ['one', 'two']
  };

  const expected = {
    key1: ['one', 'two', 'one', 'three'],
    key2: ['four']
  };

  tape.deepEqual(merge(target, src, { arrayMerge: cloneMerge }), expected);
  tape.ok(customMergeWasCalled);
  tape.ok(Array.isArray(merge(target, src).key1));
  tape.ok(Array.isArray(merge(target, src).key2));
  tape.end();
});
