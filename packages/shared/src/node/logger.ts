import chalk from "chalk";
import ora from "ora";

export class Logger {
  private currentInstance: ora.Ora | null = ora();
  constructor(private name = "") {}

  create(text: string): ora.Ora {
    this.currentInstance = ora({
      prefixText: chalk.blue(`${this.name}: `) || "",
      text,
    });

    return this.currentInstance;
  }

  update(text: string): void {
    if (this.currentInstance) this.currentInstance.text = text;
    else this.create(text);
  }

  load(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).start();
  }

  info(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).info();
  }

  success(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).succeed();
  }

  warn(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).warn();
  }

  error(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).fail();
  }
}
