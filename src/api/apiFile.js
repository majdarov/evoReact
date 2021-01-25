import { apiIDB } from './apiIDB';
import { compose } from './apiUtils';

export function blobFromObj({ obj, ...rest }) {
  let json = JSON.stringify(obj, null, 2);
  let blob = new Blob([json], { type: 'application/json' });
  return { blob, ...rest };
}

export function blobToUrl({ blob, fileName = 'test', ext = 'json' }) {
  let link = document.createElement('a');
  link.download = `${fileName}.${ext}`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

function getObjfromLocalStorage() {
  let keys = Object.keys(localStorage);
  let obj = {};
  for (let key of keys) {
    obj[key] = localStorage.getItem(key);
  }
  return obj;
}

async function getObjfromIdb() {
  let obj = {};

  obj.groups = await apiIDB.getGroup('all');

  obj.products = await apiIDB.getProduct('all');

  return obj;
}

export async function saveConfig({ type, fileName = 'config' }) {
  let obj = {};

  switch (type) {
    case 'config':
      obj.config = getObjfromLocalStorage();
      break;
    case 'commodities':
      obj.commodities = await getObjfromIdb();
      break;
    default:
      obj.config = getObjfromLocalStorage();
      break;
  }
  compose(blobToUrl, blobFromObj)({ obj, fileName });
}

export async function readJsonFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve, reject) => {
    reader.onload = function () {
      var json = JSON.parse(reader.result);
      resolve(json);
    };

    reader.onerror = function () {
      console.error(reader.error);
      reject(reader.error);
    };
  });
}
