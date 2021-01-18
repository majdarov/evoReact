import React, { useState } from 'react';
import { apiForIdb } from '../../api/api';

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

    async function butGetDocs() {
        setIsLoading(true);
        let docType = document.getElementById('typeDocs').value;
        console.log(docType);
        let res = await apiForIdb.getDocuments(docType);
        console.log(res);
        // await apiIDB.pushItems('groups', g);
        // let groups = await apiIDB.getGroup('all');
        setDocs(res.items);
        setIsLoading(false);
    }

    /*
    {
        "items": [
        {
          "type": "OPEN_SESSION",
          "id": "20170222-D58C-40E0-8051-B53ADFF38860",
          "extras": {},
          "number": 1234,
          "close_date": "2017-01-10T09:33:19.757+0000",
          "time_zone_offset": 10800000,
          "session_id": "1022722e-9441-4beb-beae-c6bc5e7af30d",
          "session_number": 80,
          "close_user_id": "20170417-46B8-40B9-802E-4DEB67C07565",
          "device_id": "20170928-9441-4BEB-BEAE-C6BC5E7AF30D",
          "store_id": "20170928-3176-40EB-80E2-A11F032E282A",
          "user_id": "09-012345678901234",
          "version": "V2",
          "body": {}
        }
      ],
      "paging": {
        "next_cursor": "string"
      }
    }
    */

    return (
        <>
            <h1>Documents</h1>
            <select name="type_docs" id="typeDocs">
                {
                    typesOfDocs.map(item => {
                        return <option key={item[0]} value={item[0]}>{item[1]}</option>
                    })
                }
            </select>
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
