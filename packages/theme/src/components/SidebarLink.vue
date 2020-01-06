<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 11:14:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-21 23:37:16
 * @Description: 侧边栏链接
 *
 * 添加了图标支持
-->
<script>
import { groupHeaders, hashRE, isActive } from '@parent-theme/util';

const renderIcon = (h, icon) => {
  if (icon[1])
    return h('i', {
      class: ['iconfont', `${icon[0]}${icon[1]}`],
      style: 'margin-right:0.2em;'
    });

  return null;
};

// eslint-disable-next-line max-params
const renderLink = (h, to, text, icon, active) =>
  h(
    'router-link',
    {
      props: {
        to,
        activeClass: '',
        exactActiveClass: ''
      },
      class: {
        active,
        'sidebar-link': true
      }
    },
    [renderIcon(h, icon), text]
  );

// eslint-disable-next-line max-params
const renderChildren = (h, children, path, route, maxDepth, depth = 1) => {
  if (!children || depth > maxDepth) return null;

  return h(
    'ul',
    { class: 'sidebar-sub-headers' },
    children.map(child => {
      const active = isActive(route, `${path}#${child.slug}`);

      return h('li', { class: 'sidebar-sub-header' }, [
        renderLink(h, `${path}#${child.slug}`, child.title, [], active),
        renderChildren(h, child.children, path, route, maxDepth, depth + 1)
      ]);
    })
  );
};

const renderExternal = (h, to, text) =>
  h(
    'a',
    {
      attrs: {
        href: to,
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      class: { 'sidebar-link': true }
    },
    [text, h('OutboundLink')]
  );

export default {
  name: 'SidebarLink',

  functional: true,

  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    // eslint-disable-next-line vue/require-default-prop
    sidebarDepth: Number
  },

  // eslint-disable-next-line max-lines-per-function
  render(
    h,
    {
      parent: { $page, $route, $themeConfig, $themeLocaleConfig },
      props: { item, sidebarDepth }
    }
  ) {
    /*
     * Use custom active class matching logic
     * Due to edge case of paths ending with / + hash
     */
    const selfActive = isActive($route, item.path);
    /*
     * For sidebar: auto pages, a hash link should be active if one of its child
     * matches
     */
    const active =
      item.type === 'auto'
        ? selfActive ||
          item.children.some(child =>
            isActive($route, `${item.basePath}#${child.slug}`)
          )
        : selfActive;

    const link =
      item.type === 'external'
        ? renderExternal(h, item.path, item.title || item.path)
        : renderLink(
            h,
            item.path,
            item.title || item.path,
            $themeConfig.sidebarIcon === false
              ? []
              : [$themeConfig.iconPrefix, item.frontmatter.icon],
            active
          );

    const maxDepth = [
      $page.frontmatter.sidebarDepth,
      sidebarDepth,
      $themeLocaleConfig.sidebarDepth,
      $themeConfig.sidebarDepth,
      1
    ].find(depth => depth !== undefined);

    const displayAllHeaders =
      $themeLocaleConfig.displayAllHeaders || $themeConfig.displayAllHeaders;

    if (item.type === 'auto')
      return [
        link,
        renderChildren(h, item.children, item.basePath, $route, maxDepth)
      ];
    if (
      (active || displayAllHeaders) &&
      item.headers &&
      !hashRE.test(item.path)
    ) {
      const children = groupHeaders(item.headers);

      return [link, renderChildren(h, children, item.path, $route, maxDepth)];
    }

    return link;
  }
};
</script>

<style lang="stylus">
.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em

a.sidebar-link
  font-size 1em
  font-weight 400
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  padding 0.35rem 1rem 0.35rem 1.25rem
  line-height 1.4
  width 100%
  box-sizing border-box

  &:hover
    color $accentColor

  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor

  .sidebar-group &
    padding-left 2rem

  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none

    &.active
      font-weight 500
</style>
