import { createRequest, fetchEvo } from './api_evotor';

export const apiForIdb = {

  async getStores() {
    let request = await createRequest({ type: 'store_v2' });
    let stores = await fetchEvo(request);
    return stores.items;
  },

  async getSchemes() {
    let request = await createRequest({ type: 'get_schemes' });
    let schemes = await fetchEvo(request);
    return schemes;
  },

  async postSchemes(body) {
    let request = await createRequest({ type: 'post_schemes', body });
    let schemes = await fetchEvo(request);
    return schemes;
  },

  async fetchGroupsEvo() {
    let request = await createRequest({ type: 'groups_v2' });
    return await fetchEvo(request);
  },

  async fetchProductsEvo() {
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
  async getDocuments(docType, period = null, value = null) {
    let request = await createRequest({ type: 'documents_v2', docType, period, value });
    return await fetchEvo(request);
  },
  async getOfdDocuments() {
    // let request = await createRequest({ type: 'get_ofd_documents' });
    // return await fetchEvo(request);
    return {items: [{id: 'Временно не работает!'}]};
  },
  async getEmoloyees(employee_id = null) {
    let request = await createRequest({ type: 'get_employees', employee_id });
    return await fetchEvo(request);
  },
};
