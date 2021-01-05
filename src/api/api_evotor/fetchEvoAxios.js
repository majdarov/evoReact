import { default as Axios } from 'axios';

async function fetchEvo({
  baseURL,
  url,
  headers,
  method,
  body,
  params,
  action,
}) {
  try {
    let request = { baseURL, url, headers, method, params };
    // console.log(request);
    if (body) {
      request.data = body;
    }
    let response = await Axios(request);
    let result;
    if (method === 'DELETE') {
      result = response;
    } else {
      result = await response.data;
    }
    if (result.paging && result.paging.next_cursor) {
      request.params = { cursor: result.paging.next_cursor };
      let response = await fetchEvo(request);
      result.items = result.items.concat(response.items);
    }
    result.paging = {};
    return result;
  } catch (err) {
    return err;
  }
}

export default fetchEvo;
