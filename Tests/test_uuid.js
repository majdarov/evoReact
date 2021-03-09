let log = console.log;
// let arr8 = new Uint8Array([65, 202, 195, 195, 131, 107, 135, 88, 51, 135, 64, 173, 70, 27, 182, 71]);

function getLowMidBits() {
  let t = (Date.now() + 16 * 3600 * 1000).toString(2);
  let tLow = t.slice(t.length - 32);
  let tMid = t.slice(0, t.length - 32);

  let arr1 = [];
  for (let i = 1; i <= 4; i++) {
    let str = parseInt(tLow.slice((i - 1) * 8, (i - 1) * 8 + 8), 2).toString(
      16,
    );
    if (str.length < 2) str += '0'.repeat(2 - str.length);
    arr1.push(str);
  }
  let arr2 = [];
  for (let i = 1; i <= 2; i++) {
    let str = parseInt(tMid.slice((i - 1) * 8, (i - 1) * 8 + 8), 2).toString(
      16,
    );
    if (str.length < 2) str += '0'.repeat(2 - str.length);
    arr2.push(str);
  }

  return [arr1, arr2]
}

function getUUID1() {
  function randomMax(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let [tLow, tMid] = getLowMidBits();

  let arr = [...tLow, ...tMid];

  while (arr.length < 16) {
    arr.push(randomMax(16).toString(16).concat(randomMax(16).toString(16)));
  }

  arr[6] = ((parseInt('0x' + arr[6], 16) & 0x0f) | 0x10).toString(16);
  arr[8] = ((parseInt('0x' + arr[8], 16) & 0x3f) | 0x80).toString(16);
  let newStr = arr.join('');
  let strUuid = newStr.slice(0, 8);
  strUuid += '-' + newStr.slice(8, 12);
  strUuid += '-' + newStr.slice(12, 16);
  strUuid += '-' + newStr.slice(16, 20);
  strUuid += '-' + newStr.slice(20);
  return strUuid;
}

function getUUID4() {
  function randomMax(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let arr = [];
  while (arr.length < 16) {
    let byte = randomMax(16).toString(16).concat(randomMax(16).toString(16));
    if (arr.length === 6)
      byte = ((parseInt('0x' + byte, 16) & 0x0f) | 0x40).toString(16);
    if (arr.length === 8)
      byte = ((parseInt('0x' + byte, 16) & 0x3f) | 0x80).toString(16);
    arr.push(byte);
  }

  let newStr = arr.join('');
  let strUuid = newStr.slice(0, 8);
  strUuid += '-' + newStr.slice(8, 12);
  strUuid += '-' + newStr.slice(12, 16);
  strUuid += '-' + newStr.slice(16, 20);
  strUuid += '-' + newStr.slice(20);
  return strUuid;
}

function getUUID3() {
  function randomMax(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let uuid = '';
  while (uuid.length < 36) {
    let byte = randomMax(16).toString(16).concat(randomMax(16).toString(16));

    switch (uuid.length) {
      case 8:
        uuid += '-' + byte;
        break;
      case 13:
        byte = ((parseInt('0x' + byte, 16) & 0x0f) | 0x40).toString(16);
        uuid += '-' + byte;
        break;
      case 18:
        byte = ((parseInt('0x' + byte, 16) & 0x3f) | 0x80).toString(16);
        uuid += '-' + byte;
        break;
      case 23:
        uuid += '-' + byte;
        break;
      default:
        uuid += byte;
        break;
    }
  }
  return uuid;
}

function wrapper(fn, numberOfCall) {
  let arr = [];
  let set = new Set();
  for (let i = 1; i <= numberOfCall; i++) {
    let value = fn.call();
    arr.push(value);
    set.add(value);
  }
  log(fn.name, arr.length, set.size);
}

function benchmark(numberOfCall, ...fns) {
  function repeatCall(fn, numberOfCall) {
    for (let i = 1; i <= numberOfCall; i++) {
      fn.call();
    }
  }
  fns.forEach((fn) => {
    repeatCall(fn, 1000);
    let start = Date.now();
    wrapper(fn, numberOfCall);
    let end = Date.now();
    log('Time of execute: ', end - start);
  });
}

benchmark(100000, getUUID1, getUUID3, getUUID4);
log('UUID1:', getUUID1());
log('UUID3:', getUUID3());
log('UUID4:', getUUID4());
