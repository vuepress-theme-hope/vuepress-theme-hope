const merge = require('../deepmerge');
const test = require('tape');

test('add keys in target that do not exist at the root', tape => {
  const src = { key1: 'value1', key2: 'value2' };
  const target = {};

  const res = merge(target, src);

  tape.deepEqual(target, {}, 'merge should be immutable');
  tape.deepEqual(res, src);
  tape.end();
});

test('merge existing simple keys in target at the roots', tape => {
  const src = { key1: 'changed', key2: 'value2' };
  const target = { key1: 'value1', key3: 'value3' };

  const expected = {
    key1: 'changed',
    key2: 'value2',
    key3: 'value3'
  };

  tape.deepEqual(target, { key1: 'value1', key3: 'value3' });
  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('merge nested objects into target', tape => {
  const src = {
    key1: {
      subkey1: 'changed',
      subkey3: 'added'
    }
  };
  const target = {
    key1: {
      subkey1: 'value1',
      subkey2: 'value2'
    }
  };

  const expected = {
    key1: {
      subkey1: 'changed',
      subkey2: 'value2',
      subkey3: 'added'
    }
  };

  tape.deepEqual(target, {
    key1: {
      subkey1: 'value1',
      subkey2: 'value2'
    }
  });
  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('replace simple key with nested object in target', tape => {
  const src = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2'
    }
  };
  const target = {
    key1: 'value1',
    key2: 'value2'
  };

  const expected = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2'
    },
    key2: 'value2'
  };

  tape.deepEqual(target, { key1: 'value1', key2: 'value2' });
  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('should add nested object in target', tape => {
  const src = {
    b: {
      c: {}
    }
  };

  const target = {
    a: {}
  };

  const expected = {
    a: {},
    b: {
      c: {}
    }
  };

  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('should clone source and target', tape => {
  const src = {
    b: {
      c: 'foo'
    }
  };

  const target = {
    a: {
      d: 'bar'
    }
  };

  const expected = {
    a: {
      d: 'bar'
    },
    b: {
      c: 'foo'
    }
  };

  const merged = merge(target, src, { clone: true });

  tape.deepEqual(merged, expected);

  tape.notEqual(merged.a, target.a);
  tape.notEqual(merged.b, src.b);

  tape.end();
});

test('should clone source and target', tape => {
  const src = {
    b: {
      c: 'foo'
    }
  };

  const target = {
    a: {
      d: 'bar'
    }
  };

  const merged = merge(target, src);
  tape.notEqual(merged.a, target.a);
  tape.notEqual(merged.b, src.b);

  tape.end();
});

test('should replace object with simple key in target', tape => {
  const src = { key1: 'value1' };
  const target = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2'
    },
    key2: 'value2'
  };

  const expected = { key1: 'value1', key2: 'value2' };

  tape.deepEqual(target, {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2'
    },
    key2: 'value2'
  });
  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('should replace objects with arrays', tape => {
  const target = { key1: { subkey: 'one' } };

  const src = { key1: ['subkey'] };

  const expected = { key1: ['subkey'] };

  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('should replace arrays with objects', tape => {
  const target = { key1: ['subkey'] };

  const src = { key1: { subkey: 'one' } };

  const expected = { key1: { subkey: 'one' } };

  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('should replace dates with arrays', tape => {
  const target = { key1: new Date() };

  const src = { key1: ['subkey'] };

  const expected = { key1: ['subkey'] };

  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('should replace null with arrays', tape => {
  const target = {
    key1: null
  };

  const src = {
    key1: ['subkey']
  };

  const expected = {
    key1: ['subkey']
  };

  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('should work on simple array', tape => {
  const src = ['one', 'three'];
  const target = ['one', 'two'];

  const expected = ['one', 'two', 'one', 'three'];

  tape.deepEqual(merge(target, src), expected);
  tape.ok(Array.isArray(merge(target, src)));
  tape.end();
});

test('should work on another simple array', tape => {
  const target = ['a1', 'a2', 'c1', 'f1', 'p1'];
  const src = ['t1', 's1', 'c2', 'r1', 'p2', 'p3'];

  const expected = [
    'a1',
    'a2',
    'c1',
    'f1',
    'p1',
    't1',
    's1',
    'c2',
    'r1',
    'p2',
    'p3'
  ];
  tape.deepEqual(target, ['a1', 'a2', 'c1', 'f1', 'p1']);
  tape.deepEqual(merge(target, src), expected);
  tape.ok(Array.isArray(merge(target, src)));
  tape.end();
});

test('should work on array properties', tape => {
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

  tape.deepEqual(merge(target, src), expected);
  tape.ok(Array.isArray(merge(target, src).key1));
  tape.ok(Array.isArray(merge(target, src).key2));
  tape.end();
});

test('should work on array properties with clone option', tape => {
  const src = {
    key1: ['one', 'three'],
    key2: ['four']
  };
  const target = {
    key1: ['one', 'two']
  };

  tape.deepEqual(target, {
    key1: ['one', 'two']
  });
  const merged = merge(target, src, { clone: true });
  tape.notEqual(merged.key1, src.key1);
  tape.notEqual(merged.key1, target.key1);
  tape.notEqual(merged.key2, src.key2);
  tape.end();
});

test('should work on array of objects', tape => {
  const src = [{ key1: ['one', 'three'], key2: ['one'] }, { key3: ['five'] }];
  const target = [{ key1: ['one', 'two'] }, { key3: ['four'] }];

  const expected = [
    { key1: ['one', 'two'] },
    { key3: ['four'] },
    { key1: ['one', 'three'], key2: ['one'] },
    { key3: ['five'] }
  ];

  tape.deepEqual(merge(target, src), expected);
  tape.ok(Array.isArray(merge(target, src)), 'result should be an array');
  tape.ok(
    Array.isArray(merge(target, src)[0].key1),
    'subkey should be an array too'
  );

  tape.end();
});

test('should work on array of objects with clone option', tape => {
  const src = [{ key1: ['one', 'three'], key2: ['one'] }, { key3: ['five'] }];
  const target = [{ key1: ['one', 'two'] }, { key3: ['four'] }];

  const expected = [
    { key1: ['one', 'two'] },
    { key3: ['four'] },
    { key1: ['one', 'three'], key2: ['one'] },
    { key3: ['five'] }
  ];

  const merged = merge(target, src, { clone: true });
  tape.deepEqual(merged, expected);
  tape.ok(Array.isArray(merge(target, src)), 'result should be an array');
  tape.ok(
    Array.isArray(merge(target, src)[0].key1),
    'subkey should be an array too'
  );
  tape.notEqual(merged[0].key1, src[0].key1);
  tape.notEqual(merged[0].key1, target[0].key1);
  tape.notEqual(merged[0].key2, src[0].key2);
  tape.notEqual(merged[1].key3, src[1].key3);
  tape.notEqual(merged[1].key3, target[1].key3);
  tape.end();
});

test('should treat regular expressions like primitive values', tape => {
  const target = { key1: /abc/ };
  const src = { key1: /efg/ };
  const expected = { key1: /efg/ };

  tape.deepEqual(merge(target, src), expected);
  tape.deepEqual(merge(target, src).key1.test('efg'), true);
  tape.end();
});

test(
  'should treat regular expressions like primitive values and should not' +
    ' clone even with clone option',
  tape => {
    const target = { key1: /abc/ };
    const src = { key1: /efg/ };

    const output = merge(target, src, { clone: true });

    tape.equal(output.key1, src.key1);
    tape.end();
  }
);

test('should treat dates like primitives', tape => {
  const monday = new Date('2016-09-27T01:08:12.761Z');
  const tuesday = new Date('2016-09-28T01:18:12.761Z');

  const target = {
    key: monday
  };
  const source = {
    key: tuesday
  };

  const expected = {
    key: tuesday
  };
  const actual = merge(target, source);

  tape.deepEqual(actual, expected);
  tape.equal(actual.key.valueOf(), tuesday.valueOf());
  tape.end();
});

test('should treat dates like primitives and should not clone even with clone option', tape => {
  const monday = new Date('2016-09-27T01:08:12.761Z');
  const tuesday = new Date('2016-09-28T01:18:12.761Z');

  const target = {
    key: monday
  };
  const source = {
    key: tuesday
  };

  const actual = merge(target, source, { clone: true });

  tape.equal(actual.key, tuesday);
  tape.end();
});

test('should work on array with null in it', tape => {
  const target = [];

  const src = [null];

  const expected = [null];

  tape.deepEqual(merge(target, src), expected);
  tape.end();
});

test('should clone array\'s element if it is object', tape => {
  const a = { key: 'yup' };
  const target = [];
  const source = [a];

  const output = merge(target, source, { clone: true });

  tape.notEqual(output[0], a);
  tape.equal(output[0].key, 'yup');
  tape.end();
});

test('should clone an array property when there is no target array', tape => {
  const someObject = {};
  const target = {};
  const source = { ary: [someObject] };
  const output = merge(target, source, { clone: true });

  tape.deepEqual(output, { ary: [{}] });
  tape.notEqual(output.ary[0], someObject);
  tape.end();
});

test('should overwrite values when property is initialised but undefined', tape => {
  const target1 = { value: [] };
  const target2 = { value: null };
  const target3 = { value: 2 };

  const src = { value: undefined };

  const hasUndefinedProperty = o => {
    tape.ok(o.hasOwnProperty('value'));
    tape.equal(typeof o.value, 'undefined');
  };

  hasUndefinedProperty(merge(target1, src));
  hasUndefinedProperty(merge(target2, src));
  hasUndefinedProperty(merge(target3, src));

  tape.end();
});

test('dates should copy correctly in an array', tape => {
  const monday = new Date('2016-09-27T01:08:12.761Z');
  const tuesday = new Date('2016-09-28T01:18:12.761Z');

  const target = [monday, 'dude'];
  const source = [tuesday, 'lol'];

  const expected = [monday, 'dude', tuesday, 'lol'];
  const actual = merge(target, source);

  tape.deepEqual(actual, expected);
  tape.end();
});

test('should handle custom merge functions', tape => {
  const target = {
    letters: ['a', 'b'],
    people: {
      first: 'Alex',
      second: 'Bert'
    }
  };

  const source = {
    letters: ['c'],
    people: {
      first: 'Smith',
      second: 'Bertson',
      third: 'Car'
    }
  };

  const mergePeople = (target, source, options) => {
    const keys = new Set(Object.keys(target).concat(Object.keys(source)));
    const destination = {};
    keys.forEach(key => {
      if (key in target && key in source)
        destination[key] = `${target[key]}-${source[key]}`;
      else if (key in target) destination[key] = target[key];
      else destination[key] = source[key];
    });
    return destination;
  };

  const options = {
    customMerge: (key, options) => {
      if (key === 'people') return mergePeople;

      return merge;
    }
  };

  const expected = {
    letters: ['a', 'b', 'c'],
    people: {
      first: 'Alex-Smith',
      second: 'Bert-Bertson',
      third: 'Car'
    }
  };

  const actual = merge(target, source, options);
  tape.deepEqual(actual, expected);
  tape.end();
});

test('should handle custom merge functions', tape => {
  const target = {
    letters: ['a', 'b'],
    people: {
      first: 'Alex',
      second: 'Bert'
    }
  };

  const source = {
    letters: ['c'],
    people: {
      first: 'Smith',
      second: 'Bertson',
      third: 'Car'
    }
  };

  const mergeLetters = (target, source, options) => {
    return 'merged letters';
  };

  const options = {
    customMerge: (key, options) => {
      if (key === 'letters') return mergeLetters;
    }
  };

  const expected = {
    letters: 'merged letters',
    people: {
      first: 'Smith',
      second: 'Bertson',
      third: 'Car'
    }
  };

  const actual = merge(target, source, options);
  tape.deepEqual(actual, expected);
  tape.end();
});

test('should merge correctly if custom merge is not a valid function', tape => {
  const target = {
    letters: ['a', 'b'],
    people: {
      first: 'Alex',
      second: 'Bert'
    }
  };

  const source = {
    letters: ['c'],
    people: {
      first: 'Smith',
      second: 'Bertson',
      third: 'Car'
    }
  };

  const options = {
    customMerge: (key, options) => {
      return false;
    }
  };

  const expected = {
    letters: ['a', 'b', 'c'],
    people: {
      first: 'Smith',
      second: 'Bertson',
      third: 'Car'
    }
  };

  const actual = merge(target, source, options);
  tape.deepEqual(actual, expected);
  tape.end();
});

test('copy symbol keys in target that do not exist on the target', tape => {
  const mySymbol = Symbol();
  const src = { [mySymbol]: 'value1' };
  const target = {};

  const res = merge(target, src);

  tape.equal(res[mySymbol], 'value1');
  tape.deepEqual(
    Object.getOwnPropertySymbols(res),
    Object.getOwnPropertySymbols(src)
  );
  tape.end();
});

test('copy symbol keys in target that do exist on the target', tape => {
  const mySymbol = Symbol();
  const src = { [mySymbol]: 'value1' };
  const target = { [mySymbol]: 'wat' };

  const res = merge(target, src);

  tape.equal(res[mySymbol], 'value1');
  tape.end();
});

test('Falsey properties should be mergeable', tape => {
  const uniqueValue = {};

  const target = {
    wat: false
  };

  const source = {
    wat: false
  };

  let customMergeWasCalled = false;

  const result = merge(target, source, {
    isMergeableObject: () => true,
    customMerge: () => () => {
      customMergeWasCalled = true;
      return uniqueValue;
    }
  });

  tape.equal(result.wat, uniqueValue);
  tape.ok(customMergeWasCalled, 'custom merge function was called');
  tape.end();
});
