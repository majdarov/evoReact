import { apiForIdb } from '../../api/api';
import { apiIDB } from '../../api/apiIDB';
import { chooseError } from '../../components/Errors/chooseError';
import {
  GET_COMMODITIES,
  GET_GROUPS,
  SET_ERROR,
  SET_FORM_DATA,
  SET_FORM_ERROR,
  SET_FORM_PHOTOS,
  SET_PID,
  TOGGLE_FORM_POST,
  VIEW_FORM,
} from '../Types';

const getGroupsAC = (groups) => {
  return { type: GET_GROUPS, groups };
};
const setPidAC = (pid) => {
  return { type: SET_PID, pid: pid };
};
const getCommoditiesAC = (commodities) => {
  return { type: GET_COMMODITIES, commodities };
};
const setErrorAC = (error) => {
  return { type: SET_ERROR, error };
};
const setFormErrorAC = (error) => {
  return { type: SET_FORM_ERROR, error };
};
const viewFormAC = (view) => {
  return { type: VIEW_FORM, viewForm: view };
};
const setFormDataAC = (formData) => {
  return { type: SET_FORM_DATA, formData };
};
const toggleFormPostAC = (formPost) => {
  return { type: TOGGLE_FORM_POST, formPost };
};
const setFormPhotosAC = (photos) => {
  return { type: SET_FORM_PHOTOS, photos };
};

export const getProducts = (pId) => {
  return (dispatch) => {
    apiIDB.getProductsPid(pId).then((res) => {
      // console.log(res)
      dispatch(getCommoditiesAC(res));
    });
  };
};

export const getProductId = (id) => {
  if (!id) return (dispatch) => dispatch(viewFormAC(true));
  return (dispatch) => {
    apiIDB
      .getProduct(id)
      .then((res) => {
        // console.log(res)
        dispatch(setFormDataAC(res));
        return true;
      })
      .then((result) => {
        if (result) dispatch(viewFormAC(true));
      });
  };
};

export const getGroups = () => {
  return (dispatch) => {
    apiIDB.getGroup('all').then((res) => {
      dispatch(getGroupsAC(res));
    });
  };
};

export const setViewForm = (view) => (dispatch) => {
  dispatch(viewFormAC(view));
};

export const setFormData = (formData) => (dispatch) => {
  dispatch(setFormDataAC(formData));
};

export const postFormData = (typeData, typeQuery, body) => (dispatch) => {
  // debugger
  let path;
  switch (typeData) {
    case 'product':
      path = 'product';
      break;
    case 'group':
      path = 'group';
      break;
    default:
      path = 'product';
      break;
  }
  let callbackApi;
  switch (typeQuery) {
    case 'post':
      callbackApi = apiForIdb.postData;
      break;
    case 'put':
      callbackApi = apiForIdb.putData;
      break;
    default:
      callbackApi = apiForIdb.postData;
      break;
  }
  callbackApi(path, body)
    .then((res) => {
      apiIDB.putData(`${path}s`, res);
      return res;
    })
    .then((res) => {
      // console.log(res);
      return res.parent_id ? res.parent_id : '0';
    })
    .then((pid) => {
      dispatch(setPidAC(pid));
      dispatch(toggleFormPostAC(false));
      dispatch(viewFormAC(false));
      dispatch(setFormDataAC(null));
    })
    .catch((err) => {
      console.dir(err);
      dispatch(setFormErrorAC(chooseError(err)));
      dispatch(toggleFormPostAC(false));
    });
};

export const deleteProduct = (id, pid) => async (dispatch) => {
  try {
    let res = await apiForIdb.deleteData('product', id);
    console.log(res.status);
    await apiIDB.deleteData('products', id);
    dispatch(setPidAC(pid));
    return id;
  } catch (err) {
    console.dir(err);
    dispatch(setErrorAC(chooseError(err)));
  }
};

export const setCommodities = (commodities) => (dispatch) =>
  dispatch(getCommoditiesAC(commodities));

export const setFormPhotos = (photos) => (dispatch) =>
  dispatch(setFormPhotosAC(photos));

export const setPid = pId => dispatch => dispatch(setPidAC(pId));

export const setError = err => dispatch => dispatch(setErrorAC(err));

export const setFormError = err => dispatch => dispatch(setFormErrorAC(err));

export const toggleFormPost = formPost => dispatch => dispatch(toggleFormPostAC(formPost));
