import type { App } from "vuepress/core";

import type { FeedItem } from "./feedItem.js";
import type { FeedLinks, ResolvedFeedOptions } from "./options.js";
import { getFeedChannelOption, getFeedLinks } from "./options.js";
import type {
  FeedCategory,
  FeedChannelOption,
  FeedContributor,
} from "./typings/index.js";

export class FeedStore {
  public categories = new Set<string>();
  public contributors: FeedContributor[] = [];
  public items: FeedItem[] = [];

  private _contributorKeys = new Set<string>();
  public channel: FeedChannelOption;
  public links: FeedLinks;
  constructor(
    app: App,
    localeOptions: ResolvedFeedOptions,
    localePath: string,
  ) {
    this.channel = getFeedChannelOption(app, localeOptions, localePath);
    this.links = getFeedLinks(app, localeOptions, localePath);
  }

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
    if (item.isValid) {
      const { category, contributor } = item;

      this.items.push(item);
      category?.forEach(this.addCategory);
      contributor?.forEach(this.addContributor);
    }
  };
}
