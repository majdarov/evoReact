import {
  SET_GROUPS,
  SET_PID,
  SET_COMMODITIES,
  SET_ERROR,
  VIEW_FORM,
  SET_FORM_DATA,
  TOGGLE_FORM_POST,
  SET_FORM_ERROR,
  SET_FORM_PHOTOS,
} from './Types';

let initialState = {
  groups: [],
  commodities: [],
  pid: null,
  isLoaded: false,
  comIsLoaded: false,
  error: null,
  lastUpdate: 1585166400000,
  isUpdated: false,
  viewForm: false,
  form: {
    formData: {
      id: null,
      name: '',
      code: '',
      measure_name: 'шт',
      tax: 'NO_VAT',
      allow_to_sell: true,
      description: '',
      article_number: '',
      parent_id: null,
      type: 'NORMAL',
      price: 0,
      cost_price: 0,
      quantity: 0,
      photos: [],
      barcodes: [],
    },
    formPost: false,
    resMessage: null,
    formError: null,
    isGroup: false,
    photos: [],
  },
};

const commodityReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      let groups = [];
      action.groups.forEach((item) => {
        let group = {
          id: item.id,
          pid: item.parent_id ? item.parent_id : null,
          label: item.name,
          // code: Date.parse(item.createdAt)
        };
        groups.push(group);
      });
      // groups.sort((a,b) => a.code - b.code);
      return { ...state, groups: [...groups], isLoaded: true };

    case SET_PID:
      return { ...state, pid: action.pid, comIsLoaded: false }

    case SET_COMMODITIES:
      // let commodities = [];
      // action.commodities.forEach((item) => {
      //   let commodity = {
      //     id: item.id,
      //     code: item.code,
      //     label: item.name,
      //     price: item.price,
      //     quantity: item.quantity,
      //     article: item.article_number,
      //   };
      //   commodities.push(commodity);
      // });
      return {...state, commodities: action.commodities, comIsLoaded: true }

    case SET_ERROR:
      return {...state, error: action.error }

    case SET_FORM_ERROR:
      return { ...state, form: { ...state.form, formError: action.error } };

    case VIEW_FORM:
      return { ...state, viewForm: action.viewForm };

    case TOGGLE_FORM_POST:
      return { ...state, form: { ...state.form, formPost: action.formPost } };

    case SET_FORM_DATA:
      const formData =
        action.formData === null ? initialState.form.formData : action.formData;
      const isGroup = true && action.isGroup;
      return { ...state, form: { ...state.form, formData, isGroup } };

    case SET_FORM_PHOTOS:
      return { ...state, form: action.photos };

    default:
      return state;
  }
};

export default commodityReduser;
