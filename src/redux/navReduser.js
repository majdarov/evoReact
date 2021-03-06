import { GET_TITLE, CHOOSE_LANG } from './Types';

let initialState = {
  langs: { ru: 0, en: 1 },
  currentLang: 0,
  title: '',
  navBar: [
    { link: '/', title: ['Начало', 'Start'] },
    { link: '/settings', title: ['Настройки', 'Settings'] },
    { link: '/commodity', title: ['Товары', 'Products'] },
    { link: '/documents', title: ['Документы', 'Documents'] },
    { link: '/game', title: ['Играть', 'Game'] },
    { link: '/table', title: ['Экспорт Excel', 'Export Excel'] },
  ],
};

const navReduser = (state = initialState, action) => {
  switch (action.type) {

    case GET_TITLE:
      let title;
      let nav = state.navBar.find((item) => item.link === action.path);
      if (nav !== undefined) {
        title = nav.title[state.currentLang];
      }
      return { ...state, title };

    case CHOOSE_LANG:
      return { ...state, currentLang: state.langs[action.lng] };

    default:
      return state;
  }
};

export default navReduser;
