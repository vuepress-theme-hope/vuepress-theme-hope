/* eslint-disable @typescript-eslint/naming-convention */
export interface BaseSeoContent {
  /**
   * 文章的标题，不包含任何品牌，例如你的网站名称。
   *
   * The title of your object as it should appear within the graph, e.g., "The Rock".
   */
  "og:title": string;
  /**
   * 页面类型，根据你选择类别的不同，可能需要填写其他属性。
   *
   * The type of your object, e.g., "video.movie".
   * Depending on the type you specify, other properties may also be required.
   */
  "og:type":
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other"
    | "article"
    | "book"
    | "profile"
    | "website";
  /**
   * 页面的图片网址。图片应至少为 600×315 像素，但最好是 1200×630 像素或更大的尺寸 (大小不超过 5MB)。
   * 将长宽比保持在 1.91:1 左右，以避免裁剪。
   * 游戏图标应为正方形，且至少为 600×600 像素。
   * 如果在发布图片后更新了图片，请使用新网址，因为系统会根据之前的网址缓存图片，可能不会更新图片。
   *
   * An image URL which should represent your object within the graph.
   */
  "og:image": string;
  /**
   * 页面的权威链接。此标签应该是未加修饰的网址，没有会话变量、用户识别参数或计数器。
   * 此网址的“赞”和“分享”将在此网址中汇总。例如，移动域网址应将桌面版网址指定为权威链接，用于跨不同页面版本汇总“赞”和“分享”
   *
   * The canonical URL of your object that will be used as its permanent ID in the graph,
   * e.g., "http://www.imdb.com/title/tt0117500/".
   */
  "og:url": string;
}

export interface SimpleSeoContent extends BaseSeoContent {
  /**
   * 可选的音频文件
   *
   * A URL to an audio file to accompany this object.
   */
  "og:audio"?: string;
  /**
   * 可选的视频文件
   *
   * A URL to a video file that complements this object.
   */
  "og:video"?: string;
  /**
   * 内容的简略说明，通常为 2-4 个句子
   *
   * A one to two sentence description of your object.
   */
  "og:description": string;
  /**
   * 当文章出现在句子中时，前面的量词
   *
   * The word that appears before this object's title in a sentence.
   * An enum of (a, an, the, "", auto). If auto is chosen, the consumer of your data should
   * chose between "a" or "an". Default is "" (blank).
   */
  "og:determiner"?: "a" | "an" | "the" | "" | "auto";
  /**
   * 页面使用的语言
   *
   * The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.
   */
  "og:locale": string;
  /**
   * 页面支持的语言
   *
   * An array of other locales this page is available in.
   */
  "og:locale:alternate": string[];
  /**
   * 网站名称
   *
   * If your object is part of a larger web site, the name which should be
   * displayed for the overall site. e.g., "IMDb".
   */
  "og:site_name": string;
}

export interface ArticleSeoContent extends SimpleSeoContent {
  /**
   * 文章发表时间
   *
   * When the article was first published.
   */
  "article:published_time"?: string;
  /**
   * 文章上次修改时间
   *
   * When the article was last changed.
   */
  "article:modified_time"?: string;
  /**
   * 文章过期时间
   *
   * When the article is out of date after.
   */
  "article:expiration_time"?: string;
  /**
   * 文章作者
   *
   * Writers of the article
   */
  "article:author"?: string;
  /**
   * 文章章节
   *
   * A high-level section name. E.g. Technology
   */
  "article:section"?: string;
  /**
   * 文章标签
   *
   * Tag words associated with this article.
   */
  "article:tag"?: string[];
}

export interface FacebookSeoContent extends SimpleSeoContent {
  /**
   * 进行 Facebook 成效分析所使用的应用编号
   *
   * App id which Facebook use to analyze
   */
  "fb:app_id": string;
}

export interface TwitterSeoContent extends SimpleSeoContent {
  /** The card type */
  "twitter:card"?: "summary" | "summary_large_image" | "app" | "player";
  /**
   * 用户的 Twitter ID
   *
   * username of website
   */
  "twitter:site": string;
  /**
   * 创作者用户名
   *
   * username of content creator
   */

  "twitter:creator": string;

  /**
   * 图片替代文字
   *
   * A text description of the image conveying the essential nature of an image
   * to users who are visually impaired. Maximum 420 characters.
   */
  "twitter:image:alt": string;
}

export interface ExtendedSeoContent extends SimpleSeoContent {
  /**
   * 网站更新时间
   *
   * page update time
   */
  "og:updated_time": string;
  /**
   * 是否启用富媒体
   *
   * Whether to enable rich attachment
   */
  "og:rich_attachment": "true" | "false";
  /**
   * 内容年龄限制
   *
   * Age Restrictions of the content
   */
  "og:restrictions:age": string;
}

export type SeoContent =
  | ArticleSeoContent
  | ExtendedSeoContent
  | FacebookSeoContent
  | TwitterSeoContent
  | SimpleSeoContent;
