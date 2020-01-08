import { HopeVuepressConfig } from '../globals';

const resolveHead = (config: HopeVuepressConfig): void => {
  if (!config.head) config.head = [];

  const { head, headOption = {}, themeConfig } = config;
  const metaHash: Record<string, number> = {};
  const linkHash: Record<string, number> = {};

  // Generate Hash for Head
  head.forEach((item, index) => {
    if (item[0] === 'meta') metaHash[item[1].name] = index;
    else if (item[0] === 'link') linkHash[item[1].rel] = index;
  });

  const metaKeys = Object.keys(metaHash);
  const linkKeys = Object.keys(linkHash);

  // 生成网站图标
  if (!linkKeys.includes('icon') && headOption.icon)
    head.push(['link', { rel: 'icon', href: headOption.icon }]);

  // 生成作者
  if (!metaKeys.includes('author') && themeConfig.author)
    head.push(['meta', { name: 'author', content: themeConfig.author }]);

  // 加强移动端体验
  if (!metaKeys.includes('viewport') && themeConfig.author)
    head.push([
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]);
};

export default resolveHead;
