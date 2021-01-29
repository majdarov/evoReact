import api_v2 from './api_v2_axios.json';

async function createRequest(action) {
  api_v2.headers['X-Authorization'] = localStorage.appKey;

  action.storeUuid = localStorage.storeKey;

  api_v2.params = action.cursor ? { cursor: action.cursor } : null;

  let request = selectOption(action);

  return { ...request, action: action.type };
}

function selectOption(action) {
  let url, method, body, headers;

  switch (action.type) {
    case 'store_v2':
      url = 'stores';
      return { ...api_v2, method: 'GET', url };

    case 'bulks_v1':
      if (action.value) {
        url = 'bulks/' + action.value;
      } else {
        url = 'bulks';
      }
      return { ...api_v2, method: 'GET', url };

    /* Получить товар по ID или все товары */
    case 'products_v2':
      method = 'GET';
      url = 'stores/' + action.storeUuid + '/products';
      if (action.value) {
        url += '/' + action.value;
        action.value = '';
      }
      return { ...api_v2, method, url };
    /*-------------------------------------*/

    /* Получить группу по ID или список групп */
    case 'groups_v2':
      method = 'GET';
      if (action.value) {
        url = 'stores/' + action.storeUuid + '/product-groups/' + action.value;
        action.value = '';
      } else {
        url = 'stores/' + action.storeUuid + '/product-groups';
      }
      return { ...api_v2, method, url };
    /*--------------------------------------*/

    /* Получить документы (за пред. месяц, продажа) */
    /*
      ACCEPT - Приемка товаров,
      INVENTORY - Документ инвентаризации,
      REVALUATION - Переоценка,
      RETURN - Возврат поставщику,
      WRITE_OFF - Списание,
      SELL - Продажа,
      PAYBACK - Возврат,

    */
    case 'documents_v2':
      method = 'GET';
      if (action.value) {
        url = 'stores/' + action.storeUuid + '/documents/' + action.value;
      } else {
        url = 'stores/' + action.storeUuid + '/documents';
        if (!api_v2.cursor) {
          if (action.period) {
            let dateStart = action.period.dateStart;
            let dateEnd = action.period.dateEnd;
            let until = dateEnd ? `&until=${dateEnd}` : null;
            url += `?since=${dateStart}${until}`;
          } else {
            let date = new Date();
            date.setMonth(date.getMonth() - 1);
            url += `?since=${date.getTime()}`;
          }
          url += `&type=${action.docType}`;
        }
      }
      return { ...api_v2, method, url };
    /*----------------------------------------------*/

    /* Получить список сотрудников */
    case 'get_employees':
      method = 'GET';
      if (action.employee_id) {
        url = 'employees/' + action.employee_id;
        action.employee_id = '';
      } else {
        url = 'employees';
      }
      return { ...api_v2, method, url };
    /*---------------------------------------------*/

    case 'put_product_v2':
      method = 'PUT';
      url = 'stores/' + action.storeUuid + '/products/' + action.body.id;
      body = JSON.stringify(action.body);
      return { ...api_v2, method, url, body };

    case 'post_product_v2':
      method = 'POST';
      url = 'stores/' + action.storeUuid + '/products';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, url, body };

    case 'delete_product_v2':
      method = 'DELETE';
      url = 'stores/' + action.storeUuid + '/products/' + action.id;
      return { ...api_v2, method, url };

    case 'put_group_v2':
      method = 'PUT';
      url = 'stores/' + action.storeUuid + '/product-groups/' + action.body.id;
      body = JSON.stringify(action.body);
      return { ...api_v2, method, url, body };

    case 'post_group_v2':
      method = 'POST';
      url = 'stores/' + action.storeUuid + '/product-groups/';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, url, body };

    case 'put_array_products_v2':
      if (!action.body || !action.body.length) {
        return {};
      }
      method = 'PUT';
      headers = {
        ...api_v2.headers,
        'Content-Type': 'application/vnd.evotor.v2+bulk+json',
      };
      url = 'stores/' + action.storeUuid + '/products';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, headers, url, body };

    case 'put_array_groups_v2':
      method = 'PUT';
      headers = {
        ...api_v2.headers,
        'Content-Type': 'application/vnd.evotor.v2+bulk+json',
      };
      url = 'stores/' + action.storeUuid + '/product-groups';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, headers, url, body };

    case 'get_ofd_documents':
      method = 'GET';
      url = `/api/v1/ofd/documents/${action.storeUuid}`;
      let date = new Date();
      /* let dateFrom = date.getTime();
      date.setDate(date.getDate() - 1);
      let dateTo = date.getTime(); */
      let dateFrom = `${date.getFullYear()}-0${date.getMonth() + 1}-${
        date.getDate() - 1
      }T00:00:00.000Z`;
      let dateTo = `${date.getFullYear()}-0${
        date.getMonth() + 1
      }-${date.getDate()}T00:00:00.000Z`;
      let params = {
        deviceId: '20180608-D09E-409D-8015-A35AAA2D3487',
        type: 'SELL',
        from: dateFrom,
        to: dateTo,
      };
      return { ...api_v2, method, url, params };

    default:
      break;
  }
}

export default createRequest;
