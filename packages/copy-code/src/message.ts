import "./message.css";

export default class Message {
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

  pop(text: string, duration = 2000): void {
    const messageElement = document.createElement("div");

    messageElement.className = "message move-in";
    messageElement.innerHTML = `
      <i style="fill: #06a35a;font-size: 14px;coolr: #06a35a">
        <svg style="fill: #06a35a;font-size: 14px;" t="1572421810237" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2323" width="16" height="16"><path d="M822.811993 824.617989c-83.075838 81.99224-188.546032 124.613757-316.049383 127.86455-122.085362-3.250794-223.943563-45.87231-305.935802-127.86455s-124.613757-184.21164-127.86455-305.935802c3.250794-127.503351 45.87231-232.973545 127.86455-316.049383 81.99224-83.075838 184.21164-126.058554 305.935802-129.309347 127.503351 3.250794 232.973545 46.23351 316.049383 129.309347 83.075838 83.075838 126.058554 188.546032 129.309347 316.049383C949.231746 640.406349 905.887831 742.62575 822.811993 824.617989zM432.716755 684.111464c3.973192 3.973192 8.307584 5.779189 13.364374 6.140388 5.05679 0.361199 9.752381-1.444797 13.364374-5.417989l292.571429-287.514638c3.973192-3.973192 5.779189-8.307584 5.779189-13.364374 0-5.05679-1.805996-9.752381-5.779189-13.364374l1.805996 1.805996c-3.973192-3.973192-8.668783-5.779189-14.086772-6.140388-5.417989-0.361199-10.47478 1.444797-14.809171 5.417989l-264.397884 220.33157c-3.973192 3.250794-8.668783 4.695591-14.447972 4.695591-5.779189 0-10.835979-1.444797-15.53157-3.973192l-94.273016-72.962257c-4.334392-3.250794-9.391182-4.334392-14.447972-3.973192s-9.391182 3.250794-12.641975 7.585185l-2.889594 3.973192c-3.250794 4.334392-4.334392 9.391182-3.973192 14.809171 0.722399 5.417989 2.528395 10.11358 5.779189 14.086772L432.716755 684.111464z" p-id="2324"></path></svg>
      </i>
      <div class="text">${text}</div>
    `;
    this.containerElement.appendChild(messageElement);

    if (duration > 0) {
      setTimeout(() => {
        this.close(messageElement);
      }, duration);
    }
  }

  close(messageElement: HTMLDivElement): void {
    messageElement.className = messageElement.className.replace("move-in", "");
    messageElement.className += "move-out";

    messageElement.addEventListener("animationend", () => {
      messageElement.remove();
    });
  }
}
