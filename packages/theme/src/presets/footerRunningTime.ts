import { useNow, watchImmediate } from "@vueuse/core";
import { computed, onMounted } from "vue";

import { useData } from "vuepress-theme-hope/client";

const millisecondPerDay = 1000 * 60 * 60 * 24;

/**
 *
 * @param date - The date to calculate the running time
 * @param locales - The locales of running time, `:day`, `:hour`, `:minute`, `:second` will be replaced by the corresponding value
 * @param [preserveContent=false] - Whether to preserve the original content of the footer
 *
 * @param date - 计算运行时间的日期
 * @param locales - 运行时间的本地化文字， `:day`, `:hour`, `:minute`, `:second` 会被对应的值替换
 * @param [preserveContent=false] - 是否保留页脚的原有内容
 */
export const setupRunningTimeFooter = (
  date: string | Date,
  locales: Record<string, string> = {
    "/": "Running time: :day days :hour hours :minute minutes :second seconds",
  },
  preserveContent = false,
): void => {
  const { routeLocale, routePath } = useData();
  const now = useNow();

  let prevTimeText = "";

  const initialTimeStamp = (
    date instanceof Date ? date : new Date(date)
  ).getTime();

  const pastedTime = computed(() => {
    const passedTime = now.value.getTime() - initialTimeStamp;
    const restDate = new Date(passedTime % millisecondPerDay);

    return {
      day: Math.floor(passedTime / millisecondPerDay),
      hour: restDate.getHours(),
      minute: restDate.getMinutes(),
      second: restDate.getSeconds(),
    };
  });

  onMounted(() => {
    watchImmediate(
      [routePath, pastedTime],
      () => {
        const footer = document.querySelector(".vp-footer");

        if (footer) {
          const { day, hour, minute, second } = pastedTime.value;
          const localeText = (locales[routeLocale.value] || locales["/"])
            .replace(":day", day.toString())
            .replace(":hour", hour.toString())
            .replace(":minute", minute.toString())
            .replace(":second", second.toString());

          footer.innerHTML = `${
            preserveContent
              ? `${footer.innerHTML.replace(`<br>${prevTimeText}`, "")}<br>`
              : ""
          }${localeText}`;
          prevTimeText = localeText;
        }
      },
      { flush: "post" },
    );
  });
};
