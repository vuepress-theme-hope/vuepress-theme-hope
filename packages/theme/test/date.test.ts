import { compareDate, getDate } from '../src/util/article';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('ArticleMixin Test', () => {
  describe('getDate()', () => {
    it('should parse day', () => {
      expect(getDate('2018-1-1')).to.be.deep.equal([
        2018,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate('2020/1/1')).to.be.deep.equal([
        2020,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate('2020-04-04T00:00:00.000Z')).to.be.deep.equal([
        2020,
        4,
        4,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate('1918-01-01')).to.be.deep.equal([
        1918,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate('2018/1/1')).to.be.deep.equal([
        2018,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate('1918/01/01')).to.be.deep.equal([
        1918,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate(' 2018-1-1 ')).to.be.deep.equal([
        2018,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate(' 1918-01-01')).to.be.deep.equal([
        1918,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate('  2018/1/1  ')).to.be.deep.equal([
        2018,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate('18/01/01 ')).to.be.deep.equal([
        2018,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
      expect(getDate('18-01-01')).to.be.deep.equal([
        2018,
        1,
        1,
        undefined,
        undefined,
        undefined
      ]);
    });

    it('should parse time', () => {
      expect(getDate('12:30')).to.be.deep.equal([
        undefined,
        undefined,
        undefined,
        12,
        30,
        undefined
      ]);
      expect(getDate('00:00')).to.be.deep.equal([
        undefined,
        undefined,
        undefined,
        0,
        0,
        undefined
      ]);
      expect(getDate('12:30:00')).to.be.deep.equal([
        undefined,
        undefined,
        undefined,
        12,
        30,
        0
      ]);
      expect(getDate('12:30:32')).to.be.deep.equal([
        undefined,
        undefined,
        undefined,
        12,
        30,
        32
      ]);
      expect(getDate('  12:30')).to.be.deep.equal([
        undefined,
        undefined,
        undefined,
        12,
        30,
        undefined
      ]);
      expect(getDate('00:00  ')).to.be.deep.equal([
        undefined,
        undefined,
        undefined,
        0,
        0,
        undefined
      ]);
      expect(getDate(' 12:30:00 ')).to.be.deep.equal([
        undefined,
        undefined,
        undefined,
        12,
        30,
        0
      ]);
      expect(getDate('   12:30:32   ')).to.be.deep.equal([
        undefined,
        undefined,
        undefined,
        12,
        30,
        32
      ]);
    });
    it('should parse whole date', () => {
      expect(getDate('2018/12/1 12:30')).to.be.deep.equal([
        2018,
        12,
        1,
        12,
        30,
        0
      ]);
      expect(getDate('  2018/12/01 12:30:00  ')).to.be.deep.equal([
        2018,
        12,
        1,
        12,
        30,
        0
      ]);
    });
  });

  it('compareDate()', () => {
    expect(compareDate('  2018/12/01 12:30:00  ', '12:30:32')).to.be.lessThan(
      0
    );
    expect(
      compareDate('  2018/12/01 12:30:00  ', ' 2019/12/01  12:30:32')
    ).to.be.greaterThan(0);
    expect(
      compareDate('2019-11-21T00:00:00.000Z', '2020-04-04T00:00:00.000Z')
    ).to.be.greaterThan(0);
    expect(
      compareDate('2020/1/1', '2020-04-04T00:00:00.000Z')
    ).to.be.greaterThan(0);
    expect(compareDate('  2018/01/01 12:30  ', '2018/1/1  12:30')).to.be.equal(
      0
    );
  });
});
