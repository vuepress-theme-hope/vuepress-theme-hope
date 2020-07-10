const execa = require("execa");
const inquirer = require("inquirer");

const test = async () => {
  /** 插件名称 */
  const name = ["comment", "md-enhance"];

  /** 动作 */
  const actions = ["serve", "clean-serve", "build"];

  /** 包名称 */
  const packageName = {
    comment: "@mr-hope/vuepress-plugin-comment",
    "md-enhance": "vuepress-plugin-md-enhance",
  };

  const { shortName, action } = await inquirer.prompt([
    {
      name: "shortName",
      message: "Select package name:",
      type: "list",
      choices: name,
    },
    {
      name: "action",
      message: "Choose your action",
      type: "list",
      default: "serve",
      choices: actions,
    },
  ]);

  const process = execa("yarn", ["workspace", packageName[shortName], action]);

  process.stdout.pipe(process.stdout);

  const { stdout } = await process;
  console.log("child output:", stdout);
};

test().catch((err) => {
  console.error(err);
  process.exit(1);
});
