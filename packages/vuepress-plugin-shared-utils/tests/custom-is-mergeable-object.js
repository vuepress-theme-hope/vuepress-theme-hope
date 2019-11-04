const merge = require('../');
const test = require('tape');

test('isMergeableObject function copying object over object', tape => {
  const src = { key: { isMergeable: false }, baz: 'yes' };
  const target = { key: { foo: 'wat' }, baz: 'whatever' };

  const isMergeableObject = object => object && typeof value === 'object' && object.isMergeable !== false;

  const res = merge(target, src, {
    isMergeableObject
  });

  tape.deepEqual(res, { key: { isMergeable: false }, baz: 'yes' });
  tape.equal(res.key, src.key, 'Object has the same identity and was not cloned');
  tape.end();
});

test('isMergeableObject function copying object over nothing', tape => {
  const src = { key: { isMergeable: false, foo: 'bar' }, baz: 'yes' };
  const target = { baz: 'whatever' };

  const isMergeableObject = object => object && typeof value === 'object' && object.isMergeable !== false;

  const res = merge(target, src, {
    isMergeableObject
  });

  tape.deepEqual(res, { key: { isMergeable: false, foo: 'bar' }, baz: 'yes' });
  tape.equal(res.key, src.key, 'Object has the same identity and was not cloned');
  tape.end();
});
