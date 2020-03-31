import { MarkdownEnhanceOption } from '../types';
import { PluginConfig } from 'vuepress-types';
import { i18n } from '@mr-hope/vuepress-shared-utils';

// eslint-disable-next-line max-lines-per-function
const pluginConfig = (
  markdownOption: MarkdownEnhanceOption,
  themeConfig: Record<string, any>
): PluginConfig[] => {
  /** 多语言标题配置 */
  const containerConfig = i18n.config.container;
  const baseLang = markdownOption.baseLang || themeConfig.baseLang || 'zh-CN';
  /** 主目录语言对应路径 */
  const baseLangPath = i18n.lang2path(baseLang);

  /** 处理标题 */
  const resolveConfig = (
    titleConfig: Record<string, string>
  ): Record<string, string> => {
    titleConfig['/'] = titleConfig[baseLangPath];

    return titleConfig;
  };

  const config: PluginConfig[] = [
    /** typescript 支持 */
    ['typescript'],
    /** 自定义容器配置 */
    [
      'container',
      { type: 'tip', defaultTitle: resolveConfig(containerConfig.tip) }
    ],
    [
      'container',
      { type: 'warning', defaultTitle: resolveConfig(containerConfig.warning) }
    ],
    [
      'container',
      { type: 'danger', defaultTitle: resolveConfig(containerConfig.danger) }
    ],
    /** 自定义详情容器 */
    [
      'container',
      {
        type: 'details',
        before: (info: string): string =>
          `<details class="custom-block details"><summary>${
            info || 'Details'
          }</summary>\n`,
        after: (): string => '</details>\n'
      }
    ]
  ];

  // 支持自定义对齐
  if (markdownOption.align || markdownOption.enableAll)
    config.push(
      /** 自定义居右容器 */
      ['container', { type: 'right', defaultTitle: '' }],
      /** 自定义居中容器 */
      ['container', { type: 'center', defaultTitle: '' }]
    );

  return config;
};

export default pluginConfig;
