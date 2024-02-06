/* eslint-disable */
/**
 * Shimmed from https://github.com/pieroxy/lz-string
 */

// Original license reproduced below:

// DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//                     Version 2, December 2004
//
//  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
//
//  Everyone is permitted to copy and distribute verbatim or modified
//  copies of this license document, and changing it is allowed as long
//  as the name is changed.
//
//             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
//
//   0. You just DO WHAT THE FUCK YOU WANT TO.
//

const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";

const compress = (o: string, r: number, n: (pos: number) => string) => {
  if (null == r) return "";

  let e,
    t,
    i,
    s = <Record<string, number>>{},
    p = <Record<string, boolean>>{},
    u = "",
    c = "",
    a = "",
    l = 2,
    f = 3,
    h = 2,
    d = [],
    m = 0,
    v = 0;

  for (i = 0; i < o.length; i += 1)
    if (
      ((u = o.charAt(i)),
      Object.prototype.hasOwnProperty.call(s, u) || ((s[u] = f++), (p[u] = !0)),
      (c = a + u),
      Object.prototype.hasOwnProperty.call(s, c))
    )
      a = c;
    else {
      if (Object.prototype.hasOwnProperty.call(p, a)) {
        if (a.charCodeAt(0) < 256) {
          for (e = 0; e < h; e++)
            (m <<= 1), v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++;
          for (t = a.charCodeAt(0), e = 0; e < 8; e++)
            (m = (m << 1) | (1 & t)),
              v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
              (t >>= 1);
        } else {
          for (t = 1, e = 0; e < h; e++)
            (m = (m << 1) | t),
              v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
              (t = 0);
          for (t = c.charCodeAt(0), e = 0; e < 16; e++)
            (m = (m << 1) | (1 & t)),
              v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
              (t >>= 1);
        }
        0 == --l && ((l = Math.pow(2, h)), h++), delete p[a];
      } else
        for (t = s[a], e = 0; e < h; e++)
          (m = (m << 1) | (1 & t)),
            v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
            (t >>= 1);
      0 == --l && ((l = Math.pow(2, h)), h++), (s[c] = f++), (a = String(u));
    }

  if ("" !== a) {
    if (Object.prototype.hasOwnProperty.call(p, a)) {
      if (a.charCodeAt(0) < 256) {
        for (e = 0; e < h; e++)
          (m <<= 1), v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++;
        for (t = a.charCodeAt(0), e = 0; e < 8; e++)
          (m = (m << 1) | (1 & t)),
            v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
            (t >>= 1);
      } else {
        for (t = 1, e = 0; e < h; e++)
          (m = (m << 1) | t),
            v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
            (t = 0);
        for (t = a.charCodeAt(0), e = 0; e < 16; e++)
          (m = (m << 1) | (1 & t)),
            v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
            (t >>= 1);
      }
      0 == --l && ((l = Math.pow(2, h)), h++), delete p[a];
    } else
      for (t = s[a], e = 0; e < h; e++)
        (m = (m << 1) | (1 & t)),
          v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
          (t >>= 1);
    0 == --l && ((l = Math.pow(2, h)), h++);
  }

  for (t = 2, e = 0; e < h; e++)
    (m = (m << 1) | (1 & t)),
      v == r - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
      (t >>= 1);

  for (;;) {
    if (((m <<= 1), v == r - 1)) {
      d.push(n(m));
      break;
    }
    v++;
  }

  return d.join("");
};

export const compressToEncodedURIComponent = (content: string) =>
  compress(content, 6, (pos: number) => e.charAt(pos));
