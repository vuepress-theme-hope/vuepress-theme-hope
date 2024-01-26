import { useNow } from "@vueuse/core";
import { computed, onMounted, watch } from "vue";
import { usePageData, useRouteLocale } from "vuepress/client";

const millisecondPerDay = 1000 * 60 * 60 * 24;

export const setupRunningTimeFooter = (
  /**
   * The date to calculate the running time
   *
   * 计算运行时间的日期
   */
  date: string | Date,
  /**
   * The locales of running time
   * @description :day, :hour, :minute, :second will be replaced by the corresponding value
   *
   * 运行时间的本地化文字
   *
   * @description :day, :hour, :minute, :second 会被对应的值替换
   */
  locales: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "/": "Running time: :day days :hour hours :minute minutes :second seconds",
  },
  /**
   * Whether to preserve the original content of the footer
   *
   * 是否保留页脚的原有内容
   *
   * @default false
   */
  preserveContent = false,
): void => {
  const initialTimeStamp = (
    date instanceof Date ? date : new Date(date)
  ).getTime();
  let prevTimeText = "";

  const page = usePageData();
  const now = useNow();
  const routeLocale = useRouteLocale();

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
    watch(
      () => [page.value.path, pastedTime.value],
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
      {
        flush: "post",
        immediate: true,
      },
    );
  });
};
