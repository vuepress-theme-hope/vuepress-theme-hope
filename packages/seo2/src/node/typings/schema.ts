/**
 * @see https://schema.org/Person
 */

export interface PersonSchema extends Record<string, unknown> {
  "@type": "Person";

  /**
   * Person name
   */
  name: string;

  /**
   * Person URL
   * @recommended
   */
  url?: string;
}

/**
 * @see https://schema.org/CreativeWork
 *
 * @tutorial https://developers.google.com/search/docs/appearance/structured-data/article#structured-data-type-definitions
 */
export interface CreativeWorkSchema extends Record<string, unknown> {
  "@type": "CreativeWork";

  /**
   * An abstract is a short description that summarizes a CreativeWork
   */
  abstract?: string;

  /**
   * The author of this content or rating
   */
  author: PersonSchema[];

  /**
   * Text of a notice appropriate for describing the copyright aspects of this Creative Work, ideally indicating the owner of the copyright for the Work
   */
  copyrightNotice?: string;

  /**
   * Article title
   *
   * @description No more than 110 characters
   */
  headline: string;

  /**
   * @recommended
   */
  datePublished?: string;
  /**
   * @recommended
   */
  dateModified?: string;

  wordCount?: number;
}

/**
 * @see https://schema.org/Article
 *
 * @tutorial https://developers.google.com/search/docs/appearance/structured-data/article#structured-data-type-definitions
 */
export interface ArticleSchema extends Omit<CreativeWorkSchema, "type"> {
  "@context": "https://schema.org";
  "@type": "Article";
}

/**
 * @see https://schema.org/BlogPosting
 *
 * @tutorial https://developers.google.com/search/docs/appearance/structured-data/article#structured-data-type-definitions
 */
export interface BlogPostingSchema extends Omit<ArticleSchema, "type"> {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
}

/**
 * @see https://schema.org/WebPage
 */
export interface WebPageSchema extends Omit<CreativeWorkSchema, "type"> {
  "@context": "https://schema.org";
  "@type": "WebPage";

  name?: string;
  description?: string;
}
