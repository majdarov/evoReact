import React, { useEffect } from "react";
import "./App.css";
import "../../Assets/css/fontawesome.css";
import "../../Assets/css/solid.css";
import "../../Assets/css/regular.css";
import "../../Assets/css/brands.css";
import { Route } from "react-router-dom";
import Game from "../Game";
import NavbarContainer from "../Navbar/NavbarContainer";
import HeaderContainer from "../Header/HeaderContainer";
import CommodityContainer from "../Commodity";
import ImpExcel from "../ImpExcel/ImpExcel";
import Wrapper from "../Example/Wrapper";
import IdbTest from "../IdbTest/IdbTest";
import MainSettings from "../Settings/MainSettings";
import {
  initializeApp,
  toggleInitApp,
  setAppKey,
  setStoreKey,
  setLastUpdate,
  setPeriodUpdate,
} from '../../redux/Actions';
import { connect } from "react-redux";
import Documents from "../Documents";
import { /* fetchGroupsProducts, */ syncGroupsProducts, testNeedUpdate } from "../../api/apiUtils";



const App = props => {

  useEffect(() => {

    async function getProductsForIdb(lastUpdate, periodUpdate = 24) {
      if (testNeedUpdate(lastUpdate, periodUpdate)) {
        await syncGroupsProducts();
        props.setLastUpdate();
      }
    }

    if (!props.isInit) props.initializeApp();

    if (props.appKey && props.storeKey && !props.isInit) {
      getProductsForIdb(props.lastUpdate, props.periodUpdate)
        .then(() => props.toggleInitApp(true))
        .catch(e => alert(e.message));
    }
  }, [props])

  return (
    <div className="app">
      <HeaderContainer />
      <NavbarContainer />
      <div className="app-content">
        <Route exact path="/" />
        <Route exact path="/settings" component={MainSettings} />
        <Route path="/example" component={Wrapper} />
        {props.isInit && <Route path="/commodity" component={CommodityContainer} />}
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
    lastUpdate: state.app.lastUpdate,
    periodUpdate: state.app.periodUpdate,
  }
}

export default connect(
  mapState,
  {
    initializeApp,
    toggleInitApp,
    setAppKey,
    setStoreKey,
    setLastUpdate,
    setPeriodUpdate,
  }
)(App);
