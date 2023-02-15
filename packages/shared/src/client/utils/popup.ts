import { keys } from "../../shared/index.js";

export class Popup {
  private containerElement: HTMLElement;
  private popupElements: Record<number, HTMLDivElement> = {};

  // generate or make sure popup container element
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

  emit(html: string, duration = 500): number {
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

    if (duration > 0)
      setTimeout(() => {
        this.close(popupId);
      }, duration);

    return popupId;
  }

  close(popupId?: number): void {
    if (popupId) {
      const popupElement = this.popupElements[popupId];

      popupElement.className = popupElement.className.replace("appear", "");
      popupElement.className += "disappear";
      popupElement.addEventListener("animationend", () => {
        popupElement.remove();
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
