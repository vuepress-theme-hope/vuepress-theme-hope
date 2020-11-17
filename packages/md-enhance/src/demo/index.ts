import {
  Code,
  getCode,
  getReactCode,
  getVanillaCode,
  getVueCode,
  h,
  injectCSS,
  option,
} from "./utils";
import { getCodepenButton, getJsfiddleBtn } from "./button";
import { CodeDemoOptions } from "packages/md-enhance/types";

const select = (node: Element | Document, selector: string): HTMLElement[] =>
  Array.from<HTMLElement>(node.querySelectorAll(`.${selector}`));

const getExpandButton = (): HTMLElement => h("button", { className: "expand" });

const expandHandler = (
  expandNode: HTMLElement,
  height: number,
  codeNode: HTMLElement,
  footerNode: HTMLElement
): void => {
  const toBeExpand = !expandNode.hasAttribute("expanded");

  codeNode.style.height = toBeExpand ? `${height}px` : "0";

  if (toBeExpand) footerNode.classList.add("show-link");
  else footerNode.classList.remove("show-link");

  if (toBeExpand) expandNode.setAttribute("expanded", "");
  else expandNode.removeAttribute("expanded");
};

const actions = (detail: Code, id: string, footer: HTMLElement): void => {
  if (detail.code.css) injectCSS(detail.code.css, id);

  if (option.jsfiddle) footer.appendChild(getJsfiddleBtn(detail));
  if (option.codepen) footer.appendChild(getCodepenButton(detail));
};

export const initDemo = (): void => {
  const containers = select(document, "code-demo-wrapper");

  if (containers.length)
    containers.forEach((container) => {
      if (!container.hasAttribute("data-inited")) {
        container.style.display = "block";

        const { id } = container;
        const codeElement = select(container, "code-wrapper")[0];
        const displayElement = select(container, "display-wrapper")[0];
        const footerElement = select(container, "code-demo-footer")[0];
        const appElement = select(displayElement, "code-demo-app")[0];

        const code = decodeURIComponent(container.dataset.code || "");
        const type = decodeURIComponent(container.dataset.type || "");
        const config = JSON.parse(
          decodeURIComponent(container.dataset.config || "{}")
        ) as Partial<CodeDemoOptions>;
        const { html = "none", js = "none", css = "none" } = config;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const height = codeElement.querySelector("div")!.clientHeight;

        if (
          html === "none" &&
          (js === "none" || js === "babel") &&
          css === "none"
        ) {
          const horizontalConfig =
            typeof config.horizontal === "undefined"
              ? option.horizontal
              : config.horizontal;
          const expandButton = getExpandButton();

          expandButton.addEventListener(
            "click",
            expandHandler.bind(
              null,
              expandButton,
              height,
              codeElement,
              footerElement
            )
          );

          footerElement.appendChild(expandButton);

          if (horizontalConfig) {
            container.classList.add("horizontal");
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const hCodeNode = codeElement.firstChild!.cloneNode(
              true
            ) as HTMLElement;

            hCodeNode.classList.add("code-demo-h-code");
            displayElement.appendChild(hCodeNode);
          }

          if (type.includes("react")) {
            const reactCode = getReactCode(code, config);

            if (reactCode) {
              window.ReactDOM.render(
                window.React.createElement(reactCode.code.js),
                appElement
              );

              actions(reactCode, id, footerElement);
            }
          } else if (type.includes("vue")) {
            const vueCode = getVueCode(code, config);
            const component = window.Vue.extend(vueCode.script);
            const app = new component().$mount();

            appElement.appendChild(app.$el);

            actions(vueCode, id, footerElement);
          } else {
            const vanillaCode = getVanillaCode(code, config);

            appElement.innerHTML = vanillaCode.code.html;
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            new Function(`return (function(){${vanillaCode.script}})()`)();

            actions(vanillaCode, id, footerElement);
          }
        } else {
          const codepenCode = getCode(code, config, type);

          displayElement.style.display = "none";
          codeElement.style.height = `${height}px`;
          footerElement.appendChild(getCodepenButton(codepenCode));
          footerElement.style.height = "40px";
        }

        container.setAttribute("data-inited", "");
      }
    });
  else setTimeout(() => initDemo(), 300);
};
