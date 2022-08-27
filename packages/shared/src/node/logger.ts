import { chalk } from "@vuepress/utils";
import ora from "ora";
import type { Ora } from "ora";

/**
 * Shell Logger
 */
export class Logger {
  private currentInstance: Ora | null = ora();
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
  create(text: string): Ora {
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
  load(text = ""): Ora {
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
  info(text = ""): Ora {
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
  succeed(text = ""): Ora {
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
  warn(text = ""): Ora {
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
  error(text = ""): Ora {
    return (
      !text && this.currentInstance ? this.currentInstance : this.create(text)
    ).fail();
  }
}
