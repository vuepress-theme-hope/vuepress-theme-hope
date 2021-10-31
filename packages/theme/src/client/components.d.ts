// /**
//  * Component to render a link that triggers a navigation on click.
//  */
// declare const NavbarSearch: {
//   new (): {
//     $props: AllowedComponentProps & ComponentCustomProps & VNodeProps;
//   };
//   /**
//    * Access to `useLink()` without depending on using vue-router
//    *
//    * @internal
//    */
//   useLink: typeof useLink;
// };

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Content: import("vue").DefineComponent;
    NavbarSearch: import("vue").DefineComponent;
    RouterLink: typeof import("vue-router")["RouterLink"];
  }
}

export {};
