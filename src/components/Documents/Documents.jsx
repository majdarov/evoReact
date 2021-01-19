import React, { useEffect, useState } from 'react';
import { apiForIdb } from '../../api/api';

function dateToString(date = new Date()) {
    if (!date) return;
    function dblDigit(dgt) {
        if (dgt.toString().length < 2) {
            return `0${dgt}`;
        } else { return dgt };
    }
    let strDate = `${date.getFullYear()}-${dblDigit(date.getMonth() + 1)}-${dblDigit(date.getDate())}`;
    return strDate;
}

function getMinData() {
    let key = localStorage.getItem('storeKey');
    let min = key.split('-')[0];
    let year = min.slice(0, 4);
    let month = min.slice(4, 6);
    let day = min.slice(6)
    return `${year}-${month}-${day}`;
}

const Documents = () => {

    const typesOfDocs = [
        ['ACCEPT', 'Приемка товаров'],
        ['INVENTORY', 'Документ инвентаризации'],
        ['REVALUATION', 'Переоценка'],
        ['RETURN', 'Возврат поставщику'],
        ['WRITE_OFF', 'Списание'],
        ['SELL', 'Продажа'],
        ['PAYBACK', 'Возврат']
    ]

    const [docs, setDocs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        let docType = document.getElementById('typeDocs').value;
        console.log(docType);
        let p = {
            dateStart: period.dateStart.getTime(),
            dateEnd: period.dateEnd.getTime()
        }
        let res = await apiForIdb.getDocuments(docType, p);
        console.log(res);
        setDocs(res.items);
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
        let doc = await apiForIdb.getDocuments(null, null, id);
        console.log(doc.body);
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
            <h1>Documents</h1>
            <div>
                <label htmlFor="dateStart">Date start:</label>
                <input type="date" name="dateStart"
                    id="dateStart"
                    value={dateToString(period.dateStart)}
                    min={period.dateMin}
                    max={dateToString(period.dateEnd)}
                    onChange={changeDate}
                />
                <label htmlFor="dateEnd">Date end:</label>
                <input type="date" name="dateEnd"
                    id="dateEnd"
                    value={dateToString(period.dateEnd)}
                    min={period.dateMin}
                    max={dateToString(period.dateEnd)}
                    onChange={changeDate}
                />
            </div>
            <label>
                DocType
            <select name="type_docs" id="typeDocs">
                    {
                        typesOfDocs.map(item => {
                            return <option key={item[0]} value={item[0]}>{item[1]}</option>
                        })
                    }
                </select>
            </label>
            <button onClick={() => butGetDocs()} disabled={isLoading}>get Documents</button>
            { isLoading && <p>Loading...</p>}
            { !!docs.length &&
                <ul>
                    {docs.map((item, idx) => {
                        return (idx < 20) && <li key={item.id} id={item.id} onClick={docClick} style={{margin: '0.5rem'}}>
                            <span style={styleSpan}>{item.id}</span>
                        </li>
                    })}
                </ul>
            }
        </>
    );
}

export default Documents;
