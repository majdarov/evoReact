import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { apiForIdb } from '../../api/api';
// import { compose } from '../../api/apiUtils';
import ProgressBar from '../common/ProgressBar/ProgressBar';
import { dateToString, getMinData } from '../common/utillites/utilites';
import { CardSell } from './components/CardSell/CardSell';
// import { blobFromObj, blobToUrl } from '../../api/apiFile'

const mapState = state => {
    return {
        isInit: state.app.isInit,
    }
}

const Documents = (props) => {

    if (!props.isInit) {
        props.history.push('/settings');
    }

    const typesOfDocs = [
        ['ACCEPT', 'Приемка товаров'],
        ['INVENTORY', 'Документ инвентаризации'],
        ['REVALUATION', 'Переоценка'],
        ['RETURN', 'Возврат поставщику'],
        ['WRITE_OFF', 'Списание'],
        ['SELL', 'Продажа'],
        ['PAYBACK', 'Возврат'],
        ['employees', 'Сотрудники'],
        ['ofd', 'Документы ОФД']
    ]

    const [docs, setDocs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [docType, setDocType] = useState(typesOfDocs[0][0]);

    const [period, setPeriod] = useState({
        dateStart: new Date(),
        dateEnd: new Date(),
        dateMin: getMinData()
    });

    useEffect(() => {
        period.dateStart.setHours(0, 0, 0);
    }, [period])

    async function butGetDocs() {
        setIsLoading(true);
        console.log(docType);
        let res;
        try {
            if (docType === 'employees') {
                res = await apiForIdb.getEmoloyees();
            } else if (docType === 'ofd') {
                res = await apiForIdb.getOfdDocuments();
            } else {
                let p = {
                    dateStart: period.dateStart.getTime(),
                    dateEnd: period.dateEnd.getTime()
                }
                res = await apiForIdb.getDocuments(docType, p);
            }
            if (!res.items) {
                setDocs([]);
            } else {
                setDocs(res.items);
            }
        } catch (e) {
            alert(e.message);
            setDocs([]);
        }
        console.log(res);
        setIsLoading(false);
    }

    function changeDate(e) {
        let date = new Date(e.currentTarget.value);
        if (e.currentTarget.name === 'dateStart') {
            date.setHours(0);
        } else {
            date.setHours(23);
        }
        setPeriod({ ...period, [e.currentTarget.name]: date });
        // console.log(e.currentTarget.name + ' : ' + e.currentTarget.value)
    }

    async function docClick(e) {
        if (e.target.tagName !== 'SPAN') return;
        let id = e.currentTarget.id;
        if (id === 'Временно не работает!') {
            alert(id);
            return;
        }
        let doc;
        if (docType === 'employees') {
            doc = await apiForIdb.getEmoloyees(id);
        } else {
            doc = await apiForIdb.getDocuments(null, null, id);
        }
        console.log(doc);
        // compose(blobToUrl, blobFromObj)({ obj: doc, fileName: docType });
    }

    function changeType(e) {
        setDocType(e.target.value);
        setDocs([]);
    }

    const styleSpan = {
        cursor: 'pointer',
        border: '1px solid green',
        paddingTop: '0.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        background: 'yellow'
    }

    return (
        <>
            <h1>Documents {docType}</h1>
            <div>
                <label htmlFor="dateStart">Date start:</label>
                <input type="date" name="dateStart"
                    id="dateStart"
                    value={dateToString(period.dateStart)}
                    min={period.dateMin}
                    max={dateToString()}
                    onChange={changeDate}
                />
                <label htmlFor="dateEnd">Date end:</label>
                <input type="date" name="dateEnd"
                    id="dateEnd"
                    value={dateToString(period.dateEnd)}
                    min={period.dateMin}
                    max={dateToString()}
                    onChange={changeDate}
                />
            </div>
            <label>
                DocType
            <select name="type_docs" id="typeDocs" onChange={changeType}>
                    {
                        typesOfDocs.map(item => {
                            return <option key={item[0]} value={item[0]}>{item[1]}</option>
                        })
                    }
                </select>
            </label>
            <button onClick={butGetDocs} disabled={isLoading}>get Documents</button>
            { isLoading && <ProgressBar limit={20} delay={500} text={'Loading '} />}
            { !!docs.length &&
                <ul>
                    {docs.map((item, idx) => {
                        if (docType === 'SELL') return <CardSell key={item.id} {...item} />
                        return (idx < 20) && <li key={item.id} id={item.id} onClick={docClick} style={{ margin: '0.5rem' }}>
                            <span style={styleSpan}>{item.id}</span>
                        </li>
                    })}
                </ul>
            }
        </>
    );
}

export default connect(mapState)(Documents);
