import type { HopeNavBarConfigItem } from "../types";

export interface NavBarConfigItem extends HopeNavBarConfigItem {
  type: "link" | "links";
  items: NavBarConfigItem[];
}

export const getNavLinkItem = (
  navbarLink: HopeNavBarConfigItem,
  beforeprefix = ""
): NavBarConfigItem => {
  const prefix = beforeprefix + (navbarLink.prefix || "");

  const navbarItem: HopeNavBarConfigItem & { type?: "link" | "links" } = {
    ...navbarLink,
  };

  if (prefix) {
    if (navbarItem.link !== undefined)
      navbarItem.link = prefix + navbarItem.link;
    delete navbarItem.prefix;
  }

  if (navbarItem.items?.length)
    Object.assign(navbarItem, {
      type: "links",
      items: navbarItem.items.map((item) => getNavLinkItem(item, prefix)),
    });
  else navbarItem.type = "link";

  return navbarItem as NavBarConfigItem;
};
