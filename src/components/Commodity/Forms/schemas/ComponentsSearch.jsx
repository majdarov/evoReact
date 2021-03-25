import { dateToString, getMinData } from '../../../common/utillites/utilites';
import s from '../FormSearch.module.css';

const ComponentsSearch = {
    SearchPeriod({ head, name, type, viewPeriod, changeFormElement, changePeriod }) {
        const lblFrom = name.match('price', 'gi') ? (viewPeriod ? 'От' : 'Значение') : (viewPeriod ? 'Начало' : 'Дата');
        const lblTo = name.match('price', 'gi') ? 'До' : 'Конец';
        function getInputEl(type, textName) {
            if (type === 'date') {
                return <input type={type} name={`${name}-${textName}`} onChange={changeFormElement}
                    min={getMinData()} max={dateToString()} />
            } else {
                return <input type={type} name={`${name}-${textName}`} onChange={changeFormElement} />
            }
        }
        return (
            <>
                <div className={s[`${name}-row`]}>
                    <span className='fa'>{head}</span>
                    <div className={s['input-row']}>
                        <label htmlFor={`${name}-from`}>{lblFrom}</label>
                        {getInputEl(type, 'from')}
                    </div>
                    <div>
                        <input type="checkbox" name={`${name}-period`} onChange={changePeriod} />
                        <span className='fa'>период</span>
                    </div>
                    {viewPeriod &&
                        <div className={s['input-row']}>
                            <label htmlFor={`${name}-to`}>{lblTo}</label>
                            {getInputEl(type, 'to')}
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
