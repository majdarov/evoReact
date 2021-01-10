import React, { useEffect, useState } from 'react';
import './Header.module.css';
import logo from '../../Assets/img/terminal-5.png';

const Header = (props) => {

    const [isInit, setIsInit] = useState(false);

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
    useEffect(() => {
        if (props.isInit) {
            setIsInit(true)
            setTimeout(() => setIsInit(false), 2000);
        }
    }, [props.isInit])
    return (
        <header>
            { !props.isInit && <h4>Initializing App...</h4>}
            { isInit && <h4>App Is Init!</h4>}
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
