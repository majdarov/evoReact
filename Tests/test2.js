let log = console.log;
/* let search = 'h+a.p[';
console.log(search.match(/[+[\])(]/gi))
let s = search.replace(/[+[\])(.]/gi, '\\$&')
console.log(s)
console.log('search: ', search);
 */
let value = 'Завтрак в 09+00 в комнате [123:456]';
let search = 'rgx(\\d+?\\+\\d+?)';

function createRegexp(str = '') {
  let val;
  if (str.slice(0, 3) === 'rgx') {
    val = str.replace(/rgx\(|\)/g, '')//.replace(/\)/, '');
    log('val1', val);
    return new RegExp(val, 'gi');
  }
  val = str.replace(/[-[.+$*()\]]/g, '\\$&');
  log('val2', val);
  return new RegExp(val, 'gi');
}

let regexp = createRegexp(search);
log(regexp.test(value));
log(value.match(regexp));
log(value.match(createRegexp('[123:')));

log('<h1>Text</h1>'.match(/<\/?[a-z][a-z0-9]>/gi));

let str = "..[url]http://ya.ru[/url]..";

// let regDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
let regBB = /(\[((\w+)|(\/\w+))\])(.*?)\2\]/g
let regBB2 = /(.*?)/g
let match = str.match(regBB);

log(match)
