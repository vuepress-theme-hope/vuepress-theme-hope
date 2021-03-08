export interface GitContributor {
  name: string;
  email: string;
  commits: number;
}

export interface GitOptions {
  /**
   * 是否注入贡献者信息
   *
   * Whether inject contributor infomation
   *
   * @default true
   */
  contributor?: boolean;
  /**
   * 当前时区，使用 CI 部署时很有用
   *
   * Current timezone, useful when you are deploying through CI
   */
  timezone?: string;
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
    contributors?: GitContributor[];
    createTime?: string;
    createTimeStamp?: number;
    updateTime?: string;
    updateTimeStamp?: number;
  }

  interface Page {
    contributors?: GitContributor[];
    createTime?: string;
    createTimeStamp?: number;
    updateTime?: string;
    updateTimeStamp?: number;
  }
}
