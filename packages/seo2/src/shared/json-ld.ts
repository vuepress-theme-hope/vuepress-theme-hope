export interface ArticleJSONLD {
  "@context": "https://schema.org";
  "@type": "NewsArticle";
  /**
   * No more than 110 characters
   */
  headline: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: {
    "@type": "Person";
    name: string;
    url?: string;
  }[];
}
