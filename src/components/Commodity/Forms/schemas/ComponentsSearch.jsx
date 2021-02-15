import React from 'react';
import s from '../FormSearch.module.css';

const ComponentsSearch = {
    SearchPeriod({ head, name, type, viewPeriod, changeFormElement, changePeriod }) {
        return (
            <>
                <div className={s['date-row']}>
                    <span className='fa'>{head}</span>
                    <div className={s['input-row']}>
                        <label htmlFor={`${name}-from`}>Начало</label>
                        <input type={type} name={`${name}-from`} onChange={changeFormElement} />
                    </div>
                    <div>
                        <input type="checkbox" name={`${name}-period`} onChange={changePeriod} />
                        <span className='fa'>период</span>
                    </div>
                    {viewPeriod &&
                        <div className={s['input-row']}>
                            <label htmlFor={`${name}-to`}>Конец</label>
                            <input type={type} name={`${name}-to`} onChange={changeFormElement} />
                        </div>}
                </div>
            </>
        )
    },
    Button({ type, label, icon, callback }) {
        return (
            <div className={s['filter-button']}>
                <span className={s.filter} onClick={callback}>
                    {label}
                    <i className={icon}></i>
                    {type === 'submit' && <input type="submit" value="Искать" className={s.hidden} />}
                </span>
            </div>
        )
    },
}

export default ComponentsSearch;
