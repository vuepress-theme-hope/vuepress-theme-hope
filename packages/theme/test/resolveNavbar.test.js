import { expect } from 'chai';
import resolveNavbar from '../src/lib/resolveNavBar';

describe('Test prefix', () => {
  it('should resolve prefix and delete them', () => {
    const navbarConfig = [
      { text: '主页', link: '/', icon: 'homefill' },
      {
        text: '基础',
        icon: 'infofill',
        prefix: '/basic/',
        items: [
          { text: 'Markdown', link: 'markdown', icon: 'markdown' },
          { text: 'Vuepress', link: 'vuepress/', icon: 'vue' }
        ]
      }
    ];
    const resolvedConfig = resolveNavbar(navbarConfig);

    expect(resolvedConfig).to.be.deep.equal([
      { text: '主页', link: '/', icon: 'homefill' },
      {
        text: '基础',
        icon: 'infofill',
        items: [
          { text: 'Markdown', link: '/basic/markdown', icon: 'markdown' },
          { text: 'Vuepress', link: '/basic/vuepress/', icon: 'vue' }
        ]
      }
    ]);
  });

  it('should resolve nested navbar', () => {
    const navbarConfig = [
      { text: '主页', link: '/', icon: 'homefill' },
      {
        text: '基础',
        icon: 'infofill',
        prefix: '/basic/',
        items: [
          {
            text: 'Markdown',
            link: 'markdown',
            icon: 'markdown',
            prefix: 'markdown/',
            items: [
              { text: 'Markdown1', link: '1' },
              { text: 'Markdown2', link: '2' }
            ]
          },
          { text: 'Vuepress', link: 'vuepress/', icon: 'vue' }
        ]
      }
    ];
    const resolvedConfig = resolveNavbar(navbarConfig);

    expect(resolvedConfig).to.be.deep.equal([
      { text: '主页', link: '/', icon: 'homefill' },
      {
        text: '基础',
        icon: 'infofill',
        items: [
          {
            text: 'Markdown',
            link: '/basic/markdown',
            icon: 'markdown',
            items: [
              { text: 'Markdown1', link: '/basic/markdown/1' },
              { text: 'Markdown2', link: '/basic/markdown/2' }
            ]
          },
          { text: 'Vuepress', link: '/basic/vuepress/', icon: 'vue' }
        ]
      }
    ]);
  });

  it('should resolve deep nested navbar', () => {
    const navbarConfig = [
      { text: '主页', link: '/', icon: 'homefill' },
      {
        text: '基础',
        icon: 'infofill',
        items: [
          {
            text: 'Markdown',
            link: '/basic/markdown',
            icon: 'markdown',
            prefix: '/basic/markdown/',
            items: [
              { text: 'Markdown1', link: '1' },
              { text: 'Markdown2', link: '2' }
            ]
          },
          { text: 'Vuepress', link: '/basic/vuepress/', icon: 'vue' }
        ]
      }
    ];
    const resolvedConfig = resolveNavbar(navbarConfig);

    expect(resolvedConfig).to.be.deep.equal([
      { text: '主页', link: '/', icon: 'homefill' },
      {
        text: '基础',
        icon: 'infofill',
        items: [
          {
            text: 'Markdown',
            link: '/basic/markdown',
            icon: 'markdown',
            items: [
              { text: 'Markdown1', link: '/basic/markdown/1' },
              { text: 'Markdown2', link: '/basic/markdown/2' }
            ]
          },
          { text: 'Vuepress', link: '/basic/vuepress/', icon: 'vue' }
        ]
      }
    ]);
  });
});
