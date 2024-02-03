export const checkIsMobile = (ua: string): boolean =>
  /\b(?:Android|iPhone)/iu.test(ua);

export const checkIsChromeWebView = (ua: string): boolean =>
  / wv\).+(chrome)\/([\w.]+)/iu.test(ua);

export const checkIsSafariMobile = (ua: string): boolean =>
  /version\/([\w.]+) .*mobile\/\w+ (safari)/iu.test(ua);

export const checkIsSafari = (ua: string): boolean =>
  /version\/([\w.]+) .*(mobile ?safari|safari)/iu.test(ua);

export const checkIsiPhone = (ua: string): boolean =>
  /\((ip(?:hone|od)[\w ]*);/iu.test(ua);

export const checkIsiPad = (ua: string): boolean =>
  [
    /\((ipad);[-\w),; ]+apple/iu,
    /applecoremedia\/[\w.]+ \((ipad)/iu,
    /\b(ipad)\d\d?,\d\d?[;\]].+ios/iu,
  ].some((item) => item.test(ua));

export const checkIsWindows = (ua: string): boolean =>
  [
    /microsoft (windows) (vista|xp)/iu,
    /(win(?=3|9|n)|win 9x )([nt\d.]+)/iu,
    /(windows) nt 6\.2; (arm)/iu,
    /(windows (?:phone(?: os)?|mobile))[/ ]?([\d.\w ]*)/iu,
    /(windows)[/ ]?([ntce\d. ]+\w)(?!.+xbox)/iu,
  ].some((item) => item.test(ua));

export const checkIsIOS = (ua: string): boolean =>
  [
    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/iu,
    /cfnetwork\/.+darwin/iu,
  ].some((item) => item.test(ua));

export const checkIsMacOS = (ua: string): boolean =>
  [/(mac os x) ?([\w. ]*)/iu, /(macintosh|mac_powerpc\b)(?!.+haiku)/iu].some(
    (item) => item.test(ua),
  );
