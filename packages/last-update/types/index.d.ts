export interface LastUpdateOption {
  /**
   * 时间转换器
   *
   * Time transformer
   *
   * @default `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}`
   */
  transformer?: (timestamp: number, lang: string) => string;
}

declare module "@mr-hope/vuepress-types/types/page" {
  interface PageComputed {
    lastUpdatedTime?: number;
  }

  interface Page {
    lastUpdatedTime?: number;
  }
}
