import { createRequest, fetchEvo } from './api_evotor';

export const apiForIdb = {

  async getStores() {
    let request = await createRequest({ type: 'store_v2' });
    let stores = await fetchEvo(request);
    return stores.items;
  },

  async getGroupsEvo() {
    let request = await createRequest({ type: 'groups_v2' });
    return await fetchEvo(request);
  },

  async getProductsEvo() {
    let request = await createRequest({ type: 'products_v2' });
    return await fetchEvo(request);
  },

  async postData(path, body) {
    let request = await createRequest({ type: `post_${path}_v2`, body });
    return await fetchEvo(request);
  },
  async putData(path, body) {
    let request = await createRequest({ type: `put_${path}_v2`, body });
    return await fetchEvo(request);
  },
  async deleteData(path, id) {
    let request = await createRequest({ type: `delete_${path}_v2`, id });
    return await fetchEvo(request);
  },
};
