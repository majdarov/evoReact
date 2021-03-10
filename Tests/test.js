const log = console.log;

let t = (Date.now() + 16 * 3600 * 1000).toString(2);
let tLow = t.slice(t.length - 32);
let tMid = t.slice(0, t.length - 32);

let arr1 = [];
for (let i = 1; i <= 4; i++) {
    let str = parseInt(tLow.slice((i - 1) * 8, (i - 1) * 8 + 8), 2).toString(16);
    if (str.length < 2) str += '0'.repeat(2 - str.length);
    arr1.push(str);
}
let arr2 = [];
for (let i = 1; i <= 2; i++) {
    let str = parseInt(tMid.slice((i - 1) * 8, (i - 1) * 8 + 8), 2).toString(16);
    if (str.length < 2) str += '0'.repeat(2 - str.length);
    arr2.push(str);
}

log(tLow.toString(2), `length: ${tLow.toString(2).length}`);
log(tMid.toString(2), `length: ${tMid.toString(2).length}`);
// log(str, `length: ${str.length}`);
log(arr1)
log(arr2)
