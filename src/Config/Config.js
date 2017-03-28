import FastClick from './fastclick.js';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}


const system = (() => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  let system;
  if (isAndroid) {
    system = 'Android'
  } else if (isIOS) {
    system = 'IOS'
  }
  return system
})()
const target = process.env.NODE_ENV !== 'production' ? '' : ''; //目标网站
export {
  target,
  system
}