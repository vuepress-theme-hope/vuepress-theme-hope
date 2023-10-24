/**
 * Note: Sync with https://github.com/vuejs/core/blob/main/packages/shared/src/domTagConfig.ts#L6-L28
 *
 * Copied from https://github.com/vuejs/core/blob/main/packages/shared/src/domTagConfig.ts#L6-L28
 */

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 */
export const HTML_TAGS = (
  "html,body,base,head,link,meta,style,title,address,article,aside,footer," +
  "header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption," +
  "figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code," +
  "data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup," +
  "time,u,var,wbr,area,audio,map,track,video,embed,object,param,source," +
  "canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td," +
  "th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup," +
  "option,output,progress,select,textarea,details,dialog,menu," +
  "summary,template,blockquote,iframe,tfoot"
).split(",");

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element
 */
export const SVG_TAGS = (
  "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile," +
  "defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer," +
  "feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap," +
  "feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR," +
  "feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset," +
  "fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter," +
  "foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask," +
  "mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern," +
  "polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol," +
  "text,textPath,title,tspan,unknown,use,view"
).split(",");

/**
 * Note: Sync with https://developer.mozilla.org/en-US/docs/Web/MathML/Element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/MathML/Element
 */
export const MATHML_TAGS = (
  "math,mi,mn,mo,ms,mspace,mtext,mclose,merror,mfenced,mfrac,mpadded,mphantom," +
  "mroot,mrow,msqrt,mstyle,mmutiscripts,mover,mprescripts,msub,msubsup,msup," +
  "munder,munderover,mtable,mtd,mtr,annotation,annotation-xml,semantics"
).split(",");
