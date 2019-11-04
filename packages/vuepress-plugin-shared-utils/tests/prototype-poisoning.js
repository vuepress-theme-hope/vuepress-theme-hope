const merge = require('../');
const test = require('tape');
const { isMergeableObject } = merge;

test('merging objects with own __proto__', tape => {
  const user = {};
  const malicious = JSON.parse('{ "__proto__": { "admin": true } }');
  const mergedObject = merge(user, malicious);
  tape.notOk(mergedObject.__proto__.admin, 'non-plain properties should not be merged');
  tape.notOk(mergedObject.admin, 'the destination should have an unmodified prototype');
  tape.end();
});

test('merging objects with plain and non-plain properties', tape => {
  const plainSymbolKey = Symbol('plainSymbolKey');
  const parent = {
    parentKey: 'should be undefined'
  };

  const target = Object.create(parent);
  target.plainKey = 'should be replaced';
  target[plainSymbolKey] = 'should also be replaced';

  const source = {
    parentKey: 'foo',
    plainKey: 'bar',
    newKey: 'baz',
    [plainSymbolKey]: 'qux'
  };

  const mergedObject = merge(target, source);
  tape.equal(
    undefined,
    mergedObject.parentKey,
    'inherited properties of target should be removed, not merged or ignored'
  );
  tape.equal('bar', mergedObject.plainKey, 'enumerable own properties of target should be merged');
  tape.equal('baz', mergedObject.newKey, 'properties not yet on target should be merged');
  tape.equal('qux', mergedObject[plainSymbolKey], 'enumerable own symbol properties of target should be merged');
  tape.end();
});

// the following cases come from the thread here: https://github.com/TehShrike/deepmerge/pull/164
test('merging strings works with a custom string merge', tape => {
  const target = { name: 'Alexander' };
  const source = { name: 'Hamilton' };
  const customMerge = (key, options) => {
    if (key === 'name') return (target, source, options) => `${target[0]}. ${source.substring(0, 3)}`;

    return merge;
  };

  const mergeable = target => isMergeableObject(target) || (typeof target === 'string' && target.length > 1);

  tape.equal('A. Ham', merge(target, source, { customMerge, isMergeableObject: mergeable }).name);
  tape.end();
});

test('merging objects with null prototype', tape => {
  const target = Object.create(null);
  const source = Object.create(null);
  target.wheels = 4;
  target.trunk = { toolbox: ['hammer'] };
  source.trunk = { toolbox: ['wrench'] };
  source.engine = 'v8';
  const expected = {
    wheels: 4,
    engine: 'v8',
    trunk: {
      toolbox: ['hammer', 'wrench']
    }
  };

  tape.deepEqual(expected, merge(target, source));
  tape.end();
});
