/*
 * @Author: Mr.Hope
 * @Date: 2019-11-05 12:27:15
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-07 18:01:29
 * @Description: 开发或构建文档
 */

const execa = require('execa');
const inquirer = require('inquirer');

// eslint-disable-next-line max-lines-per-function
const test = async () => {
  /** 插件名称 */
  const name = ['comment', 'md-enhance'];

  /** 动作 */
  const actions = ['serve', 'clean-serve', 'build'];

  /** 包名称 */
  const packageName = {
    comment: '@mr-hope/vuepress-plugin-comment',
    'md-enhance': 'vuepress-plugin-md-enhance'
  };

  const { shortName, action } = await inquirer.prompt([
    {
      name: 'shortName',
      message: 'Select package name:',
      type: 'list',
      choices: name
    },
    {
      name: 'action',
      message: 'Choose your action',
      type: 'list',
      default: 'serve',
      choices: actions
    }
  ]);

  const process = execa('yarn', ['workspace', packageName[shortName], action]);

  process.stdout.pipe(process.stdout);

  const { stdout } = await process;
  console.log('child output:', stdout);
};

test().catch((err) => {
  console.error(err);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
