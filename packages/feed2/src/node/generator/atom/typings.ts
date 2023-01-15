export interface AtomText {
  _attributes: {
    type: "html";
  };
  _text: string;
}

export interface AtomCDATA {
  _attributes: {
    type: "html";
  };
  _cdata: string;
}

export interface AtomAuthor {
  /**
   * human-readable name
   */
  name?: string;
  /**
   * email address
   */
  email?: string;
  /**
   * home page
   */
  uri?: string;
}

export interface AtomCategory {
  _attributes: {
    /**
     * identifies the category
     */
    term: string;
    /**
     * the categorization scheme via a URI
     */
    scheme?: string;
    /**
     * a human-readable label for display
     */
    label?: string;
  };
}

export interface AtomLink {
  _attributes: {
    href: string;
    rel?: string;
  };
}

export interface AtomEntry {
  /**
   * Identifies the entry using a universally unique and permanent URI.
   */
  id: string;
  /**
   * 	Contains a human readable title for the entry.
   */

  title: AtomText;
  /**
   * 	Indicates the last time the entry was modified in a significant way.
   */

  updated: string;
  /**
   * Names one author of the entry. An entry may have multiple authors.
   */
  author?: AtomAuthor[];
  /**
   * Contains or links to the complete content of the entry.
   */
  content?: AtomCDATA;
  /**
   * Identifies a related Web page.
   */
  link: AtomLink;
  /**
   * 	Conveys a short summary, abstract, or excerpt of the entry.
   */
  summary?: AtomText | AtomCDATA;
  /**
   * Specifies a category that the entry belongs to.
   *
   * A entry may have multiple category elements.
   */

  category?: AtomCategory[];
  /**
   * Names one contributor to the entry.
   *
   * An entry may have multiple contributor elements.
   */
  contributor?: AtomAuthor[];
  /**
   * 	Contains the time of the initial creation or first availability of the entry.
   */
  published?: string;
  /**
   * Conveys information about rights
   */
  rights?: string;
}

export interface AtomContent {
  _declaration: {
    _attributes: {
      version: string;
      encoding: string;
    };
  };
  feed: {
    _attributes: {
      xmlns: string;
      lang?: string;
    };
    /**
     * 	Identifies the feed using a universally unique and permanent URI.
     */
    id: string;
    /**
     * Contains a human readable title for the feed.
     * Often the same as the title of the associated website.
     */
    title: string;
    /**
     * Indicates the last time the feed was modified in a significant way.
     */
    updated: string;
    /**
     * Names one author of the feed. A feed may have multiple author elements.
     *
     * A feed must contain at least one author element unless all of the entry elements contain at least one author element.
     */
    author?: AtomAuthor;
    /**
     * 	Identifies a related Web page. The type of relation is defined by the rel attribute. A feed is limited to one alternate per type and hreflang. A feed should contain a link back to the feed itself.
     */
    link: AtomLink[];
    /**
     * 	Specifies a category that the feed belongs to. A feed may have multiple category elements.
     */
    category?: {
      _attributes: {
        term: string;
      };
    }[];
    /**
     * Names one contributor to the feed. An feed may have multiple contributor elements.
     */
    contributor?: AtomAuthor[];
    /**
     * 	Identifies the software used to generate the feed
     */
    generator: string;
    /**
     * Identifies a small image which provides iconic visual identification for the feed. Icons should be square.
     */
    icon?: string;
    /**
     * Identifies a larger image which provides visual identification for the feed. Images should be twice as wide as they are tall.
     */
    logo?: string;
    /**
     * Conveys information about rights, e.g. copyrights, held in and over the feed.
     */
    rights?: string;
    /**
     * Contains a human-readable description or subtitle for the feed.
     */
    subtitle?: string;

    entry?: AtomEntry[];
  };
}
