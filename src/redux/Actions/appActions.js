import {
  INIT_APP,
  SET_APP_KEY,
  SET_LAST_UPDATE,
  SET_PERIOD_UPDATE,
  SET_STORES,
  SET_STORE_KEY,
  SET_SYNC_DATA,
  CLEAR_SYNC_DATA,
} from '../Types';

const setAppKeyAC = (key) => {
  return { type: SET_APP_KEY, key };
};

const setStoreKeyAC = (key) => {
  return { type: SET_STORE_KEY, key };
};

const toggleInitAppAC = (init) => {
  return { type: INIT_APP, init };
};

const setStoresAC = (stores) => {
  return { type: SET_STORES, stores };
};

const setLastUpdateAC = (dateUpdate) => {
  return { type: SET_LAST_UPDATE, dateUpdate };
};

const setPeriodUpdateAC = (periodUpdate) => {
  if (isNaN(+periodUpdate)) {
    periodUpdate = 24;
  } else if (+periodUpdate < 1) {
    periodUpdate = 1;
  } else if (+periodUpdate > 24) {
    periodUpdate = 24;
  } else {
    periodUpdate = +periodUpdate;
  }
  return { type: SET_PERIOD_UPDATE, periodUpdate };
};

const setSyncDataAC = ({ products, groups }) => {
  return { type: SET_SYNC_DATA, products, groups };
};
const clearSyncDataAC = () => {
  return { type: CLEAR_SYNC_DATA };
};

export const setAppKey = (key) => (dispatch) => {
  dispatch(setAppKeyAC(key));
};

export const setStoreKey = (key) => (dispatch) => {
  dispatch(setStoreKeyAC(key));
};

export const toggleInitApp = (init) => (dispatch) => {
  dispatch(toggleInitAppAC(init));
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
      dispatch(toggleInitAppAC(true));
    }
    if (localStorage.periodUpdate) {
      dispatch(setPeriodUpdate(localStorage.periodUpdate));
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

export const setPeriodUpdate = (periodUpdate) => (dispatch) => {
  dispatch(setPeriodUpdateAC(periodUpdate));
};

export const setSyncData = ({ products, groups }) => (dispatch) => {
  dispatch(setSyncDataAC({ products, groups }));
};

export const clearSyncData = () => (dispatch) => {
  dispatch(clearSyncDataAC());
};
