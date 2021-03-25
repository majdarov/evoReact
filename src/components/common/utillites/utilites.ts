export function randomMax(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getUUID4(): string {

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

export function dateToString(date: Date = new Date()) {
  if (!date) return;
  function dblDigit(dgt: number) {
      if (dgt.toString().length < 2) {
          return `0${dgt}`;
      } else { return dgt };
  }
  let strDate = `${date.getFullYear()}-${dblDigit(date.getMonth() + 1)}-${dblDigit(date.getDate())}`;
  return strDate;
}

export function getMinData() {
  let key = localStorage.getItem('storeKey');
  if (!key) return '';
  try {
      let min = key.split('-')[0];
      let year = min.slice(0, 4);
      let month = min.slice(4, 6);
      let day = min.slice(6)
      return `${year}-${month}-${day}`;
  } catch (e) {
      console.error(e.message)
  }
}
