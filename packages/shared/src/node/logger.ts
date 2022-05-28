import { chalk } from "@vuepress/utils";
import { default as ora } from "ora";

/**
 * Shell Logger
 */
export class Logger {
  private currentInstance: ora.Ora | null = ora();
  constructor(
    /**
     * Plugin name
     */
    private name = ""
  ) {}

  /**
   * Create a loading spinner with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  create(text: string): ora.Ora {
    this.currentInstance = ora({
      prefixText: chalk.blue(`${this.name}: `) || "",
      text,
    });

    return this.currentInstance;
  }

  /**
   * Update current loading spinner text
   *
   * @param text new hint text
   */
  update(text: string): void {
    if (this.currentInstance) this.currentInstance.text = text;
    else this.create(text);
  }

  /**
   * Trigger current instance to loading state or create a new loading spinner with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  load(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).start();
  }

  /**
   * Trigger current instance to info state or create a new info icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  info(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).info();
  }

  /**
   * Trigger current instance to success state or create a new success icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  succeed(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).succeed();
  }

  /**
   * Trigger current instance to warn state or create a new warn icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  warn(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).warn();
  }

  /**
   * Trigger current instance to warn state or create a new warn icon with hint text
   *
   * @param text Loading hint text
   * @returns Ora Instance
   */
  error(text = ""): ora.Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).fail();
  }
}
