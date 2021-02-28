let log = console.log;
// let arr8 = new Uint8Array([65, 202, 195, 195, 131, 107, 135, 88, 51, 135, 64, 173, 70, 27, 182, 71]);

function getUuid() {
  function randomMax(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let arr = [];

  while (arr.length < 32) {
    arr.push(randomMax(16).toString(16));
  }

  let arr2 = [];

  for (let i = 0; i < arr.length; i += 2) {
    arr2.push(arr[i].concat(arr[i + 1]));
  }

  arr2[6] = ((parseInt('0x' + arr2[6], 16) & 0x0f) | 0x40).toString(16);
  arr2[8] = ((parseInt('0x' + arr2[8], 16) & 0x3f) | 0x80).toString(16);
  let newStr = arr2.join('');
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

function getUuid3() {
  function randomMax(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let uuid = '';
  while (uuid.length < 37) {
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
  for (let i = 1; i <= numberOfCall; i++) {
    arr.push(fn.call());
  }
  console.log(fn.name, arr.length);
}

function benchmark(numberOfCall, ...fns) {
  function repeatCall(fn, numberOfCall) {
    for (let i = 1; i <= numberOfCall; i++) {
      fn.call();
    }
  }
  // fns.forEach((fn) => repeatCall(fn, 1000));
  fns.forEach((fn) => {
    repeatCall(fn, 1000);
    let start = Date.now();
    wrapper(fn, numberOfCall);
    let end = Date.now();
    log('Time of execute: ', end - start);
  });
}

benchmark(100000, getUuid, getUUID4, getUuid3);
log(getUUID4());
