import React, { useEffect, useState } from 'react';
// import ProgressBar from '../common/ProgressBar/ProgressBar';
// import ProgressBar2 from '../common/ProgressBar/ProgressBar2';
import Example from './Example';
import { commodities } from '../../Tests/products.json';
import useFilteredData from '../../Hooks/useFilteredData';

const Wrapper = (props) => {

    const products = commodities.products;
    const { items, setFilterConfig, search } = useFilteredData(products);
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
        setFilterConfig({ name: '65', price: [30, 50] })
    }

    return (
        <>
            <button onClick={clickButton}>{count}</button>
            <button onClick={clickFilter}>Filter</button>
            {count < 5 && <Example count={count} />}
            {count < 5 && <Example count={-1} />}
            {/* { (count < 3) && <ProgressBar limit={10} text='test' delay={500} /> } */}
            {/* <ProgressBar2 limit={20} text='test' delay={500} /> */}
        </>
    );
}

export default Wrapper;
