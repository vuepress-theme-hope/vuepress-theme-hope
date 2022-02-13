/**
 * Forked and edited from https://github.com/vxhly/vuepress-plugin-one-click-copy/blob/master/bin/Message.js
 *
 * MIT License
 *
 * Copyright (c) 2019 vxhly <pengchengou@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * © 2019 GitHub, Inc.
 */

import "../styles/message.scss";

export class Message {
  private containerElement: HTMLElement;

  // generate or make sure message container element
  constructor() {
    const containerId = "message-container";
    const containerElement = document.getElementById(containerId);

    if (containerElement) this.containerElement = containerElement;
    else {
      this.containerElement = document.createElement("div");
      this.containerElement.id = containerId;
      document.body.appendChild(this.containerElement);
    }
  }

  pop(html: string, duration = 2000): void {
    const messageElement = document.createElement("div");

    messageElement.className = "message move-in";
    messageElement.innerHTML = html;
    this.containerElement.appendChild(messageElement);

    if (duration > 0)
      setTimeout(() => {
        this.close(messageElement);
      }, duration);
  }

  close(messageElement: HTMLDivElement): void {
    messageElement.className = messageElement.className.replace("move-in", "");
    messageElement.className += "move-out";

    messageElement.addEventListener("animationend", () => {
      messageElement.remove();
    });
  }
}
