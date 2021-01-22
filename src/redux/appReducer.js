const SET_APP_KEY = 'SET-APP-KEY';
const SET_STORE_KEY = 'SET-STORE-KEY';
const INIT_APP = 'INIT-APP';
const SET_STORES = 'SET-STORES';
const SET_LAST_UPDATE = 'SET-LAST-UPDATE';

export const setAppKeyAC = (key) => {
  return { type: SET_APP_KEY, key };
};

export const setStoreKeyAC = (key) => {
  return { type: SET_STORE_KEY, key };
};

export const initAppAC = (init) => {
  return { type: INIT_APP, init };
};

export const setStoresAC = (stores) => {
  return { type: SET_STORES, stores };
};

export const setLastUpdateAC = (dateUpdate) => {
  return { type: SET_LAST_UPDATE, dateUpdate };
};

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

export const setAppKey = (key) => (dispatch) => {
  dispatch(setAppKeyAC(key));
};

export const setStoreKey = (key) => (dispatch) => {
  dispatch(setStoreKeyAC(key));
};

export const toggleInitApp = (init) => (dispatch) => {
  dispatch(initAppAC(init));
};

export const setStores = (stores) => (dispatch) => {
  dispatch(setStoresAC(stores));
};

export const initializeApp = () => (dispatch) => {
  if (localStorage.appKey) {
    dispatch(setAppKeyAC(localStorage.appKey));
    if (localStorage.storeKey) {
      dispatch(setStoreKeyAC(localStorage.storeKey));
    }
    if (localStorage.lastUpdate) {
      dispatch(setLastUpdateAC(localStorage.lastUpdate));
    }
  }
};

export const setLastUpdate = () => (dispatch, getState) => {
  const dateBefore = getState().app.lastUpdate;
  console.log('Date Before: ' + (new Date(dateBefore)).toString());
  dispatch(setLastUpdateAC(localStorage.lastUpdate));
  const dateAfter = getState().app.lastUpdate;
  console.log('Date After: ' + (new Date(dateAfter)).toString());
};

export default appReducer;
