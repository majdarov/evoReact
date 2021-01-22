import React, { useEffect, useState } from 'react';
import './Header.module.css';
import logo from '../../Assets/img/terminal-5.png';
import ProgressBar from '../common/ProgressBar/ProgressBar';

const Header = (props) => {

    const [isInit, setIsInit] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [needUpdate, setNeedUpdate] = useState(false);

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
        await props.syncProducts();
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
        setNeedUpdate(props.testNeedUpdate(props.lastUpdate));
    }, [props])

    let styleH5 = (needUpdate && { color: 'red' }) || { color: 'blue' };

    return (
        <header>
            { !props.isInit && <h4>Initializing App...</h4>}
            { isInit && <h4>App Is Init!</h4>}
            {updated && <ProgressBar limit={20} delay={500} text='updated' />}
            {!isInit && !updated && <div style={{ cursor: 'pointer' }} onClick={clickDateUpdate}>
                <h5 style={styleH5}>Синхронизировано - {lastUpdate}</h5>
            </div>}
            <img src={logo} alt='Logo'></img>
            <h2>{props.title}</h2>
            <div onClick={clickLang}>
                <input name="lng" type="radio" value='ru' checked={!props.currentLang} onChange={(ev) => ev.target.checked = !props.currentLang} />RU
                <input name="lng" type="radio" value='en' checked={props.currentLang} onChange={(ev) => ev.target.checked = props.currentLang} />EN
            </div>
        </header>
    );
}

export default Header;
