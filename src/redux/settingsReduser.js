import { SET_SCHEMA } from './Types';

const initialSettings = {
  app: {
    appKey: null,
    storeKey: null,
    isInit: false,
    stores: [],
    lastUpdate: null,
    periodUpdate: 24,
  },
  products: {
    table: {
      schema: {
        id: ['', 0],
        name: ['Наименование', 1],
        code: ['', 0],
        measure_name: ['', 0],
        tax: ['', 0],
        allow_to_sell: ['', 0],
        description: ['', 0],
        article_number: ['Артикул', 1],
        parent_id: ['', 0],
        type: ['', 0],
        price: ['Цена', 1],
        cost_price: ['', 0],
        quantity: ['Количество', 1],
        barcodes: ['', 0],
      }
    }
  }
};

const settingsReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_SCHEMA:
      let schema = {...state.products.table.schema, ...action.schema};
      let newState = {...state};
      newState.products.table.schema = {...schema};
      return newState;
    default:
      return state;
  }
}

export default settingsReducer;
