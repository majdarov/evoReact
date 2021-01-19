import React, { useEffect, useLayoutEffect, useState } from 'react';
import { apiForIdb } from '../../api/api';

function dateToString(date = new Date()) {
    if (!date) return;
    let strDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return strDate;
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

    const [period, setPeriod] = useState(null);

    let dateStart = new Date();
    dateStart.setHours(0, 0, 0);
    let dateEnd = new Date();
    setPeriod({ dateStart, dateEnd });

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
        // await apiIDB.pushItems('groups', g);
        // let groups = await apiIDB.getGroup('all');
        setDocs(res.items);
        setIsLoading(false);
    }

    function changeDate(e) {
        console.log(e)
    }

    return (
        <>
            <h1>Documents</h1>
            <div>
                <label htmlFor="dateStart">Date start:</label>
                <input type="date" name="dateStart"
                    id="dateStart"
                    value={dateToString(period.dateStart)}
                    onChange={changeDate}
                />
                <label htmlFor="dateEnd">Date end:</label>
                <input type="date" name="dateEnd"
                    id="dateEnd"
                    value={dateToString(period.dateEnd)}
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
                        return (idx < 10) && <li key={item.id}>{item.id}</li>
                    })}
                </ul>
            }
        </>
    );
}

export default Documents;
