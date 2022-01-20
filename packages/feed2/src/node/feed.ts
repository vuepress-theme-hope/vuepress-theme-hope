import { renderAtom } from "./atom";
import { renderJSON } from "./json";
import { renderRSS } from "./rss";

import type {
  FeedContributor,
  FeedInitOptions,
  FeedItemOption,
} from "../shared";

export class Feed {
  items: FeedItemOption[] = [];

  categories = new Set<string>();

  private _contributorKeys = new Set<string>();

  contributors: FeedContributor[] = [];

  constructor(public options: FeedInitOptions) {}

  /**
   * Add a feed item
   */
  public addItem = (item: FeedItemOption): void => {
    this.items.push(item);
  };

  /**
   * Add a category
   */
  public addCategory = (category: string): void => {
    this.categories.add(category);
  };

  /**
   * Add a contributor
   */
  public addContributor = (contributor: FeedContributor): void => {
    // use keys to avoid adding same contributor
    const key = contributor.email || contributor.name;

    if (key && !this._contributorKeys.has(key)) {
      this._contributorKeys.add(key);
      this.contributors.push(contributor);
    }
  };

  /**
   * Returns a Atom 1.0 feed
   */
  public atom = (): string => renderAtom(this);

  /**
   * Returns a RSS 2.0 feed
   */
  public rss = (): string => renderRSS(this);

  /**
   * Returns a JSON 1.1 feed
   */
  public json = (): string => renderJSON(this);
}
