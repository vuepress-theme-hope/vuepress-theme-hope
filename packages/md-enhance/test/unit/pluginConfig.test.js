import { expect } from 'chai';
import resolveConfig from '../../src/pluginConfig';

describe('Test pluginConfig generate', () => {
  it('Should use plugin options first', () => {
    const option =  true

    const themeConfig = {
      markdown: false
    };

    const pluginConfig = resolveConfig(option, themeConfig);

    pluginConfig.splice(4, 1);

    expect(pluginConfig).to.be.deep.equal([
      ['typescript'],
      [
        'container',
        {
          type: 'tip',
          defaultTitle: {
            '/': '提示',
            '/zh/': '提示',
            '/en/': 'Tips'
          }
        }
      ],
      [
        'container',
        {
          type: 'warning',
          defaultTitle: {
            '/': '注意',
            '/zh/': '注意',
            '/en/': 'Note'
          }
        }
      ],
      [
        'container',
        {
          type: 'danger',
          defaultTitle: {
            '/': '警告',
            '/zh/': '警告',
            '/en/': 'Warning'
          }
        }
      ],
      ['container', { type: 'right', defaultTitle: '' }],
      ['container', { type: 'center', defaultTitle: '' }],
    ]);
  });

  it('should handle baseLang option', () => {
    const option = true

    const themeConfig = {
      baseLang: 'en-US'
    };

    const pluginConfig = resolveConfig(option, themeConfig);

    pluginConfig.splice(4, 1);

    expect(pluginConfig).to.be.deep.equal([
      ['typescript'],
      [
        'container',
        {
          type: 'tip',
          defaultTitle: {
            '/': 'Tips',
            '/zh/': '提示',
            '/en/': 'Tips'
          }
        }
      ],
      [
        'container',
        {
          type: 'warning',
          defaultTitle: {
            '/': 'Note',
            '/zh/': '注意',
            '/en/': 'Note'
          }
        }
      ],
      [
        'container',
        {
          type: 'danger',
          defaultTitle: {
            '/': 'Warning',
            '/zh/': '警告',
            '/en/': 'Warning'
          }
        }
      ],
      ['container', { type: 'right', defaultTitle: '' }],
      ['container', { type: 'center', defaultTitle: '' }]
    ]);
  });
});
