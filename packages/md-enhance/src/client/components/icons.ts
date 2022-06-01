import { h } from "vue";
import { IconBase } from "vuepress-shared/lib/client";

import type { FunctionalComponent } from "vue";

export const BackIcon: FunctionalComponent = () =>
  h(IconBase, { name: "back" }, () =>
    h("path", {
      d: "M1014.749 449.156v125.688H260.626l345.64 345.64-89.239 89.237L19.307 512l497.72-497.721 89.238 89.238-345.64 345.64h754.124z",
    })
  );

export const HomeIcon: FunctionalComponent = () =>
  h(IconBase, { name: "home" }, () =>
    h("path", {
      d: "M780.106 420.978L506.994 147.866 233.882 420.978h.045v455.11H780.06v-455.11h.046zm90.977 90.976V876.09a91.022 91.022 0 01-91.023 91.022H233.927a91.022 91.022 0 01-91.022-91.022V511.954l-67.22 67.175-64.307-64.307 431.309-431.31c35.498-35.498 93.115-35.498 128.614 0l431.309 431.31-64.307 64.307L871.083 512z",
    })
  );

export const LoadingIcon: FunctionalComponent = () =>
  h(IconBase, { name: "loading" }, () =>
    ["0s", "-0.333s", "-0.667s"].map((item) =>
      h(
        "circle",
        {
          cx: 50,
          cy: 50,
          r: 0,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
        },
        [
          h("animate", {
            attributeName: "r",
            repeatCount: "indefinite",
            dur: "1s",
            values: "0;40",
            keyTimes: "0;1",
            keySplines: "0 0.2 0.8 1",
            calcMode: "spline",
            begin: item,
          }),
          h("animate", {
            attributeName: "opacity",
            repeatCount: "indefinite",
            dur: "1s",
            values: "1;0",
            keyTimes: "0;1",
            keySplines: "0.2 0 0.8 1",
            calcMode: "spline",
            begin: item,
          }),
        ]
      )
    )
  );

export const LOADING_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" class="loading-icon" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"/></circle><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.3333333333333333s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.3333333333333333s"/></circle><circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.6666666666666666s"/><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.6666666666666666s"/></circle></svg>';

export const CODEPEN_SVG =
  '<svg class="codepen-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>';

export const JSFIDDLE_SVG =
  '<svg class="jsfiddle-icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg" width="228.516" height="200"><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>';

export const PLAY_SVG = `<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333z"/><path d="M708.267 465.067 473.6 330.667c-8.533-4.267-17.067-6.4-25.6-6.4-29.867 0-53.333 23.466-53.333 53.333v268.8c0 8.533 2.133 19.2 6.4 25.6 10.666 17.067 27.733 27.733 46.933 27.733 8.533 0 17.067-2.133 25.6-6.4l234.667-134.4c8.533-4.266 14.933-10.666 19.2-19.2 6.4-12.8 8.533-27.733 4.266-40.533-2.133-14.933-10.666-25.6-23.466-34.133zM458.667 627.2V396.8L661.333 512 458.667 627.2z"/></svg>`;

export const CODE_SVG = `<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M240.496 272c-13.504 0-25.664 5.632-34.384 14.608l-.048-.048-189.216 189.2A47.664 47.664 0 0 0 0 512c0 13.504 5.616 25.664 14.592 34.368l-.032.064 192 192 .048-.064A47.68 47.68 0 0 0 240 752a48 48 0 0 0 48-48c0-12.992-5.216-24.752-13.616-33.392l.048-.048-158.304-158.32 157.808-157.808-.048-.048A47.808 47.808 0 0 0 288.496 320a48 48 0 0 0-48-48zm784 240c0-14.56-6.608-27.44-16.848-36.24l-189.216-189.2-.032.048A47.872 47.872 0 0 0 784 272a48 48 0 0 0-48 48c0 13.504 5.632 25.664 14.608 34.384l-.048.048L908.368 512.24l-158.32 158.32.048.048A47.808 47.808 0 0 0 736.48 704a48 48 0 0 0 48 48c12.992 0 24.752-5.216 33.408-13.632l.048.064 192-192-.048-.064A47.68 47.68 0 0 0 1024.496 512zM640 128c-20.8 0-38.496 13.232-45.168 31.712L339.2 830.784a48 48 0 0 0 89.968 33.504L684.8 193.216A48 48 0 0 0 640 128z"/></svg>`;
