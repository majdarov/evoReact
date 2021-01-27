import { CHOOSE_LANG, GET_TITLE } from '../Types';

const getTitleAC = (path) => ({ type: GET_TITLE, path });

const chooseLangAC = (lng) => ({ type: CHOOSE_LANG, lng });

export const getTitle = (path) => {
  return (dispatch) => {
    dispatch(getTitleAC(path));
  };
};

export const chooseLang = (lng) => {
  return (dispatch) => {
    dispatch(chooseLangAC(lng));
  };
};
