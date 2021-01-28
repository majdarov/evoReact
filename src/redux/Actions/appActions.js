import {
  INIT_APP,
  SET_APP_KEY,
  SET_LAST_UPDATE,
  SET_STORES,
  SET_STORE_KEY,
} from '../Types';

const setAppKeyAC = (key) => {
  return { type: SET_APP_KEY, key };
};

const setStoreKeyAC = (key) => {
  return { type: SET_STORE_KEY, key };
};

const initAppAC = (init) => {
  return { type: INIT_APP, init };
};

const setStoresAC = (stores) => {
  return { type: SET_STORES, stores };
};

const setLastUpdateAC = (dateUpdate) => {
  return { type: SET_LAST_UPDATE, dateUpdate };
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
  // const dateBefore = getState().app.lastUpdate;
  // console.log('Date Before: ' + new Date(dateBefore).toString());
  dispatch(setLastUpdateAC(localStorage.lastUpdate));
  // const dateAfter = getState().app.lastUpdate;
  // console.log('Date After: ' + new Date(dateAfter).toString());
};
