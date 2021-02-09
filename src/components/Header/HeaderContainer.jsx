import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { getTitle, chooseLang, setLastUpdate, setGroups } from '../../redux/Actions';

const HeaderContainer = props => {

    let path = '/' + props.location.pathname.split('/')[1];

    const getTitle = props.getTitle;
    useEffect(() => {
        getTitle(path);
    }, [path, getTitle])

    return <Header {...props} path={path} />
}

const mapStateToProps = state => {

    let className;
    return {
        navBar: state.navigation.navBar,
        title: state.navigation.title,
        className,
        currentLang: state.navigation.currentLang,
        isInit: state.app.isInit,
        lastUpdate: state.app.lastUpdate,
        periodUpdate: state.app.periodUpdate,
    }
}

export default connect(
    mapStateToProps,
    { getTitle, chooseLang, setLastUpdate, setGroups }
)(withRouter(HeaderContainer));
