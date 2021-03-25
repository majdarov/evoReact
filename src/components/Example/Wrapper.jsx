import React, { useEffect, useState } from 'react';
// import ProgressBar from '../common/ProgressBar/ProgressBar';
// import ProgressBar2 from '../common/ProgressBar/ProgressBar2';
import Example from './Example';
// import { commodities } from '../../Tests/products.json';
import useFilteredData from '../../Hooks/useFilteredData';
import { apiForIdb } from '../../api/api';
import schemes from './schemes.json';
import { apiIDB } from '../../api/apiIDB';

const Wrapper = (props) => {

    // const products = commodities.products;
    const { items, setFilterConfig, search } = useFilteredData([]);
    const [filteredItems, setFilteredItems] = useState([])

    const [count, setCount] = useState(0);
    const clickButton = () => {
        setCount(count + 1);
        if (count > 5) setCount(0);
    };

    useEffect(() => {
        setFilteredItems(items);
        console.log(filteredItems);
        console.log(search);
        return () => setFilteredItems([]);
    }, [filteredItems, items, search])

    const clickFilter = () => {
        setFilterConfig({ parent_id: '0'/* , price: [30, 50] */ })
    }

    const getSchemes = async () => {
        let schemes = await apiForIdb.getSchemes();
        console.log(schemes);
    }

    const postSchemes = async () => {
        const body = schemes;
        body[0].uuid = localStorage.getItem('storeKey');
        body[0].appId = localStorage.getItem('appKey');
        // console.log(body);
        let resSchemes = await apiForIdb.postSchemes(body);
        console.log(resSchemes);
    }
    apiIDB.getGroup('0').then(g => console.log(g))


    return (
        <>
            <button onClick={clickButton}>{count}</button>
            <button onClick={clickFilter}>Filter</button>
            {count < 5 && <Example count={count} />}
            {count < 5 && <Example count={-1} />}
            {/* { (count < 3) && <ProgressBar limit={10} text='test' delay={500} /> } */}
            {/* <ProgressBar2 limit={20} text='test' delay={500} /> */}
            <button onClick={postSchemes} disabled>Post Schemes</button>
            <button onClick={getSchemes}>Get Schemes</button>
        </>
    );
}

export default Wrapper;


//1a8cb80f-2130-49a7-93c3-1d5b3b822fe2
//7b23ec83-245a-4b6a-baa7-417ab7c3ab76
