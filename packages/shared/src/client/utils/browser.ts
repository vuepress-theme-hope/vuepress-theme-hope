export const checkIsChromeMobile = (ua: string): boolean =>
  /\b(?:crmo|crios)\/([\w.]+)/i.test(ua);

export const checkIsChromeWebView = (ua: string): boolean =>
  / wv\).+(chrome)\/([\w.]+)/i.test(ua);

export const checkIsSafariMobile = (ua: string): boolean =>
  /version\/([\w.]+) .*mobile\/\w+ (safari)/i.test(ua);

export const checkIsSafari = (ua: string): boolean =>
  /version\/([\w.]+) .*(mobile ?safari|safari)/i.test(ua);

export const checkIsiPhone = (ua: string): boolean =>
  /\((ip(?:hone|od)[\w ]*);/i.test(ua);

export const checkIsiPad = (ua: string): boolean =>
  [
    /\((ipad);[-\w),; ]+apple/i,
    /applecoremedia\/[\w.]+ \((ipad)/i,
    /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
  ].some((item) => item.test(ua));

export const checkIsWindows = (ua: string): boolean =>
  [
    /microsoft (windows) (vista|xp)/i,
    /(win(?=3|9|n)|win 9x )([nt\d.]+)/i,
    /(windows) nt 6\.2; (arm)/i,
    /(windows (?:phone(?: os)?|mobile))[/ ]?([\d.\w ]*)/i,
    /(windows)[/ ]?([ntce\d. ]+\w)(?!.+xbox)/i,
  ].some((item) => item.test(ua));

export const checkIsIOS = (ua: string): boolean =>
  [
    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
    /cfnetwork\/.+darwin/i,
  ].some((item) => item.test(ua));

export const checkIsMacOS = (ua: string): boolean =>
  [/(mac os x) ?([\w. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i].some(
    (item) => item.test(ua)
  );
