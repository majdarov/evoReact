import { createStore, combineReducers, applyMiddleware } from 'redux';
import navReduser from './navReduser';
import commodityReduser from './commodityReduser';
import thunkMidleware from 'redux-thunk';
import appReducer from './appReducer';
import settingsReducer from './settingsReduser';

let redusers = combineReducers({
  navigation: navReduser,
  commodityPage: commodityReduser,
  app: appReducer,
  settings: settingsReducer,
});

let store = createStore(redusers, applyMiddleware(thunkMidleware));

export default store;
