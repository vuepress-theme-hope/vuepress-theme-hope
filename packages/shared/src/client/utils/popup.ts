import { keys } from "@vuepress/helper/client";

export class Popup {
  private containerElement: HTMLElement;
  private popupElements: Record<number, HTMLDivElement> = {};

  // Generate or make sure popup container element
  constructor() {
    const containerId = "popup-container";
    const containerElement = document.getElementById(containerId);

    if (containerElement) {
      this.containerElement = containerElement;
    } else {
      this.containerElement = document.createElement("div");
      this.containerElement.id = containerId;
      document.body.appendChild(this.containerElement);
    }
  }

  emit(html: string, duration?: number): number {
    const popupWrapperElement = document.createElement("div");
    const popupElement = document.createElement("div");
    const popupId = Date.now();

    this.containerElement.appendChild(popupWrapperElement);
    this.popupElements[popupId] = popupWrapperElement;
    popupWrapperElement.className = "popup-wrapper appear";
    popupWrapperElement.appendChild(popupElement);
    popupWrapperElement.addEventListener("click", () => this.close(popupId));
    popupElement.className = "popup-container";
    popupElement.innerHTML = html;

    if (typeof duration === "number")
      setTimeout(() => {
        this.close(popupId);
      }, duration);

    return popupId;
  }

  close(popupId?: number): void {
    if (popupId) {
      const popupWrapperElement = this.popupElements[popupId];

      popupWrapperElement.classList.replace("appear", "disappear");

      popupWrapperElement.children[0].addEventListener("animationend", () => {
        popupWrapperElement.remove();
        delete this.popupElements[popupId];
      });
    } else {
      keys(this.popupElements).forEach((id) => this.close(Number(id)));
    }
  }

  destroy(): void {
    document.body.removeChild(this.containerElement);
  }
}
