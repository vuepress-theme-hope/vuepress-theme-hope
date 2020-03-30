/* eslint-disable guard-for-in */
import * as fs from 'fs';
import { deepAssign } from '@mr-hope/vuepress-shared-utils/src/assign';
import { resolve } from 'path';

const capitalize = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

interface ColorOption {
  '--accent-color'?: string;
  '--theme-color'?: Record<string, string>;
  light: Record<string, string>;
  dark: Record<string, string>;
}

const defaultConfig = {
  '--accent-color': '#3eaf7c',
  light: {
    '--black': '#000',
    '--text-color': '#2c3e50',
    '--background-color': '#fff',
    '--border-color': '#eaecef',
    '--code-bg-color': '#ecf4fa',
    '--arrow-bg-color': '#ccc',
    '--dark-grey': '#666',
    '--grey3': '#333',
    '--grey15': '#eee',
    '--light-grey': '#999',
    '--box-shadow-color': '#f0f1f2',
    '--card-shadow-color': 'rgba(0, 0, 0, 0.15)'
  },
  dark: {
    '--black': '#fff',
    '--text-color': '#9e9e9e',
    '--background-color': '#181818',
    '--border-color': '#151310',
    '--code-bg-color': '#282c34',
    '--arrow-bg-color': '#666',
    '--dark-grey': '#999',
    '--grey3': '#ccc',
    '--grey15': '#111',
    '--light-grey': '#666',
    '--box-shadow-color': '#0f0e0d',
    '--card-shadow-color': 'rgba(255, 255, 255, 0.15)'
  }
};

const patternMap: Record<string, string> = {
  textColor: '--text-color',
  bgColor: '--background-color',
  borderColor: '--border-color',
  codeBgColor: '--code-bg-color',
  arrowBgColor: '--arrow-bg-color',
  boxShadowColor: '--box-shadow-color',
  cardShadowColor: '--card-shadow-color'
};

// eslint-disable-next-line max-lines-per-function
export const handleVar = (content: string): ColorOption => {
  const accentColorPattern = /\$accentColor(?:\s*)?\??=(?:\s*)?(.*)?(?:\s*)?\n/u;
  const themeColorPattern = /\$themeColor(?:\s*)?\??=(?:\s*)?\{(\n|.*)?\}/u;
  const result: ColorOption = {
    light: {},
    dark: {}
  };

  // 处理主题色
  const accentColorResult = content.match(accentColorPattern);
  if (accentColorResult) result['--accent-color'] = accentColorResult[1];

  // TODO: 处理主题色

  /*
   * const themeColorResult = content.match(themeColorPattern);
   * if (themeColorResult) {
   *   const propertyPattern = /^(?:\s*)?(.*)?(?:\s*)?:(?:\s*)?(.*?)(?:\s*)?,?\n/gu;
   *   const contentResult = themeColorResult[0].match(propertyPattern);
   *   console.log(contentResult);
   * }
   */

  // 处理其他颜色
  for (const pattern in patternMap) {
    const lightResult = RegExp(
      `\\$${pattern}(?:\\s*)?\\??=(?:\\s*)?(.+)?(?:\\s*)?\\n`,
      'gu'
    ).exec(content);
    const darkResult = RegExp(
      `\\$night${capitalize(pattern)}(?:\\s*)?\\??=(?:\\s*)?(.+)?(?:\\s*)?\\n`,
      'gu'
    ).exec(content);

    if (lightResult) result.light[patternMap[pattern]] = lightResult[1];
    if (darkResult) result.dark[patternMap[pattern]] = darkResult[1];
  }

  return result;
};

const stylusParser = (filePath: string): ColorOption => {
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return handleVar(content);
};

const getPalette = (sourceDir: string): ColorOption => {
  const userPalettePath = resolve(sourceDir, './.vuepress/styles/palette.styl');
  const localThemePalettePath = resolve(
    sourceDir,
    './.vuepress/theme/styles/palette.styl'
  );
  const isUserPalette = fs.existsSync(userPalettePath);
  const isLocalThemePalettePath = fs.existsSync(localThemePalettePath);
  const colorConfig = deepAssign(
    defaultConfig,
    isLocalThemePalettePath ? stylusParser(localThemePalettePath) : {},
    isUserPalette ? stylusParser(userPalettePath) : {}
  );

  return colorConfig;
};

export default getPalette;
