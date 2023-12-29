declare module "kotlin-playground" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type KotlinPlaygroundInstance = any;

  export interface KotlinPlaygroundOptions {
    server?: string;
    version?: string;

    onChange?: (code: string) => void;
    onRun?: () => void;
    onError?: () => void;
    getJsCode?: (code: string) => void;
    onTestPassed?: () => void;
    onTestFailed?: () => void;
    onOpenConsole?: () => void;
    onCloseConsole?: () => void;
    callback?: (targetNode: HTMLElement, mountNode: HTMLElement) => void;
    getInstance?: (instance: KotlinPlaygroundInstance) => void;
  }

  export default function playground(
    selector: string | HTMLElement,
    options?: KotlinPlaygroundOptions,
  ): void;
}
