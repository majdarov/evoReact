import { apiForIdb } from './api';
import { apiIDB } from './apiIDB';

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
  if (needUpdate > periodUpdate) {
    return true;
  } else {
    return false;
  }
}

export async function fetchGroupsProducts() {
  // Get groups
  try {
    let res = await apiForIdb.fetchGroupsEvo();
    let groups = await res.items;
    await apiIDB.pushItems('groups', groups);
    // Get products
    res = await apiForIdb.getProductsEvo();
    let products = await res.items;
    products = products.map((item) => {
      if (!item.parent_id) item.parent_id = '0';
      if (!item.barcodes) item.barcodes = [];
      if (!item.photos) item.photos = [];
      return item;
    });
    await apiIDB.pushItems('products', products);
    localStorage.setItem('lastUpdate', Date.now());
    console.log('LS: ' + new Date(+localStorage.lastUpdate));
    return true;
    // return { groups, products, load: true };
  } catch (e) {
    console.error(e.message);
    return e;
  }
}

export async function isEmptyGroup(pId) {
  let groupsLength = (await apiIDB.getGroupsPid(pId)).length;
  let productsLength = (await apiIDB.getProductsPid(pId)).length;
  if (pId === '0' || !pId) return false;
  if (!(groupsLength + productsLength)) {
    return true;
  } else {
    return false;
  }
}

export async function syncGroupsProducts(callback = null) {
  const log = text => {
    console.log(text);
    if (callback) callback(text);
  }
  try {
    // Get groups
    log('Get groups...');
    let res = await apiForIdb.fetchGroupsEvo();
    let groups = await res.items;
    // Get products
    log('Get products...');
    res = await apiForIdb.fetchProductsEvo();
    let products = await res.items;
    products = products.map((item) => {
      if (!item.parent_id) item.parent_id = '0';
      if (!item.barcodes) item.barcodes = [];
      if (!item.photos) item.photos = [];
      item.created_at = Date.parse(item.created_at);
      item.updated_at = Date.parse(item.updated_at);
      return item;
    });
    localStorage.setItem('lastUpdate', Date.now());
    console.log('LS: ' + new Date(+localStorage.lastUpdate));
    log('Clear storage...');
    await apiIDB.clearStore('products');
    await apiIDB.clearStore('groups');
    log('Write groups in IDB...');
    await apiIDB.pushItems('groups', groups);
    log('Write products in IDB...');
    await apiIDB.pushItems('products', products);
    return groups;
  } catch (e) {
    console.error(e.message);
    return e;
  }
}
