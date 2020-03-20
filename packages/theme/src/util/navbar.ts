/*
 * @Author: Mr.Hope
 * @Date: 2020-03-19 23:52:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-20 21:41:12
 * @Description: Navbar config handler
 */

export const resolveNavLinkItem = (navbarLink: any, beforeprefix = ''): any => {
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
