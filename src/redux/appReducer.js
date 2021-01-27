import {
  SET_APP_KEY,
  SET_STORE_KEY,
  INIT_APP,
  SET_STORES,
  SET_LAST_UPDATE,
} from './Types'

const initialState = {
  appKey: null,
  storeKey: null,
  isInit: false,
  stores: [],
  lastUpdate: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_KEY:
      return { ...state, appKey: action.key };
    case SET_STORE_KEY:
      return { ...state, storeKey: action.key };
    case INIT_APP:
      return { ...state, isInit: action.init };
    case SET_STORES:
      return { ...state, stores: [...action.stores] };
    case SET_LAST_UPDATE:
      return { ...state, lastUpdate: +action.dateUpdate };
    default:
      return state;
  }
};

export default appReducer;
