/*
    items.product =
        {
            "uuid":"03b25d9c-d37c-42c1-a651-c12cb63724cf",
            "code":"14098",
            "label":"искуственный букет",
            "price":80,
            "quantity":0
        }
*/

import { useMemo, useState } from 'react';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortedProducts = [...items];
    if (!sortedProducts.length) return [];
    if (sortConfig !== null) {
      sortedProducts.sort((a, b) => {
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === 'asc' ? 1 : -1;
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === 'asc' ? -1 : 1;
        return 0;
      });
    }
    return sortedProducts;
  }, [items, sortConfig]);

  function requestSort(key) {
    let direction = 'asc';
    if (sortConfig === null) {
      setSortConfig({ key, direction });
      return;
    }
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSortableData;
