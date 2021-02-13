import { useEffect, useMemo, useState } from 'react';
import { apiIDB } from '../api/apiIDB';

/* const searchRequest = {
    keys: ['name', 'article_number', 'description'],
    target: [value1, value2],
    callback: 'any function' // function of equal
} */

/* const search = [searchRequest, serachRequest2, searchRequest3] */

const wrapper = (fn, args) => {
  let _this = this;
  if (fn === String.prototype.match || fn === Array.prototype.includes) {
    _this = args[0];
    args = args.slice(1);
  }
  return fn.call(_this, ...args);
};

function filterProd(item, search = []) {
  if (!item) return false;
  if (!search.length) return true;
  let filterResult = search.reduce((result, searchRequest) => {
    let searchResult = searchRequest.keys.reduce((acc, curr) => {
      if (!item[curr]) return acc;
      return (
        wrapper(searchRequest.callback, [
          item[curr],
          ...searchRequest.target,
        ]) || acc
      );
    }, false);
    return result && !!searchResult;
  }, true);
  return filterResult;
}

/* const formData = {
    name: 'any name',
    created_at: ['dateStart', 'dateEnd'],
    price: ['from', 'to'],
    cost_price: ['from', 'to'],
    parent_id: 'parent_id',
    barcode: Number(barcode);
} */
function createSearchRequest(formData) {
  let arrSearchReuests = [];
  console.log('createSearchRequest:', formData);
  Object.keys(formData).forEach((key) => {
    let keys = [key];
    let value = formData[key];
    let callback = (a, b) => a === b;
    let searchRequest;
    let target;

    switch (typeof value) {
      case 'string':
        if (key === 'name') {
          target = [new RegExp(value, 'gi')];
          keys = [...keys, 'article_number', 'description'];
          callback = String.prototype.match;
        } else {
          target = [value];
        }
        searchRequest = { keys, target, callback };
        break;

      case 'number':
        if (key === 'barcodes') {
          callback = Array.prototype.includes;
        } else if (key.match(/_at/gi)) {
          callback = (a, b) => {
            let bNew = b + 24 * 3600 * 1000;
            return a >= b && a <= bNew;
          };
        }
        target = [value];
        searchRequest = { keys, target, callback };
        console.log('createSearchRequest', searchRequest);
        break;

      case 'object':
        if (Array.isArray(value)) {
          target = [...value];
          if (value.length > 1) {
            if (!value[0]) {
              callback = (a, b) => a <= b;
              target = [value[1]];
            } else if (!value[1]) {
              callback = (a, b) => a >= b;
              target = [value[0]];
            } else {
              callback = (a, b, c) => {
                return b <= c ? a >= b && a <= c : a >= c && a <= b;
              };
            }
          }
        }
        searchRequest = { keys, target, callback };
        break;

      default:
        searchRequest = { keys, target: [value], callback };
        break;
    }
    arrSearchReuests.push(searchRequest);
  });
  return arrSearchReuests;
}

const useFilteredData = (inItems) => {
  const [search, setSearch] = useState([]); // arrSearchRequests
  const [items, setItems] = useState(inItems);
  // const [filteredItems, setFilteredItems] = useState(items);

  function setFilterConfig(formData) {
    console.log('setFilterConfig:', formData);
    let arrSearchReuests = createSearchRequest(formData);
    setSearch(arrSearchReuests);
  }

  useEffect(() => {
    if (search.length) {
      apiIDB.getProduct('all').then((res) => {
        let filteredItems = [...res].filter((item) => filterProd(item, search));
        setItems(filteredItems);
      });
    }
  }, [search]);

  return { items, setFilterConfig, search };
};

export default useFilteredData;
