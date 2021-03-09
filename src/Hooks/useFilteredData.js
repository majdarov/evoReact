import { useEffect, useState } from 'react';
import { apiIDB } from '../api/apiIDB';

// const log = console.log;

function testBarcodes(barcode) {
  if (isNaN(Number(barcode))) return false;
  if (![7, 8, 12, 13].includes(barcode.length)) {
    return false;
  }
  let res = 0;
  barcode.split('').forEach((item, i) => {
    if (i % 2 !== 0) {
      res += Number(item) * 3;
      res = res % 10;
    } else {
      res += Number(item);
      res = res % 10;
    }
  });

  return !res;
}
/* const searchRequest = {
    keys: ['name', 'article_number', 'description'],
    target: [value1, value2],
    callback: 'any function' // function of equal
} */

/* const search = [searchRequest, serachRequest2, searchRequest3] */

function createRegexp(str = '') {
  let val;
  if (str.slice(0, 3) === 'rgx') {
    // val = str.replace(/(^rgx\s*[/(])|(^rgx\s*)|\)$|\/$/g, ''); //.replace(/\)/, '');
    val = str.replace(/rgx\s*/, '').replace(/^[(/](.*)[)/]$/, '$1')
    // console.log('return', val);
    try {
      let regexp = new RegExp(val, 'gi');
      // console.log(regexp);
      return regexp;
    } catch (err) {
      console.log(err.message);
      alert(err.message);
      return err;
    }
  }
  val = str.replace(/[-[.+$*()^\]\\]/g, '\\$&');
  console.log(val);
  return new RegExp(val, 'gi');
}

const wrapper = (fn, args) => {
  let _this = this;
  if (fn === String.prototype.match || fn === Array.prototype.includes) {
    _this = args[0];
    args = args.slice(1);
  } else if (fn === RegExp.prototype.test) {
    _this = args[1];
    args = args.slice(0, 1);
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
  // console.log('createSearchRequest:', formData);
  Object.keys(formData).forEach((key) => {
    let keys = [key];
    let value = formData[key];
    let callback = (a, b) => a === b;
    let searchRequest;
    let target;

    switch (typeof value) {
      case 'string':
        if (key === 'name') {
          if (testBarcodes(value)) {
            target = [value];
            keys = ['barcodes'];
            callback = Array.prototype.includes;
          }
          let regex = createRegexp(value);
          target = [regex];
          // target = [new RegExp(regex, 'gi')];
          keys = [...keys, 'article_number', 'description'];
          // callback = String.prototype.match;
          callback = RegExp.prototype.test;
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
        // console.log('createSearchRequest', searchRequest);
        break;

      case 'object':
        if (Array.isArray(value)) {
          target = [...value];
          if (value.length > 1) {
            if (value[0] === null || !value[0]) {
              callback = (a, b) => a <= b;
              target = [value[1]];
            } else if (value[1] === null || !value[1]) {
              callback = (a, b) => a >= b;
              target = [value[0]];
            } else {
              callback = (a, b, c) => {
                return b <= c ? a >= b && a <= c : a >= c && a <= b;
              };
            }
          } else {
            if (key.match(/_at/gi)) {
              let dateStart = value[0];
              let dateEnd = value[0] + 24 * 3600 * 1000;
              callback = (a, b, c) => {
                return b <= c ? a >= b && a <= c : a >= c && a <= b;
              };
              target = [dateStart, dateEnd];
            }
          }
        }
        searchRequest = { keys, target, callback };
        break;

      default:
        searchRequest = { keys, target: [value], callback };
        break;
    }
    // console.log('createSearchRequest', searchRequest);
    arrSearchReuests.push(searchRequest);
  });
  return arrSearchReuests;
}

const useFilteredData = (/* inItems */) => {
  const [search, setSearch] = useState([]); // arrSearchRequests
  const [items, setItems] = useState([]);

  const setFilterConfig = (formData) => {
    setSearch(createSearchRequest(formData));
  };

  useEffect(() => {
    // console.log('Render from useFilteredData!')
    if (search.length) {
      apiIDB.getProduct('all').then((res) => {
        let filteredItems = [...res].filter((item) => filterProd(item, search));
        setItems(filteredItems);
      });
    }
    return () => setItems([]);
  }, [search]);

  return { items, setFilterConfig, search };
};

export default useFilteredData;
