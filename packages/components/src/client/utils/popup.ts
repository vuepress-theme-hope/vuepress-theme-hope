import { keys } from "@vuepress/helper/client";

export class Popup {
  private containerElement: HTMLElement;
  private popupElements = new Map<number, HTMLDivElement>();

  // Generate or make sure popup container element
  constructor() {
    const containerId = "popup-container";
    const containerElement = document.querySelector<HTMLElement>(`#${containerId}`);

    if (containerElement) {
      this.containerElement = containerElement;
    } else {
      this.containerElement = document.createElement("div");
      this.containerElement.id = containerId;
      document.body.append(this.containerElement);
    }
  }

  emit(html: string, duration?: number): number {
    const popupWrapperElement = document.createElement("div");
    const popupElement = document.createElement("div");
    const popupId = Date.now();

    this.containerElement.append(popupWrapperElement);
    this.popupElements.set(popupId, popupWrapperElement);
    popupWrapperElement.className = "popup-wrapper appear";
    popupWrapperElement.append(popupElement);
    popupWrapperElement.addEventListener("click", () => {
      this.close(popupId);
    });
    popupElement.className = "popup-container";
    popupElement.innerHTML = html;

    if (typeof duration === "number") {
      setTimeout(() => {
        this.close(popupId);
      }, duration);
    }

    return popupId;
  }

  close(popupId?: number): void {
    if (popupId) {
      const popupWrapperElement = this.popupElements.get(popupId);

      if (!popupWrapperElement) return;

      popupWrapperElement.classList.replace("appear", "disappear");

      popupWrapperElement.children[0].addEventListener("animationend", () => {
        popupWrapperElement.remove();
        this.popupElements.delete(popupId);
      });
    } else {
      keys(this.popupElements).forEach((id) => {
        this.close(Number(id));
      });
    }
  }

  destroy(): void {
    this.containerElement.remove();
  }
}
