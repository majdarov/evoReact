import React from "react";
import "./App.css";
import "./css/fontawesome.css";
import "./css/solid.css";
import "./css/regular.css";
import "./css/brands.css";
import { Route } from "react-router-dom";
import Game from "./components/Game/Game";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import CommodityContainer from "./components/Commodity/CommodityContainer";
import ImpExcel from "./components/ImpExcel/ImpExcel";
import Wrapper from "./components/Example/Wrapper";
import IdbTest from "./components/IdbTest/IdbTest";
import MainSettings from "./components/Settings/MainSettings";
import { initializeApp, toggleInitApp, setAppKey, setStoreKey, setLastUpdate } from './redux/appReducer';
import { connect } from "react-redux";
import Documents from "./components/Documents/Documents";
import { fetchGroupsProducts, testNeedUpdate } from "./api/apiUtils";



const App = props => {

  async function getProductsForIdb(lastUpdate) {
    if (testNeedUpdate(lastUpdate)) {
      await fetchGroupsProducts();
      props.setLastUpdate();
    }
  }

  if (!props.isInit) props.initializeApp();

  if (props.appKey && props.storeKey && !props.isInit) {
    getProductsForIdb(props.lastUpdate)
      .then(() => props.toggleInitApp(true))
      .catch(e => alert(e.message));
  }

  return (
    <div className="app">
      <HeaderContainer />
      <NavbarContainer />
      <div className="app-content">
        <Route exact path="/" />
        <Route exact path="/settings" component={MainSettings} />
        <Route path="/example" component={Wrapper} />
        <Route path="/commodity" component={CommodityContainer} />
        <Route path="/game" component={Game} />
        <Route path="/table" component={ImpExcel} />
        <Route path="/test" component={IdbTest} />
        <Route path="/documents" component={Documents} />
      </div>

    </div>
  );
}

const mapState = state => {
  return {
    appKey: state.app.appKey,
    storeKey: state.app.storeKey,
    isInit: state.app.isInit,
    lastUpdate: state.app.lastUpdate
  }
}

export default connect(mapState, { initializeApp, toggleInitApp, setAppKey, setStoreKey, setLastUpdate })(App);
