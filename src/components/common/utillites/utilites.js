export function getUUID4() {
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
