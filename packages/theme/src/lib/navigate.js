/*
 * @Author: Mr.Hope
 * @Date: 2019-10-13 14:48:48
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-13 14:48:48
 * @Description: 导航
 */

const navigate = (url, router, route) => {
  if (url)
    if (url && url[0] === '/')
      // Inner absolute path
      router.push(url);
    else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)
      // Outter url
      window.open(url);
    else {
      // Inner relative path
      const base = route.path.slice(0, route.path.lastIndexOf('/'));

      router.push(`${base}/${url}`);
    }
};

export default navigate;
