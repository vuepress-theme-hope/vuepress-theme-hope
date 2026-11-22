// The theme generates `@temp/theme-hope/sidebar.js` during a real build. Unit tests provide this
// fixture instead, so that structure sidebars resolve to an empty list.
const emptySidebar: (Record<string, unknown> | string)[] = [];

export const sidebarData = new Proxy<Record<string, (Record<string, unknown> | string)[]>>(
  {},
  { get: (): (Record<string, unknown> | string)[] => emptySidebar },
);
