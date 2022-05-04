import { chalk } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
const HTML_TAGS =
  "html,body,base,head,link,meta,style,title,address,article,aside,footer," +
  "header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption," +
  "figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code," +
  "data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup," +
  "time,u,var,wbr,area,audio,map,track,video,embed,object,param,source," +
  "canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td," +
  "th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup," +
  "option,output,progress,select,textarea,details,dialog,menu," +
  "summary,template,blockquote,iframe,tfoot";
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element
const SVG_TAGS =
  "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile," +
  "defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer," +
  "feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap," +
  "feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR," +
  "feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset," +
  "fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter," +
  "foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask," +
  "mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern," +
  "polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol," +
  "text,textPath,title,tspan,unknown,use,view";

export const tagHint = (tag: string, isDebug = false): void => {
  if (
    isDebug &&
    !HTML_TAGS.split(",").includes(tag) &&
    !SVG_TAGS.split(",").includes(tag) &&
    tag === tag.toLowerCase() &&
    !tag.includes("-")
  ) {
    console.warn(
      chalk.yellow("warning: "),
      `${tag} is used and it’s not a standard tag or standard custom element name`
    );
  }
};

export interface CustomElementCommonOptions {
  app: App;
  config: unknown;
}

/**
 * Add tags as customElement
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const addCustomElement = (
  { app, config }: CustomElementCommonOptions,
  customElement: string[] | string
): void => {
  const customElements =
    typeof customElement === "string" ? [customElement] : customElement;
  const { bundler } = app.options;

  // for vite
  if (bundler.name.endsWith("vite")) {
    const viteBundlerConfig = config as ViteBundlerOptions;

    if (!viteBundlerConfig.vuePluginOptions)
      viteBundlerConfig.vuePluginOptions = {};

    if (!viteBundlerConfig.vuePluginOptions.template)
      viteBundlerConfig.vuePluginOptions.template = {};

    if (!viteBundlerConfig.vuePluginOptions.template.compilerOptions)
      viteBundlerConfig.vuePluginOptions.template.compilerOptions = {};

    const {
      isCustomElement = (tag: string): void => tagHint(tag, app.env.isDebug),
    } = viteBundlerConfig.vuePluginOptions.template.compilerOptions;

    viteBundlerConfig.vuePluginOptions.template.compilerOptions.isCustomElement =
      (tag: string): boolean | void => {
        if (customElements.includes(tag)) return true;

        return isCustomElement(tag);
      };
  }

  // for webpack
  if (bundler.name.endsWith("webpack")) {
    const webpackBundlerConfig = config as WebpackBundlerOptions;

    if (!webpackBundlerConfig.vue) webpackBundlerConfig.vue = {};
    if (!webpackBundlerConfig.vue.compilerOptions)
      webpackBundlerConfig.vue.compilerOptions = {};

    const {
      isCustomElement = (tag: string): void => tagHint(tag, app.env.isDebug),
    } = webpackBundlerConfig.vue.compilerOptions;

    webpackBundlerConfig.vue.compilerOptions.isCustomElement = (
      tag: string
    ): boolean | void => {
      if (customElements.includes(tag)) return true;

      return isCustomElement(tag);
    };
  }
};
