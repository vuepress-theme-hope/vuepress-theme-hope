import chalk from "chalk";
import ora from "ora";

export const load = (message: string, plugin = ""): ora.Ora =>
  ora(`${plugin ? `${chalk.blue(`${plugin}: `)}` : ""}${message}`);

export const warn = (message: string, plugin = ""): ora.Ora =>
  ora(`${plugin ? `${chalk.blue(`${plugin}: `)}` : ""}${message}`).warn();

export const error = (message: string, plugin = ""): ora.Ora =>
  ora(`${plugin ? `${chalk.blue(`${plugin}: `)}` : ""}${message}`).fail();

export const success = (message: string, plugin = ""): ora.Ora =>
  ora(`${plugin ? `${chalk.blue(`${plugin}: `)}` : ""}${message}`).succeed();
