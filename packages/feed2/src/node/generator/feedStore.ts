import { generateAtomFeed } from "./atom/index.js";
import { generateJSONFeed } from "./json/index.js";
import { generateRssFeed } from "./rss/index.js";
import type { FeedItem } from "../feedItem.js";
import type {
  FeedCategory,
  FeedContributor,
  FeedInitOptions,
  FeedItemInformation,
} from "../typings/index.js";

export class FeedStore {
  public categories = new Set<string>();
  public contributors: FeedContributor[] = [];
  public items: FeedItemInformation[] = [];

  private _contributorKeys = new Set<string>();

  constructor(public options: FeedInitOptions) {}

  /**
   * Add category to store
   */
  private addCategory = (category: FeedCategory): void => {
    this.categories.add(category.name);
  };

  /**
   * Add contributor to store
   */
  private addContributor = (contributor: FeedContributor): void => {
    // use keys to avoid adding same contributor
    const key = contributor.email || contributor.name;

    if (key && !this._contributorKeys.has(key)) {
      this._contributorKeys.add(key);
      this.contributors.push(contributor);
    }
  };

  /**
   * Add a feed item
   */
  public add = (item: FeedItem): void => {
    const info = item.getInfo();

    if (info) {
      const { category, contributor } = info;

      this.items.push(info);
      category?.forEach(this.addCategory);
      contributor?.forEach(this.addContributor);
    }
  };

  /**
   * Returns a Atom 1.0 feed
   */
  public atom = (): string => generateAtomFeed(this);

  /**
   * Returns a RSS 2.0 feed
   */
  public rss = (): string => generateRssFeed(this);

  /**
   * Returns a JSON 1.1 feed
   */
  public json = (): string => generateJSONFeed(this);
}
