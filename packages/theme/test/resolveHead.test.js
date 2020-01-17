import { expect } from 'chai';
import resolveHead from '../src/lib/resolveHead';

describe('Test resolveHead function', () => {
  it('should generate icon and author because they do not exist', () => {
    const config = {
      theme: 'hope',
      headOption: {
        icon: '/favicon.ico'
      },
      themeConfig: {
        author: 'Mr.Hope'
      }
    };

    resolveHead(config);

    expect(config).to.be.deep.equal({
      theme: 'hope',
      head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'author', content: 'Mr.Hope' }],
        [
          'meta',
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
          }
        ]
      ],
      headOption: {
        icon: '/favicon.ico'
      },
      themeConfig: {
        author: 'Mr.Hope'
      }
    });
  });

  it('should not generate icon and author if them exist', () => {
    const config = {
      theme: 'hope',
      head: [
        ['link', { rel: 'icon', href: '/icon.ico' }],
        ['meta', { name: 'author', content: 'Mr.Hope' }]
      ],
      headOptions: {
        icon: '/favicon.ico'
      },
      themeConfig: {
        author: 'Ms.Hope'
      }
    };

    resolveHead(config);

    expect(config).to.be.deep.equal({
      theme: 'hope',
      head: [
        ['link', { rel: 'icon', href: '/icon.ico' }],
        ['meta', { name: 'author', content: 'Mr.Hope' }],
        [
          'meta',
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
          }
        ]
      ],
      headOptions: {
        icon: '/favicon.ico'
      },
      themeConfig: {
        author: 'Ms.Hope'
      }
    });
  });
});
