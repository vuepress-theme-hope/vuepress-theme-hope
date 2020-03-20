/*
 * @Author: Mr.Hope
 * @Date: 2020-03-19 23:52:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-21 00:21:03
 * @Description: Navbar config handler
 */

import { HopeNavBarConfigItem } from '@mr-hope/vuepress-shared-utils';

export interface NavBarConfigItem extends HopeNavBarConfigItem {
  type: 'link' | 'links';
}

export const resolveNavLinkItem = (
  navbarLink: NavBarConfigItem,
  beforeprefix = ''
): NavBarConfigItem => {
  const prefix = beforeprefix + (navbarLink.prefix || '');

  const navbarItem = { ...navbarLink };

  if (prefix) {
    if (navbarItem.link !== undefined)
      navbarItem.link = prefix + navbarItem.link;
    delete navbarItem.prefix;
  }

  if (navbarItem.items && navbarItem.items.length)
    Object.assign(navbarItem, {
      type: 'links',
      items: navbarItem.items.map((item: any) =>
        resolveNavLinkItem(item, prefix)
      )
    });
  else navbarItem.type = 'link';

  return navbarItem;
};
