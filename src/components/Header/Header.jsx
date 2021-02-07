import React, { useEffect, useState } from 'react';
import s from './Header.module.css';
import logo from '../../Assets/img/terminal-5.png';
import ProgressBar from '../common/ProgressBar/ProgressBar';
import { /* fetchGroupsProducts, */ syncGroupsProducts, testNeedUpdate } from '../../api/apiUtils';
import NavbarContainer from '../Navbar/NavbarContainer';
// import ProgressBar2 from '../common/ProgressBar/ProgressBar2';

const Header = (props) => {

    const [isInit, setIsInit] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [text, setText] = useState('');

    function clickLang(ev) {
        let lng;
        if (ev.target.name === 'lng') {
            lng = ev.target.value;
            props.chooseLang(lng);
            props.getTitle(props.path);
        } else {
            return;
        }
    }
    async function clickDateUpdate() {
        setUpdated(true);
        let result = await syncGroupsProducts(setText);
        console.log('fetchGroupsProducts - ' + result);
        props.setLastUpdate();
        setText('');
        setUpdated(false);
    }

    useEffect(() => {
        if (props.isInit) {
            setIsInit(true)
            setTimeout(() => {
                setIsInit(false)
                let date = new Date(+props.lastUpdate);
                setLastUpdate(date.toString());
            }, 2000);
        }
    }, [props.isInit, props.lastUpdate])

    useEffect(() => {
        setNeedUpdate(testNeedUpdate(lastUpdate, props.periodUpdate));
    }, [lastUpdate, props.periodUpdate])

    let styleH5 = (needUpdate && { color: 'red' }) || { color: 'blue' };

    return (
        <header>
            { !props.isInit && <h4>Initializing App...</h4>}
            { isInit && <h4>App Is Init!</h4>}
            {updated && <ProgressBar limit={20} delay={500} text={text} />}
            {!isInit && !updated &&
                <div style={{ cursor: 'pointer' }} onClick={clickDateUpdate}>
                    <h5 style={styleH5}>{lastUpdate && 'Синхронизировано - '}{lastUpdate}</h5>
                </div>}
            <img src={logo} alt='Logo'></img>
            <h2>{props.title}</h2>
            <div className={s.lng} onClick={clickLang}>
                <input name="lng" type="radio" value='ru' checked={!props.currentLang} onChange={(ev) => ev.target.checked = !props.currentLang} />RU
                <input name="lng" type="radio" value='en' checked={props.currentLang} onChange={(ev) => ev.target.checked = props.currentLang} />EN
            </div>
            <NavbarContainer />
        </header>
    );
}

export default Header;
