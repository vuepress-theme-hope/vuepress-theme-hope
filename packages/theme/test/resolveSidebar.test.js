import { expect } from 'chai';
import resolveSideBar from '../src/lib/resolveSideBar';

const sideBarConfig = {
  '/a/': [
    {
      title: 'a',
      icon: 'a',
      children: ['', '1']
    },
    {
      title: 'b',
      icon: 'b',
      prefix: 'b/',
      children: ['', '2', '3']
    }
  ],

  '/c/': [
    '',
    '1',
    {
      title: 'd',
      icon: 'd',
      prefix: 'd/',
      children: [
        '',
        {
          title: 'e',
          icon: 'e',
          prefix: 'e/',
          children: ['', '1', '2']
        }
      ]
    }
  ],

  '/': ['', '1', '2']
};

describe('Test prefix', () => {
  it('should resolve prefix and delete them', () => {
    const resolvedConfig = resolveSideBar(sideBarConfig);

    expect(resolvedConfig['/a/'][1]).to.be.deep.equal({
      title: 'b',
      icon: 'b',
      children: ['b/', 'b/2', 'b/3']
    });
  });

  it('should resolve nested sidebar', () => {
    const resolvedConfig = resolveSideBar(sideBarConfig);

    expect(resolvedConfig['/c/'][2]).to.be.deep.equal({
      title: 'd',
      icon: 'd',
      children: [
        'd/',
        {
          title: 'e',
          icon: 'e',
          children: ['d/e/', 'd/e/1', 'd/e/2']
        }
      ]
    });
  });
});
