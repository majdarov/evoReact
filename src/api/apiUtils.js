import { apiForIdb } from "./api";
import { apiIDB } from "./apiIDB";

export function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

export function map(cb) {
  return (arr) => arr.map(cb);
}

export function testNeedUpdate(date, periodUpdate = 24) {
  // debugger
  if (typeof date === 'string') {
    date = new Date(date).getTime();
  }
  if (!date) return true;
  let needUpdate = (Date.now() - date) / 1000 / 3600;
  if (needUpdate > periodUpdate ) {
    return true;
  } else {
    return false;
  }
}

export async function fetchGroupsProducts() {
  // Get groups
  try {
    let res = await apiForIdb.getGroupsEvo();
    let groups = await res.items;
    await apiIDB.pushItems('groups', groups);
    // Get products
    res = await apiForIdb.getProductsEvo();
    let products = await res.items;
    products = products.map(item => {
      if (!item.parent_id) item.parent_id = '0';
      if (!item.barcodes) item.barcodes = [];
      if (!item.photos) item.photos = [];
      return item;
    })
    await apiIDB.pushItems('products', products);
    localStorage.setItem('lastUpdate', Date.now())
    console.log('LS: ' + new Date(+localStorage.lastUpdate));
    return true;
  } catch (e) {
    console.error(e.message);
    return e;
  }
}
