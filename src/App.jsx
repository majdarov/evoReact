import React from "react";
import "./App.css";
import "./css/fontawesome.css";
import "./css/solid.css";
import "./css/regular.css";
import "./css/brands.css";
import { Route } from "react-router-dom";
import Game from "./components/Game/Game";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import MuzikContainer from "./components/Muzik/MuzikContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import CommodityContainer from "./components/Commodity/CommodityContainer";
import ImpExcel from "./components/ImpExcel/ImpExcel";
import Wrapper from "./components/Example/Wrapper";
import IdbTest from "./components/IdbTest/IdbTest";
import Main from "./components/Main/Main";
import { initializeApp, initApp, setAppKey, setStoreKey } from './redux/appReducer';
import { connect } from "react-redux";
import { pushItems } from "./api/apiIDB";
import { apiForIdb } from "./api/api";

async function getProductsForIdb() {
  // Get groups;
  let res = await apiForIdb.getGroupsEvo();
  let groups = await res.items;
  await pushItems('groups', groups);

  res = await apiForIdb.getProductsEvo();
  let products = await res.items;
  products = products.map(item => {
    if (!item.parent_id) item.parent_id = '0';
    if (!item.barcodes) item.barcodes = [];
    return item;
  })
  await pushItems('products', products);
}

const App = props => {

  if (!props.isInit) props.initializeApp();

  if (props.appKey && props.storeKey && !props.isInit) {
    getProductsForIdb().then(res => props.initApp(true));

  }

  return (
    <div className="app">
      <HeaderContainer />
      <NavbarContainer />
      <div className="app-content">
        <Route exact path="/" component={Main}/>
        <Route path="/example" component={Wrapper} />
        <Route path="/muzik" component={MuzikContainer} />
        <Route path="/commodity" component={CommodityContainer} />
        <Route path="/game" component={Game} />
        <Route path="/table" component={ImpExcel} />
        <Route path="/test" component={IdbTest} />
      </div>

    </div>
  );
}

const mapState = state => {
  return {
    appKey: state.app.appKey,
    storeKey: state.app.storeKey,
    isInit: state.app.isInit
  }
}

export default connect(mapState, {initializeApp, initApp, setAppKey, setStoreKey})(App);
